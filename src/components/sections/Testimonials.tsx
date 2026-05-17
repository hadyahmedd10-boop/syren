import TrustpilotWidget from "@/components/ui/TrustpilotWidget";
import ShareYourStory from './ShareYourStory'
import SectionHeader from '../layout/SectionHeader'

export default async function Testimonials() { 
  return ( 
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <SectionHeader 
            title="Echoes of Extraordinary Journeys" 
            label="Voices of Syren" 
            className="mb-0"
          />
          <ShareYourStory />
        </div>

        <TrustpilotWidget variant="carousel" height="240px" />
        
        <div className="text-center mt-6">
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
  ) 
}
