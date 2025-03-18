import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import LeadAnalytics from '@/components/analytics/LeadAnalytics';
import { sendLeadNotification } from '@/lib/notifications';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  created_at: string;
  lead_statuses: { status: string } | null;
  lead_score: { name: string; score: number } | null;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchLeads();

    // Subscribe to real-time updates for both leads and lead_statuses
    const leadsSubscription = supabase
      .channel('leads_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'leads'
      }, () => fetchLeads())
      .subscribe();

    const statusesSubscription = supabase
      .channel('statuses_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'lead_statuses'
      }, () => fetchLeads())
      .subscribe();

    return () => {
      leadsSubscription.unsubscribe();
      statusesSubscription.unsubscribe();
    };
  }, [user, filter, search]);

  const fetchLeads = async () => {
    try {
      let query = supabase
        .from('leads')
        .select(`
          *,
          lead_statuses!left (
            status
          ),
          lead_scores!left (
            name,
            score
          )
        `)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('lead_statuses.status', filter);
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform the data to handle the left join results
      const transformedData = data?.map(lead => ({
        ...lead,
        lead_statuses: lead.lead_statuses?.[0] || { status: 'new' },
        lead_score: lead.lead_scores || null
      }));

      setLeads(transformedData || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch leads',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      // First check if a status already exists
      const { data: existingStatus } = await supabase
        .from('lead_statuses')
        .select('*')
        .eq('lead_id', leadId)
        .single();

      let result;
      if (existingStatus) {
        // Update existing status
        result = await supabase
          .from('lead_statuses')
          .update({
            status,
            updated_by: user?.id,
            updated_at: new Date().toISOString()
          })
          .eq('lead_id', leadId);
      } else {
        // Insert new status
        result = await supabase
          .from('lead_statuses')
          .insert({
            lead_id: leadId,
            status,
            updated_by: user?.id,
            updated_at: new Date().toISOString()
          });
      }

      if (result.error) throw result.error;

      // Send notification when status changes
      const lead = leads.find((l) => l.id === leadId);
      if (lead) {
        await sendLeadNotification(lead);
      }

      toast({
        title: 'Success',
        description: 'Lead status updated successfully',
      });

      // Fetch updated data
      await fetchLeads();
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update lead status',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold">Lead Management</h1>
          <p className="mt-2 text-muted-foreground">
            Track and manage your leads efficiently
          </p>
        </div>

        <Tabs defaultValue="leads" className="space-y-8">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="leads">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-4">
                <Input
                  placeholder="Search leads..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-64"
                />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leads</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.interest}</TableCell>
                      <TableCell>
                        <span className="rounded-full bg-gold-100 px-2 py-1 text-sm text-gold-800">
                          {lead.lead_score?.score || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={lead.lead_statuses?.status || 'new'}
                          onValueChange={(value) => updateLeadStatus(lead.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                            <SelectItem value="lost">Lost</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {new Date(lead.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <LeadAnalytics />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}