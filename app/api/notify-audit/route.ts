import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, email, website, spend, runner, tenure } = body;
    const qualified = spend === '$2,000 – $5,000' || spend === '$5,000+';

    const { error: sendError } = await resend.emails.send({
      from: 'A+Growth Notifications <notifications@amirgomez.com>',
      to: 'amir@amirgomez.com',
      subject: `${qualified ? '✅ QUALIFIED' : '🔔'} Audit request — ${spend || 'no spend'} · ${name || email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #111; color: #fff; border-radius: 12px;">
          <h1 style="color: #e85c1f; font-size: 24px; margin-bottom: 8px;">New Meta Ads Audit Request</h1>
          <p style="color: #999; margin-bottom: 24px;">${qualified
            ? 'Spend tier qualifies — they were sent to the calendar to book.'
            : 'Below the qualifying spend tier — reply by email within 24h.'}</p>

          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="color: #e85c1f; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Contact</p>
            <p style="font-size: 18px; font-weight: bold; margin: 0 0 4px;">${name || '—'}</p>
            <p style="margin: 0 0 4px;">${email || '—'}</p>
            <p style="margin: 0;">${website || '—'}</p>
          </div>

          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px;">
            <p style="color: #e85c1f; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Qualification</p>
            <p style="color: #999; font-size: 12px; margin: 0 0 4px;">Monthly Meta ads spend</p>
            <p style="font-weight: bold; margin: 0 0 12px;">${spend || '—'}</p>
            <p style="color: #999; font-size: 12px; margin: 0 0 4px;">Who runs campaigns now</p>
            <p style="margin: 0 0 12px;">${runner || '—'}</p>
            <p style="color: #999; font-size: 12px; margin: 0 0 4px;">Running for</p>
            <p style="margin: 0;">${tenure || '—'}</p>
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
    console.error('Failed to send audit notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
