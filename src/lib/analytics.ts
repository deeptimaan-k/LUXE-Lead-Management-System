import { supabase } from './supabase';

export async function getLeadAnalytics() {
  try {
    // Get total leads count
    const { count: totalLeads, error: totalError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });

    if (totalError) throw totalError;

    // Get leads by status with proper aggregation
    const { data: statusData, error: statusError } = await supabase
      .from('lead_statuses')
      .select('status, id')
      .order('updated_at', { ascending: false });

    if (statusError) throw statusError;

    // Process status data
    const leadsByStatus = statusData?.reduce((acc: Record<string, number>, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    const processedStatus = Object.entries(leadsByStatus || {}).map(([status, count]) => ({
      status,
      count
    }));

    // Get leads by score
    const { data: scoreData, error: scoreError } = await supabase
      .from('leads')
      .select('score_id, lead_scores(name, score)')
      .not('score_id', 'is', null);

    if (scoreError) throw scoreError;

    // Process score data
    const leadsByScore = scoreData?.reduce((acc: Record<string, number>, curr) => {
      const scoreName = curr.lead_scores?.name;
      if (scoreName) {
        acc[scoreName] = (acc[scoreName] || 0) + 1;
      }
      return acc;
    }, {});

    const processedScores = Object.entries(leadsByScore || {}).map(([name, count]) => ({
      name,
      count
    }));

    // Get conversion rate
    const { count: convertedCount, error: conversionError } = await supabase
      .from('lead_statuses')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'converted');

    if (conversionError) throw conversionError;

    // Calculate conversion rate
    const conversionRate = totalLeads ? ((convertedCount || 0) / totalLeads) * 100 : 0;

    // Get leads trend (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: trendData, error: trendError } = await supabase
      .from('leads')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: true });

    if (trendError) throw trendError;

    // Process trend data by day
    const leadsTrend = trendData?.reduce((acc: Record<string, number>, curr) => {
      const date = new Date(curr.created_at).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const processedTrend = Object.entries(leadsTrend || {}).map(([date, count]) => ({
      date,
      count
    }));

    return {
      totalLeads: totalLeads || 0,
      leadsByStatus: processedStatus,
      leadsByScore: processedScores,
      conversionRate,
      leadsTrend: processedTrend
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}

// Subscribe to real-time updates
export function subscribeToLeadUpdates(callback: () => void) {
  const statusSubscription = supabase
    .channel('lead_status_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'lead_statuses'
      },
      callback
    )
    .subscribe();

  const leadsSubscription = supabase
    .channel('lead_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'leads'
      },
      callback
    )
    .subscribe();

  return () => {
    statusSubscription.unsubscribe();
    leadsSubscription.unsubscribe();
  };
}