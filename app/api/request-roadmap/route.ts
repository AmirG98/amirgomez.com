import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { email, readinessLevel, targetSegment, goal, source } = body;

    await resend.emails.send({
      from: 'A+Growth Notifications <notifications@amirgomez.com>',
      to: 'amir@amirgomez.com',
      subject: `🎯 Roadmap Request from ${email || 'Quiz Lead'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #111; color: #fff; border-radius: 12px;">
          <h1 style="color: #22c55e; font-size: 24px; margin-bottom: 8px;">New Roadmap Request!</h1>
          <p style="color: #999; margin-bottom: 24px;">Someone clicked "Get My Free Roadmap" on the thank you page.</p>

          <div style="background: #22c55e20; border: 2px solid #22c55e; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Lead Email</p>
            <p style="font-size: 20px; font-weight: bold; margin: 0; color: #fff;">${email || 'Not available'}</p>
          </div>

          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="color: #f59e0b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Readiness Level</p>
            <p style="font-size: 18px; font-weight: bold; margin: 0; text-transform: capitalize;">${readinessLevel?.replace(/-/g, ' ') || 'N/A'}</p>
          </div>

          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="color: #f59e0b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Target Segment</p>
            <p style="font-size: 16px; margin: 0;">${targetSegment || 'Not specified'}</p>
          </div>

          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="color: #f59e0b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Primary Goal</p>
            <p style="font-size: 16px; margin: 0;">${goal || 'Not specified'}</p>
          </div>

          <div style="background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 16px;">
            <p style="color: #f59e0b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Source</p>
            <p style="font-size: 14px; margin: 0; color: #999;">${source || 'Unknown'}</p>
          </div>

          <div style="margin-top: 24px; padding: 16px; background: #f59e0b20; border: 1px solid #f59e0b40; border-radius: 8px;">
            <p style="margin: 0; color: #f59e0b; font-weight: bold;">⚡ Action Required</p>
            <p style="margin: 8px 0 0; color: #999; font-size: 14px;">Send them a personalized roadmap within 24 hours to ${email || 'their email'}.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send roadmap request notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
