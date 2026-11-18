"use client";

import Reveal from "../../motion/Reveal";

interface DestinationIntroProps {
  description: string;
  vibeKeywords: string[];
}

export default function DestinationIntro({ description, vibeKeywords }: DestinationIntroProps) {
  // Split description into opening sentence and supporting text
  const sentences = description.match(/[^.!?]+[.!?]+/g) || [description];
  const openingSentence = sentences[0];
  const supportingParagraph = sentences.slice(1).join(" ").trim();

  return (
    <section className="section bg-background border-y border-border">
      <div className="mx-auto max-w-2xl container-x text-center">
        <Reveal>
          <div className="space-y-12">
            {/* Soft Gold Divider */}
            <div className="flex justify-center">
              <div className="h-px w-12 bg-accent-gold/40" />
            </div>

            {/* Serif Opening Sentence */}
            <h2 className="font-serif text-text-primary text-3xl md:text-4xl leading-snug italic">
              {openingSentence}
            </h2>

            {/* Sans-serif Supporting Paragraph */}
            {supportingParagraph && (
              <p className="font-sans text-text-secondary text-base md:text-lg leading-relaxed font-light">
                {supportingParagraph}
              </p>
            )}

            {/* Vibe Keywords Footer */}
            <div className="pt-8 flex flex-wrap justify-center gap-2">
              {vibeKeywords.map((keyword) => (
                <span 
                  key={keyword} 
                  tabIndex={0}
                  className="syren-pill border! border-accent-gold/40! bg-accent-gold/15! text-accent-gold-ink! hover:bg-accent-gold/25! hover:border-accent-gold/50!"
                >
                  {keyword}
                </span>
              ))}
            </div>
            
            <div className="flex justify-center pt-4">
              <div className="h-px w-12 bg-accent-gold/40" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
