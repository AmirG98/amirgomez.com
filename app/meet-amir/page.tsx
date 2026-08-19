import type { Metadata } from "next";
import MeetTheTeamContent from "@/components/MeetTheTeamContent";

export const metadata: Metadata = {
  title: "Book Your Audit Call — A+ Growth",
  description:
    "Pick a slot for your 15-minute Meta ads audit call with Amir Gómez — free, virtual, no obligation.",
  robots: { index: false, follow: false },
};

const CAL =
  "https://calendly.com/amir-amirgomez?embed_domain=www.weareaplus.net&embed_type=Inline" +
  "&hide_gdpr_banner=1&primary_color=f59e0b&background_color=0a0a0a&text_color=ffffff";

export default function MeetAmirPage() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Calendario arriba */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-6">
        <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
          Free Meta Ads Audit
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Book your audit call</h1>
        <p className="text-white/60 mb-6">15 minutes, virtual. Pick the slot that works for you.</p>
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
          <iframe
            src={CAL}
            title="Book your audit call — A+ Growth"
            className="w-full h-[1000px] border-0 block"
          />
        </div>
      </section>
      {/* Todo lo de meet-the-team debajo */}
      <MeetTheTeamContent />
    </div>
  );
}
