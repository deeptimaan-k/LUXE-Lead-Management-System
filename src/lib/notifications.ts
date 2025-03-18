import sgMail from '@sendgrid/mail';

// Initialize SendGrid with a check for the API key
const SENDGRID_API_KEY = import.meta.env.VITE_SENDGRID_API_KEY;
const isDevelopment = !SENDGRID_API_KEY || SENDGRID_API_KEY === 'your_sendgrid_api_key';

if (!isDevelopment) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendEmail(to: string, subject: string, content: string) {
  if (isDevelopment) {
    console.log('Development mode - Email would be sent:', {
      to,
      subject,
      content
    });
    return { success: true };
  }

  try {
    const msg = {
      to,
      from: 'noreply@luxejewelry.com',
      subject,
      text: content,
      html: content,
    };

    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('SendGrid error:', error);
    return { success: false, error };
  }
}

export async function sendWhatsApp(to: string, message: string) {
  // Always use mock implementation for WhatsApp
  console.log('Development mode - WhatsApp message would be sent:', {
    to,
    message
  });
  return { success: true };
}

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone: string;
  interest: string;
}) {
  const emailContent = `
    New Lead Details:
    Name: ${lead.name}
    Email: ${lead.email}
    Phone: ${lead.phone}
    Interest: ${lead.interest}
  `;

  const whatsappMessage = `New Lead: ${lead.name} is interested in ${lead.interest}. Contact: ${lead.phone}`;

  try {
    const [emailResult, whatsappResult] = await Promise.all([
      sendEmail('sales@luxejewelry.com', 'New Lead Notification', emailContent),
      sendWhatsApp(import.meta.env.VITE_ADMIN_PHONE, whatsappMessage)
    ]);

    return {
      success: emailResult.success && whatsappResult.success,
      email: emailResult,
      whatsapp: whatsappResult
    };
  } catch (error) {
    console.error('Notification error:', error);
    return {
      success: false,
      error
    };
  }
}