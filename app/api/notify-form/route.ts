import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const LABELS: Record<string, string> = {
  formType: 'Form',
  email: 'Email',
  status: 'Status',
};

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = (await req.json()) as Record<string, string>;
    const { formType, email } = body;

    const rows = Object.entries(body)
      .filter(([, v]) => v !== undefined && v !== null && `${v}`.trim() !== '')
      .map(
        ([k, v]) => `
          <p style="color: #999; font-size: 12px; margin: 0 0 4px; text-transform: capitalize;">${LABELS[k] || k}</p>
          <p style="margin: 0 0 12px;">${`${v}`}</p>`
      )
      .join('');

    const { error: sendError } = await resend.emails.send({
      from: 'A+Growth Notifications <notifications@amirgomez.com>',
      to: 'amir@amirgomez.com',
      subject: `🔔 New ${formType || 'website'} form submission — ${email || 'no email'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #111; color: #fff; border-radius: 12px;">
          <h1 style="color: #e85c1f; font-size: 22px; margin-bottom: 8px;">New form submission</h1>
          <p style="color: #999; margin-bottom: 24px;">They were sent to /meet-amir to book a slot.</p>
          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px;">
            ${rows}
          </div>
        </div>
      `,
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return NextResponse.json({ error: 'resend_failed', detail: sendError }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send form notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
