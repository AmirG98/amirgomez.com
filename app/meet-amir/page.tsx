import type { Metadata } from "next";
import MeetTheTeamContent from "@/components/MeetTheTeamContent";

export const metadata: Metadata = {
  title: "Book Your Audit Call — A+ Growth",
  description:
    "Pick a slot for your 15-minute Meta ads audit call with Amir Gomez — free, virtual, no obligation.",
  robots: { index: false, follow: false },
};

// Evento "Growth Plan w/Expert" (único calendario habilitado para audits)
const CAL =
  "https://calendly.com/amir-amirgomez/30min?embed_domain=www.weareaplus.net&embed_type=Inline" +
  "&hide_gdpr_banner=1&primary_color=f59e0b&background_color=0a0a0a&text_color=ffffff";

export default function MeetAmirPage() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Un solo header para toda la página */}
      <header className="relative z-10 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            A+Growth
          </a>
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span>Full-Funnel Marketing</span>
          </div>
        </div>
      </header>

      {/* Calendario arriba */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-2">
        <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
          Free Meta Ads Audit
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Book your audit call</h1>
        <p className="text-white/60 mb-6">15 minutes, virtual. Pick the slot that works for you.</p>
        {/* Sin tarjeta contenedora: el fondo del embed es el mismo #0a0a0a de la página,
            así el calendario flota y no hay costura con la sección siguiente */}
        <iframe
          src={CAL}
          title="Book your audit call — A+ Growth"
          className="w-full h-[760px] border-0 block"
        />
      </section>

      {/* Todo lo de meet-the-team debajo, sin header ni banner duplicados */}
      <MeetTheTeamContent embedded />
    </div>
  );
}
