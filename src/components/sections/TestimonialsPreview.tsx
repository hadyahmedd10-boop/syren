import SectionHeader from "../layout/SectionHeader";

const reviews = [
  {
    name: "Anthony Borg",
    rating: 5,
    text: "Nous avons réservé une voiture avec chauffeur pour un trajet Le Caire - Saqqarah - Dachour - Fayoum et retour au Caire sur 3 jours. Nous avons été ravis de la proposition faite par l'agence, ainsi que de par notre chauffeur qui nous toujours laisser le temps de visiter les différents sites, et à su s'adapter à notre organisation. Nous avons pu ainsi profiter de notre excursion en toute tranquillité.",
    title: "3 jours aux alentours du Caire",
  },
  {
    name: "Moon Moon",
    rating: 5,
    text: "The local experience with Syren was aaaamazinggg. I've been to two separate trips with the same local tour guide Hady, and both were extraordinary! My first was around Cairo through the streets of different places and sight seeing monuments I didn't know about, and unexpected places that have so much interesting history. My second experience was in El Gouna and it was out of this world, all natural places by the sea and a totally different experience than the city. I loved it! Will definitely be booking again soon!",
    title: "Extraordinary local experiences",
  },
  {
    name: "Ashley Markus",
    rating: 5,
    text: "I had such a great experience with Syren Travel. Everything was handled so smoothly from start to finish, and I truly felt taken care of the whole time. A special thank you to Hady, who was incredibly helpful and supportive throughout everything. What I loved most is that I didn't feel like just another tourist — I genuinely felt at home. The team is very trustworthy, welcoming, and professional. Definitely won't be my last time with them.",
    title: "Felt at home, not like a tourist",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-[#00b67a]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPreview() {
  return (
    <div className="bg-background py-10 sm:py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          title="Echoes of Extraordinary Journeys" 
          label="Verified Reviews" 
          className="mb-6 sm:mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border border-accent-gold/20 bg-surface/30 backdrop-blur-sm p-6 flex flex-col"
            >
              <Stars count={review.rating} />
              <h3 className="font-serif text-lg text-text-primary mt-3 mb-2">{review.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed flex-1 line-clamp-5">{review.text}</p>
              <div className="mt-4 pt-4 border-t border-border/30 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold font-serif text-sm font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{review.name}</div>
                  <div className="text-xs text-text-secondary flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-[#00b67a]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Verified on Trustpilot
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.trustpilot.com/review/syrentravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-gold text-sm hover:underline tracking-wide"
          >
            Read all reviews on Trustpilot →
          </a>
        </div>
      </div>
    </div>
  );
}
