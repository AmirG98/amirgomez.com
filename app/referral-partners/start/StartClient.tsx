'use client';

import { useEffect } from 'react';
import './start.css';

// Meta Pixel y GTM se cargan globalmente en app/layout.tsx.
// Acá solo se disparan los eventos propios de esta página.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const EMAIL = 'amir@amirgomez.com';
const SUBJECT = 'Referral Partner — my first intro';
const BODY =
  "Hi Amir, I'd like to join the referral program. The first business that comes to mind is: [name/company]. How I know them: [relationship]. What I do: [your role].";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;
const CALENDLY = 'https://calendly.com/amir-amirgomez/referral-new';

function push(event: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

export default function StartClient() {
  useEffect(() => {
    // Evento de conversión de ads para esta fase.
    window.fbq?.('track', 'ViewContent', { content_name: 'referral_start' });
    push('start_page_view');
  }, []);

  return (
    <div className="rps">
      <header className="top">
        <div className="wrap">
          <div className="wordmark">
            A<span>+</span> Growth
          </div>
          <a className="back" href="/referral-partners">
            ← Back to the program
          </a>
          <p className="eyebrow">Referral Program · Getting started</p>
          <h1>Here&apos;s exactly how it goes.</h1>
          <p className="sub">
            Four steps, start to paid. Read them first — the way to start is at the bottom.
          </p>
        </div>
      </header>

      <main className="wrap">
        <section className="block" aria-label="The honest step-by-step">
          <h2>The honest step-by-step</h2>
          <div className="steps">
            <div className="step">
              <div className="n">1</div>
              <div>
                <span className="big">You tell us who you&apos;d introduce.</span>
                <span className="small">
                  One email. We reply within 24 hours confirming if they&apos;re a fit — some
                  businesses aren&apos;t, and we&apos;ll tell you straight.
                </span>
              </div>
            </div>
            <div className="step">
              <div className="n">2</div>
              <div>
                <span className="big">You send one intro email.</span>
                <span className="small">
                  We give you a one-paragraph template. Two minutes, done. We take it from there,
                  white-glove.
                </span>
              </div>
            </div>
            <div className="step">
              <div className="n">3</div>
              <div>
                <span className="big">We work the opportunity.</span>
                <span className="small">
                  Discovery call, proposal, close. You stay on the intro thread and get notified at
                  every milestone. Not every intro closes — when it does, you get paid.
                </span>
              </div>
            </div>
            <div className="step">
              <div className="n">4</div>
              <div>
                <span className="big">You get paid on real money.</span>
                <span className="small">
                  USD 1,500 when your referral pays their first invoice, +USD 500 at month 3. Only
                  on money collected — never on signatures.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="block" aria-label="Who you're partnering with">
          <h2>Who you&apos;re partnering with</h2>
          <div className="who-card">
            <p>
              <b>Amir Gómez</b>, founder of <b>A+ Growth</b> — a digital marketing and AI-powered
              growth agency with clients in the US (Los Angeles, Miami) and Latin America.
            </p>
            <p>
              We work across luxury verticals (fine art, private aviation, real estate), service
              businesses, and e-commerce. Full stack: paid ads (Meta, Google, TikTok, LinkedIn),
              high-converting websites and funnels, automation, and AI.
            </p>
            <div className="statcards">
              <div className="statcard placeholder">
                <div className="metric">[metric]</div>
                <p className="ctx">[one-line context]</p>
              </div>
              <div className="statcard placeholder">
                <div className="metric">[metric]</div>
                <p className="ctx">[one-line context]</p>
              </div>
              <div className="statcard placeholder">
                <div className="metric">[metric]</div>
                <p className="ctx">[one-line context]</p>
              </div>
            </div>
            <p className="links">
              <a href="https://www.weareaplus.net" target="_blank" rel="noopener">
                weareaplus.net
              </a>
              {' · '}
              <a href="https://www.instagram.com/amir.growthmkt" target="_blank" rel="noopener">
                @amir.growthmkt
              </a>
            </p>
          </div>
        </section>

        <section className="cta-block" aria-label="Start by email">
          <h2>Ready? Start with one email.</h2>
          <a
            className="btn btn-solid"
            href={MAILTO}
            onClick={() => push('referral_email_start')}
          >
            Send my first intro
          </a>
          <p className="cta-note">
            Don&apos;t have a name in mind yet? That&apos;s fine — introduce yourself and tell us
            about your network.
          </p>
        </section>

        <section className="secondary" aria-label="Prefer to talk first">
          <p>
            Prefer a quick call before anything?{' '}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener"
              onClick={() => push('referral_call_click')}
            >
              Book 15 minutes here
            </a>
            .
          </p>
        </section>

        <p className="legal">
          Commissions are paid only on payments actually collected from the referred client.
        </p>
      </main>
    </div>
  );
}
