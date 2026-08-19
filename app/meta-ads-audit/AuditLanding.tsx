'use client';

import { useState } from 'react';
import { Fraunces } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
});

const SPEND_OPTIONS = ['Less than $1,000', '$1,000 – $2,000', '$2,000 – $5,000', '$5,000+'];
const RUNNER_OPTIONS = ['Myself', 'An agency', 'A freelancer', 'Nobody yet'];
const TENURE_OPTIONS = ['Less than 3 months', '3 – 12 months', '1 – 3 years', '3+ years'];

export default function AuditLanding() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    // Notificación por mail a Amir (Resend, mismo esquema que notify-affluent-quiz)
    fetch('/api/notify-audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {});

    // Meta Pixel: Lead (el pixel se carga globalmente en app/layout.tsx)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.fbq === 'function') {
      w.fbq('track', 'Lead', { content_name: 'meta-ads-audit', spend_tier: data.spend });
    }
    // GTM: audit_request con el tier de inversión para separar leads calificados
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'audit_request', spend_tier: data.spend, campaign_runner: data.runner });

    // Mismo pipeline que el resto de los forms del sitio (Google Apps Script → Sheets)
    const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
    if (appsScriptUrl && appsScriptUrl !== 'YOUR_APPS_SCRIPT_URL_HERE') {
      fetch(appsScriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, formType: 'meta-ads-audit' }),
        mode: 'no-cors',
      }).catch(() => {});
    }

    setSubmitted(true);
    setSending(false);
    // Todos pasan a bookear su slot; la priorización por spend viaja en el mail
    setTimeout(() => { window.location.href = '/meet-amir'; }, 2000);
  };

  return (
    <div className={`ma ${fraunces.variable}`}>
      <div className="topbar">
        <div className="col">
          <span className="wordmark">A<span>+</span> Growth</span>
          <span className="tag">Free Meta Ads Audit</span>
        </div>
      </div>

      {/* 1. Hero — dolor, sin CTA: el lector tiene que scrollear */}
      <header className="hero">
        <div className="col">
          <h1>Your Meta ads might be <em>leaking money</em>. Let&rsquo;s find out in 15 minutes.</h1>
          <p className="sub">A <strong>free audit, no obligation</strong> — from a team that&rsquo;s
            launched <strong>300+ funnels</strong>.</p>
          <p className="scroll-cue">Scroll ↓</p>
        </div>
      </header>

      <main>
        {/* 2. What you'll get */}
        <section aria-label="What you'll get">
          <div className="col">
            <p className="eyebrow">What you&rsquo;ll get</p>
            <h2>Three things, all of them useful.</h2>
            <div className="gets">
              <div className="get"><span className="n">1</span>
                <p><b>Exactly where budget is being wasted</b> — campaign by campaign, in plain
                  numbers.</p>
              </div>
              <div className="get"><span className="n">2</span>
                <p><b>2–3 fixes you can apply yourself</b>, this week, without hiring anyone.</p>
              </div>
              <div className="get"><span className="n">3</span>
                <p><b>An honest take on whether your account even needs help.</b> If it
                  doesn&rsquo;t, we&rsquo;ll say so.</p>
              </div>
            </div>
            <p className="no-strings"><b>Real value, free.</b> No obligation to buy anything.</p>
          </div>
        </section>

        {/* 3. Filtro */}
        <div className="col">
          <div className="filter">
            <p className="big">This is for you if you&rsquo;re spending <span>$2,000+/month</span> on
              Meta ads and you&rsquo;re not confident it&rsquo;s working.</p>
            <p className="small">Not spending that yet, but still want to talk about launching
              your marketing? Email us directly at{' '}
              <a href="mailto:amir@amirgomez.com">amir@amirgomez.com</a>.</p>
          </div>
        </div>

        {/* 4. Credibilidad */}
        <section className="cred" aria-label="Who's behind the audit">
          <div className="col">
            <p className="eyebrow">Who&rsquo;s behind it</p>
            <h2>Audited by the person who&rsquo;d run it.</h2>
            <p><b>Amir Gómez</b> has spent <b>10+ years</b> building paid acquisition for brands in
              the US (LA, Miami) and Latin America — <b>300+ funnels launched</b> across Meta ads,
              Google ads, and AI-assisted creative.</p>
            {/* Métricas reales — las mismas publicadas en el home de weareaplus.net */}
            <div className="stat-cards">
              <div className="stat-card"><div className="m">63,000 leads</div>
                <p className="c">at $4.50 average cost — a $335K/yr social campaign for a US
                  home-decor brand.</p></div>
              <div className="stat-card"><div className="m">7× ROAS</div>
                <p className="c">up from 2×, after scaling UGC + AI creative volume 20× for a US
                  legal company.</p></div>
              <div className="stat-card"><div className="m">$50 → $5</div>
                <p className="c">10× lower cost per qualified lead — full funnel and lead magnet
                  built end to end.</p></div>
            </div>
          </div>
        </section>

        {/* Social proof: mensaje de LinkedIn recibido por Amir (texto literal, anónimo) */}
        <section className="proof" aria-label="What a former client says">
          <div className="col">
            <p className="eyebrow">Unprompted, via LinkedIn</p>
            <blockquote>
              <p className="pull">&ldquo;You were the first and only person that came to mind as
                the person who actually understood it all — <em>without marketing smoke and
                mirrors</em>.</p>
              <p className="rest">The nuances. How to iterate in a controlled, systematic manner
                to build slow but consistent growth. And I know you understand the interwoven
                fabric of organic and paid and how they work together.&rdquo;</p>
              <footer>Former client, now leading marketing in-house — name and company withheld.</footer>
            </blockquote>
          </div>
        </section>

        {/* 5. Form calificador / 6. Thank-you */}
        <div className="col">
          <div className="form-wrap" id="audit">
            {submitted ? (
              <div className="thanks" role="status">
                <div className="check">✓</div>
                <h2>Request received.</h2>
                <p><b>Next step:</b> book your <b>15-minute audit call</b> — pick the slot that
                  works for you.</p>
                <p className="redirect-note">Taking you to <a href="/meet-amir">the
                  calendar</a>&hellip;</p>
              </div>
            ) : (
              <>
                <h2>Get your free audit</h2>
                <p className="lead">Six quick questions so the audit is worth your time.</p>
                <form onSubmit={handleSubmit}>
                  <label>Name
                    <input name="name" type="text" autoComplete="name" required />
                  </label>
                  <label>Email
                    <input name="email" type="email" autoComplete="email" required />
                  </label>
                  <label>Website
                    <input name="website" type="text" inputMode="url" placeholder="yourbrand.com" required />
                  </label>
                  <label>How much do you spend per month on Meta ads?
                    <select name="spend" required defaultValue="">
                      <option value="" disabled>Select a range</option>
                      {SPEND_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <label>Who runs your campaigns now?
                    <select name="runner" required defaultValue="">
                      <option value="" disabled>Select one</option>
                      {RUNNER_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <label>How long have you been running them?
                    <select name="tenure" required defaultValue="">
                      <option value="" disabled>Select one</option>
                      {TENURE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <button className="submit" type="submit" disabled={sending}>
                    Get my free audit
                  </button>
                  <p className="fineprint">We review every request and reply within 24 hours.
                    If we&rsquo;re not the right fit, we&rsquo;ll tell you.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <footer>
        <div className="col">
          <span>A+ Growth — Amir Gómez</span>
          <a href="https://www.weareaplus.net" target="_blank" rel="noopener">weareaplus.net</a>
          <a href="/privacy">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
