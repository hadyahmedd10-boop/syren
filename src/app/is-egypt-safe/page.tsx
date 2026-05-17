import type { Metadata } from "next";
import Link from "next/link";
import { HERO_IMAGES } from "@/lib/images";
import HeroShell from "@/components/ui/HeroShell";
import ExitIntentPopup from "@/components/ui/ExitIntentPopup";

export const metadata: Metadata = {
  title: "Is Egypt Safe to Travel? 2026 Guide | Syren",
  description:
    "Is Egypt safe to travel in 2026? Our honest local guide covers tourist safety, solo female travel, practical tips, and why millions visit Egypt safely every year.",
  keywords: [
    "is egypt safe",
    "is it safe to travel to egypt",
    "is egypt safe for tourists",
    "is egypt safe for women",
    "solo travel egypt",
    "egypt travel safety 2026",
    "is cairo safe",
    "egypt travel tips",
  ],
  alternates: { canonical: "/is-egypt-safe" },
  openGraph: {
    title: "Is Egypt Safe to Travel? 2026 Guide | Syren",
    description:
      "Is Egypt safe to travel in 2026? Our honest local guide covers tourist safety, solo female travel, practical tips, and why millions visit Egypt safely every year.",
    type: "article",
    url: "https://www.syrentravel.com/is-egypt-safe",
    images: [{ url: HERO_IMAGES.home.src }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Is Egypt Safe to Travel? 2026 Guide | Syren",
    description:
      "Is Egypt safe to travel? Honest answers on solo travel, women travelers, safety tips, and why millions visit Egypt safely every year.",
  },
};

export default function IsEgyptSafe() {
  return (
    <main className="min-h-screen bg-background">
      <ExitIntentPopup
        forceEnable
        eyebrow="Travel Safety"
        headline="Start Planning Your Safe Egypt Journey"
        subtext="Let our local experts handle every detail — so all you have to do is show up and fall in love with Egypt."
        ctaLabel="Get My Free Travel Plan →"
        ctaHref="/quote"
        dismissLabel="I'll figure it out myself"
      />
      <HeroShell
        backgroundImage={HERO_IMAGES.home.src}
        eyebrow="Travel Safety • 2026"
        title="Is Egypt Safe to Travel?"
        subtitle="Over 15 million people visited Egypt last year. Here's what they actually experienced."
        heightClassName="min-h-[60vh] md:min-h-[70vh]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/experiences" className="syren-btn">
            Explore Our Experiences →
          </Link>
          <Link href="/quote" className="syren-btn-secondary">
            Start Planning →
          </Link>
        </div>
      </HeroShell>

      <article className="section border-t border-border bg-background">
        <div className="container-x mx-auto max-w-3xl space-y-12">
          <section>
            <div className="uppercase text-[11px] tracking-[0.25em] text-accent-gold font-semibold mb-3">
              Opening
            </div>
            <h2 className="font-serif text-2xl text-text-primary mb-4">Let&apos;s Be Honest About Egypt&apos;s Reputation</h2>
            <p className="font-serif text-text-primary leading-loose">
              Egypt has a complicated relationship with the headlines. Every few years, a story surfaces that sends ripples through travel forums and family group chats. Parents worry. Partners hesitate. And travelers who&apos;ve never set foot in Cairo find themselves second-guessing a dream they&apos;ve held since childhood.
            </p>
            <p className="font-serif text-text-primary leading-loose">
              Here&apos;s what those headlines almost never tell you: Egypt has been welcoming foreign visitors for over three thousand years. The pharaohs built the infrastructure. The Nile did the rest. And today, Egypt&apos;s entire economy is built around making sure that every single tourist who arrives leaves wanting to come back. Explore our{" "}
              <Link href="/experiences" className="text-accent-gold underline">experiences</Link> and{" "}
              <Link href="/events" className="text-accent-gold underline">events</Link> to see how we curate it properly.
            </p>
            <p className="font-serif text-text-primary leading-loose">
              We&apos;re Syren — a travel agency born and raised in Egypt. We&apos;ve guided travelers from London, Dubai, São Paulo, and New York through this country. And we want to give you the honest, unfiltered answer that travel advisories can&apos;t.
            </p>
          </section>

          <hr className="border-t border-accent-gold/30" />

          <section>
            <div className="uppercase text-[11px] tracking-[0.25em] text-accent-gold font-semibold mb-3">
              The Reality
            </div>
            <h2 className="font-serif text-2xl text-text-primary mb-4">What Egypt Actually Looks Like on the Ground</h2>
            <p className="font-serif text-text-primary leading-loose">
              When you land at Cairo International Airport, the first thing most travelers notice isn&apos;t danger — it&apos;s energy. The city moves like nowhere else on earth. Horns, colour, the smell of koshary from a street cart, a minaret cutting through the haze. It&apos;s overwhelming in the best possible way.
            </p>
            <p className="font-serif text-text-primary leading-loose">
              Tourist areas in Egypt — and we mean the Pyramids of Giza, the Egyptian Museum, Luxor&apos;s Valley of the Kings, Aswan&apos;s Philae Temple, the Red Sea coast — operate under a separate layer of security that most travelers never even notice because it blends seamlessly into the experience. Tourist police patrol these sites around the clock. Licensed guides carry credentials. Hotels catering to international visitors meet global safety standards.
            </p>
            <p className="font-serif text-text-primary leading-loose">
              The Egypt that exists in travel warnings is largely a different Egypt from the one tourists inhabit. The areas of genuine instability are remote, away from every major tourist route, and frankly, you&apos;d have to go significantly out of your way to reach them. The Egypt you&apos;re dreaming of — the pyramids at sunrise, felucca sailing on the Nile, diving the Red Sea — is safe, accessible, and waiting.
            </p>
          </section>

          <hr className="border-t border-accent-gold/30" />

          <section>
            <div className="uppercase text-[11px] tracking-[0.25em] text-accent-gold font-semibold mb-5">
              Safety Qualities
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-accent-gold/40 bg-surface/40 p-5">
                <h3 className="font-serif text-xl text-text-primary mb-1">Tourist Police at Every Step</h3>
                <p className="font-serif text-text-secondary">
                  Egypt operates one of the most visible tourist protection systems in the world. Dedicated tourist police — separate from the regular force — are stationed at every major site, museum, airport, and hotel district. Their entire job is making sure your experience is seamless and safe.
                </p>
              </div>
              <div className="rounded-2xl border border-accent-gold/40 bg-surface/40 p-5">
                <h3 className="font-serif text-xl text-text-primary mb-1">A Culture Built on Hospitality</h3>
                <p className="font-serif text-text-secondary">
                  The Arabic word &apos;ahlan wa sahlan&apos; means &apos;you are among family.&apos; This isn&apos;t a marketing phrase — it&apos;s a cultural truth. Egyptian hospitality is legendary. Strangers invite you for tea. Locals go out of their way to help you find your destination. The concept of a guest being harmed under an Egyptian&apos;s watch is genuinely contrary to the culture.
                </p>
              </div>
              <div className="rounded-2xl border border-accent-gold/40 bg-surface/40 p-5">
                <h3 className="font-serif text-xl text-text-primary mb-1">Millions Visit Every Year</h3>
                <p className="font-serif text-text-secondary">
                  Egypt welcomed over 15 million tourists in 2023, a record year. Visitors came from Germany, France, the UK, Russia, the Gulf, and the Americas. The overwhelming majority returned home with nothing but extraordinary memories and a long list of reasons to come back.
                </p>
              </div>
              <div className="rounded-2xl border border-accent-gold/40 bg-surface/40 p-5">
                <h3 className="font-serif text-xl text-text-primary mb-1">Infrastructure Built for International Travelers</h3>
                <p className="font-serif text-text-secondary">
                  Cairo, Luxor, Hurghada, and Sharm El Sheikh have international-standard airports, world-class hotels, and well-established tourist infrastructure. Getting around safely is straightforward — especially when you have a local team handling your transfers and logistics.
                </p>
              </div>
              <div className="rounded-2xl border border-accent-gold/40 bg-surface/40 p-5">
                <h3 className="font-serif text-xl text-text-primary mb-1">Low Violent Crime Against Tourists</h3>
                <p className="font-serif text-text-secondary">
                  Petty scams exist — as they do in Paris, Barcelona, and Bangkok. But violent crime against tourists in Egypt is extremely rare. The Egyptian government treats tourist safety as a national priority, and incidents that do occur are taken seriously at the highest levels.
                </p>
              </div>
              <div className="rounded-2xl border border-accent-gold/40 bg-surface/40 p-5">
                <h3 className="font-serif text-xl text-text-primary mb-1">Your Syren Team Is Always On Call</h3>
                <p className="font-serif text-text-secondary">
                  When you travel with Syren, you&apos;re never navigating Egypt alone. Our local team is reachable 24 hours a day. We know every driver, every guide, every hotel manager on your itinerary personally. If anything ever feels off, one message to us and it&apos;s handled.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-t border-accent-gold/30" />

          <section>
            <div className="uppercase text-[11px] tracking-[0.25em] text-accent-gold font-semibold mb-3">
              Women Traveling
            </div>
            <h2 className="font-serif text-2xl text-text-primary mb-1">Women Traveling to Egypt — The Real Story</h2>
            <p className="text-accent-gold uppercase tracking-[0.2em] text-[11px] font-semibold mb-4">
              This is the question we get asked most. Here&apos;s the answer no one else is giving you.
            </p>
            <div className="space-y-4">
              <p className="font-serif text-text-primary leading-loose">
                Let&apos;s start with the truth that most travel guides bury in disclaimers: thousands of women travel to Egypt alone every single month. They visit the pyramids at dawn. They sail the Nile. They dive the Red Sea. They sit in Cairo&apos;s old coffee houses and wander the spice markets of Aswan. And they leave with stories they tell for the rest of their lives.
              </p>
              <p className="font-serif text-text-primary leading-loose">
                Is Egypt a conservative country? Yes. Does that mean it&apos;s unsafe for women? Absolutely not. These are two very different things.
              </p>
              <p className="font-serif text-text-primary leading-loose">
                The practical reality is this: dress modestly outside of resort areas — a light scarf and covered shoulders goes a long way — and you&apos;ll find that Egyptian society treats international visitors with a level of courtesy and curiosity that can genuinely surprise you. You&apos;re not invisible. You&apos;re a guest. And guests are treated well.
              </p>
              <p className="font-serif text-text-primary leading-loose">
                Where women do sometimes experience unwanted attention — as happens in virtually every country on earth, including European capitals — it is almost always verbal, easily deflected, and far less aggressive than what many women encounter in major Western cities on a weekend night.
              </p>
              <p className="font-serif text-text-primary leading-loose">
                The Syren difference for women traveling alone is significant. Every driver we work with is vetted, licensed, and known to us personally. Every guide has been selected not just for knowledge but for professionalism. Your itinerary is designed so that you&apos;re never in an ambiguous situation — you always know exactly where you&apos;re going, who&apos;s meeting you, and how to reach us instantly if anything ever feels wrong.
              </p>
              <p className="font-serif text-text-primary leading-loose">
                We&apos;ve guided solo female travelers in their 20s and women in their 60s traveling alone for the first time. The feedback we hear most often isn&apos;t &apos;I felt safe.&apos; It&apos;s &apos;I felt free.&apos;
              </p>
              <p className="font-serif text-text-primary leading-loose">
                That&apos;s the Egypt we want you to experience.
              </p>
            </div>
          </section>

          <hr className="border-t border-accent-gold/30" />

          <section>
            <div className="uppercase text-[11px] tracking-[0.25em] text-accent-gold font-semibold mb-3">
              Tips
            </div>
            <h2 className="font-serif text-2xl text-text-primary mb-4">Syren&apos;s Honest Safety Guide for Egypt</h2>
            <ol className="space-y-4">
              <li>
                <div className="flex gap-3">
                  <span className="text-accent-gold font-serif font-semibold">1.</span>
                  <div>
                    <p className="font-serif text-text-primary leading-relaxed">Travel with a local agency you trust</p>
                    <p className="font-serif text-text-secondary leading-relaxed">
                      Not a faceless booking platform. A real team with real people who know the country, know the operators, and know how to solve problems before they become problems. This single decision changes everything about how your trip feels. If you&apos;re coming for festivals like{" "}
                      <Link href="/events/zamna-festival" className="text-accent-gold underline">Zamna</Link> or{" "}
                      <Link href="/events/sandbox-festival" className="text-accent-gold underline">Sandbox</Link>, we&apos;ll handle it end-to-end.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-3">
                  <span className="text-accent-gold font-serif font-semibold">2.</span>
                  <div>
                    <p className="font-serif text-text-primary leading-relaxed">Use vetted, licensed drivers for all transfers</p>
                    <p className="font-serif text-text-secondary leading-relaxed">
                      Never get into an unmarked taxi alone in any country. In Egypt, your Syren concierge arranges all your transfers with drivers we know by name. It costs the same. The difference in peace of mind is enormous.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-3">
                  <span className="text-accent-gold font-serif font-semibold">3.</span>
                  <div>
                    <p className="font-serif text-text-primary leading-relaxed">Stay in reputable hotels in tourist districts</p>
                    <p className="font-serif text-text-secondary leading-relaxed">
                      Egypt has extraordinary accommodation at every price point. The hotels we recommend aren&apos;t just beautiful — they&apos;re in safe, well-lit areas with professional security and staff who are used to international guests.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-3">
                  <span className="text-accent-gold font-serif font-semibold">4.</span>
                  <div>
                    <p className="font-serif text-text-primary leading-relaxed">Dress respectfully outside resort areas</p>
                    <p className="font-serif text-text-secondary leading-relaxed">
                      This is genuine advice, not a lecture. A light layer when you&apos;re visiting a mosque or a local market makes your experience better — locals respond to you differently, more openly, more warmly. It&apos;s a small gesture with a big return.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-3">
                  <span className="text-accent-gold font-serif font-semibold">5.</span>
                  <div>
                    <p className="font-serif text-text-primary leading-relaxed">Keep digital copies of your documents</p>
                    <p className="font-serif text-text-secondary leading-relaxed">
                      Email your passport, visa, and insurance to yourself before you travel. If something goes wrong, having these accessible from any device saves hours of stress.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-3">
                  <span className="text-accent-gold font-serif font-semibold">6.</span>
                  <div>
                    <p className="font-serif text-text-primary leading-relaxed">Save your Syren concierge number before you land</p>
                    <p className="font-serif text-text-secondary leading-relaxed">
                      The moment you touch down in Egypt, you should have one number saved that connects you to someone who knows your itinerary, speaks the language, and can solve any problem. That&apos;s us.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex gap-3">
                  <span className="text-accent-gold font-serif font-semibold">7.</span>
                  <div>
                    <p className="font-serif text-text-primary leading-relaxed">Trust the experience more than the headlines</p>
                    <p className="font-serif text-text-secondary leading-relaxed">
                      The travelers who enjoy Egypt most are the ones who arrive with open eyes rather than closed minds. The country rewards curiosity generously.
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </section>

          <hr className="border-t border-accent-gold/30" />

          <section className="space-y-6">
            <h2 className="font-serif text-2xl text-text-primary">Your Egypt Journey Starts With One Decision</h2>
            <p className="font-serif text-text-secondary leading-loose">
              The question was never really &apos;Is Egypt safe?&apos; The real question is: &apos;Am I ready to experience something that will genuinely change how I see the world?&apos; Millions of people answer yes every year. Our job is to make sure your answer leads to the most extraordinary version of that experience possible.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/experiences" className="syren-btn">
                Explore Our Experiences →
              </Link>
              <Link href="/quote" className="syren-btn-secondary">
                Start Planning →
              </Link>
            </div>
            <div className="pt-2 text-sm text-text-secondary">
              Written by the Syren Travel team — local Egypt experts dedicated to showing the world the country we love.
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
