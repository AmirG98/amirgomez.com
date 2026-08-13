// HTML de la landing Referral Partners (sin scripts). Renderizado por page.tsx.
// Orden: Hero (sin CTA) → Who to Refer → Your Commission → [PRIMER CTA] → How It Works
//        → Attribution Guarantee → Who We Are → CTA final. Ambos CTAs van a /referral-partners/start.
const bodyHtml: string = `<header class="hero">
  <div class="wrap">
    <div class="wordmark">A<span>+</span> Growth</div>
    <p class="eyebrow">Referral Program · Partner Brief</p>
    <h1>Turn one intro into <span class="hl">$2,000</span>.</h1>
    <p class="sub">Earn a commission for every business you introduce that becomes a client.
      <strong>You make the introduction — we handle everything else.</strong></p>
    <div class="trust-chips">
      <span class="chip">No selling</span>
      <span class="chip">No meetings</span>
      <span class="chip">No follow-up</span>
    </div>
  </div>
</header>

<main class="wrap">
  <section class="section" aria-label="The program">
    <p class="lede">No selling, no meetings, no follow-up required. We handle everything from the
      first call onward, and <b>you get paid when your referral becomes a paying client.</b></p>
  </section>

  <section class="section">
    <div class="card">
      <div class="card-bar">
        <h2><em>01</em>Who to Refer</h2>
        <span class="tag">The ideal introduction</span>
      </div>
      <div class="card-body">
        <p class="callout hero-line">A business already spending $2,000+/month on ads that aren't
          converting — or one that needs a website and funnel that actually sell.</p>
        <p class="industries-line">We have deep experience in luxury verticals (fine art, private
          aviation, real estate), service businesses, and e-commerce.</p>
        <div class="signals">
          <p>Everyday signals to watch for:</p>
          <div class="chips">
            <span class="chip">Ads that don't perform</span>
            <span class="chip">Outdated website</span>
            <span class="chip">Leads that never get a response</span>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-bar">
        <h2><em>02</em>Your Commission</h2>
        <span class="tag">Up to USD 2,000 per client</span>
      </div>
      <div class="card-body">
        <div class="stats">
          <div class="stat">
            <div class="amount">USD 1,500</div>
            <p class="when">when your referral becomes a client and <b>pays their first monthly
              invoice</b>.</p>
          </div>
          <div class="stat">
            <div class="amount">+ USD 500</div>
            <p class="when">when that client reaches <b>3 months active and in good
              standing</b>.</p>
          </div>
        </div>
        <p class="callout"><span class="lead">Important:</span> both payments trigger only on
          payments <b>collected</b> from the client — never on contract signature.</p>
        <div class="commission-notes">
          <p><b>Transparent attribution:</b> you know the status of your referral at every stage.</p>
          <p><b>No quotas, no exclusivity, no sales experience needed.</b></p>
          <p><b>Optional involvement:</b> if you'd like, you're welcome to join the first discovery
            call (all our calls are virtual) — some partners prefer to make a warm handoff and
            introduce both sides live on the call. Entirely optional; most simply make the intro
            and we take it from there.</p>
          <p><b>Finder's fee:</b> if you introduce us to someone with a network of their own who
            joins as a Referral Partner, you can earn a finder's fee when their first referral
            becomes a paying client. Ask us for details.</p>
        </div>
      </div>
    </div>

    <div class="mid-cta">
      <p class="mid-cta-line">Now you know who qualifies and how you get paid.</p>
      <a class="btn btn-solid" href="/referral-partners/start" data-cta="mid">See how to start</a>
    </div>

    <div class="band">
      <p class="band-label">What your first 90 days could look like</p>
      <div class="stats3">
        <div><div class="n">15</div><p class="d">intros</p></div>
        <div><div class="n">5</div><p class="d">clients closed</p></div>
        <div><div class="n">$7,500</div><p class="d">in commissions</p></div>
      </div>
      <p class="cap">Example scenario based on our program terms — an intro is usually one
        email long.</p>
    </div>

    <div class="card">
      <div class="card-bar">
        <h2><em>03</em>How It Works</h2>
        <span class="tag">Three steps</span>
      </div>
      <div class="card-body">
        <div class="steps">
          <div class="step">
            <div class="badge">1</div>
            <p><b>You make the intro.</b> One introduction — that's your whole job.</p>
          </div>
          <div class="step">
            <div class="badge">2</div>
            <p><b>We take it from there.</b> Amir personally leads the discovery call and the
              proposal — white-glove, end to end.</p>
          </div>
          <div class="step">
            <div class="badge">3</div>
            <p><b>Your reputation stays protected.</b> If there's no fit, we say so quickly and
              honestly — and we never spam your network.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-bar">
        <h2><em>04</em>Attribution Guarantee</h2>
        <span class="tag">Your win is provable</span>
      </div>
      <div class="card-body">
        <p class="card-lead">You never have to wonder whether your intro counted — your win
          stays visible from intro to close:</p>
        <div class="steps two">
          <div class="step">
            <div class="badge">✓</div>
            <p><b>You're on the intro thread.</b> And we notify you at every milestone.</p>
          </div>
          <div class="step">
            <div class="badge">✓</div>
            <p><b>Whatever you need.</b> Deal status at every stage — everything required to
              attribute your win.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="who" aria-label="Who we are">
    <p class="eyebrow">Who We Are</p>
    <h2>A growth agency built on results</h2>
    <p>A+ Growth is a digital marketing and AI-powered growth agency founded by Amir Gómez,
      serving clients in the US (Los Angeles, Miami) and Latin America — from luxury verticals
      like fine art, private aviation, and real estate to service businesses and e-commerce.
      We deliver paid advertising (Meta, Google, TikTok, LinkedIn), high-converting websites and
      landing pages, marketing automation, and AI solutions.</p>
    <p class="process">Discovery <span class="arrow">→</span> Strategy
      <span class="arrow">→</span> Implementation <span class="arrow">→</span> Optimization</p>
  </section>
</main>

<footer class="foot">
  <div class="wrap">
    <h2>Ready to <span>refer</span>?</h2>
    <p class="contact">Amir Gómez — Founder, A+ Growth &nbsp;·&nbsp;
      <a href="https://www.weareaplus.net" target="_blank" rel="noopener">weareaplus.net</a>
      &nbsp;·&nbsp;
      <a href="https://www.instagram.com/amir.growthmkt" target="_blank" rel="noopener">@amir.growthmkt</a></p>
    <div class="cta-row">
      <a class="btn btn-solid" href="/referral-partners/start" data-cta="footer">See how to start</a>
    </div>
    <p class="legal">Commissions are paid only on payments actually collected from the referred
      client.</p>
  </div>
</footer>`;
export default bodyHtml;
