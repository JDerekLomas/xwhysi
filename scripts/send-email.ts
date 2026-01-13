import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to: string, subject: string, text: string) {
  const { data, error } = await resend.emails.send({
    from: 'XWHYSI <hello@xwhysi.com>',
    to,
    subject,
    text,
  });

  if (error) {
    console.error('Failed to send:', error);
    process.exit(1);
  }

  console.log('Email sent:', data?.id);
}

// CLI usage
const [,, to, subject, ...textParts] = process.argv;
const text = textParts.join(' ') || 'Test email from XWHYSI';

if (!to) {
  console.log('Usage: npx tsx scripts/send-email.ts <to> <subject> <text>');
  console.log('Example: npx tsx scripts/send-email.ts hello@xwhysi.com "Test" "Hello!"');
  process.exit(1);
}

sendEmail(to, subject || 'Test from XWHYSI', text);
