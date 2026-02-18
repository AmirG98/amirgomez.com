import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { email, q1, q2, q3, q4, readinessLevel } = body;

    await resend.emails.send({
      from: 'A+Growth Notifications <notifications@amirgomez.com>',
      to: 'amir@amirgomez.com',
      subject: '🔔 New Affluent Market Quiz Lead!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #111; color: #fff; border-radius: 12px;">
          <h1 style="color: #f59e0b; font-size: 24px; margin-bottom: 8px;">New Lead from Affluent Market Quiz</h1>
          <p style="color: #999; margin-bottom: 24px;">Someone just completed the quiz and submitted their email.</p>

          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="color: #f59e0b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Contact</p>
            <p style="font-size: 18px; font-weight: bold; margin: 0;">${email}</p>
          </div>

          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="color: #f59e0b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Readiness Level</p>
            <p style="font-size: 16px; font-weight: bold; margin: 0; text-transform: capitalize;">${readinessLevel?.replace(/-/g, ' ') || 'N/A'}</p>
          </div>

          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin-bottom: 8px;">
            <p style="color: #f59e0b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Quiz Answers</p>
            <p style="color: #999; font-size: 12px; margin: 0 0 4px;">Q1 – Primary goal</p>
            <p style="margin: 0 0 12px;">${q1 || '—'}</p>
            <p style="color: #999; font-size: 12px; margin: 0 0 4px;">Q2 – Current targeting setup</p>
            <p style="margin: 0 0 12px;">${q2 || '—'}</p>
            <p style="color: #999; font-size: 12px; margin: 0 0 4px;">Q3 – Target HNW segment</p>
            <p style="margin: 0 0 12px;">${q3 || '—'}</p>
            <p style="color: #999; font-size: 12px; margin: 0 0 4px;">Q4 – Biggest challenge</p>
            <p style="margin: 0;">${q4 || '—'}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send notification email:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
