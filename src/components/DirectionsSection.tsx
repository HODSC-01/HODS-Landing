import { Car, HeartHandshake, Sparkles, MapPin, Navigation, ExternalLink } from 'lucide-react'

interface DirectionsSectionProps {
  address?: string
  googleMapsQuery?: string
}

export default function DirectionsSection({
  address = 'House of Dayspring International Church Main Auditorium',
  googleMapsQuery = 'House of Dayspring International Church',
}: DirectionsSectionProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(googleMapsQuery)}`

  return (
    <section id="directions" className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#fbfbfd] border-0">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a030]">
            Plan Your Visit
          </span>
          <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-tight text-[#1a2090] mt-2 mb-4">
            Directions to HODi
          </h2>
          <p className="text-sm sm:text-base text-[#5a6080] leading-relaxed">
            We can't wait to welcome you! Whether it's your first time or your hundredth, here is everything you need to find us easily.
          </p>
        </div>

        {/* 2-Column Card Grid: Location Details + Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Directions & Visitor Information */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-white border border-gray-100 shadow-md">
            <div>
              {/* Location Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a2090]/10 text-[#1a2090] text-xs font-bold tracking-wide mb-6">
                <MapPin className="w-3.5 h-3.5 text-[#1a2090]" />
                Main Campus &amp; Sanctuary
              </div>

              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">
                House of Dayspring International Church
              </h3>
              <p className="text-sm text-[#5a6080] mb-6 leading-relaxed">
                {address}
              </p>

              {/* Useful Arrival Notes */}
              <div className="space-y-5 pt-5 border-t border-gray-100 text-left">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#c9a030]/15 flex items-center justify-center text-[#c9a030] shrink-0 mt-0.5">
                    <Car className="w-4 h-4 text-[#8a6a10]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a2e]">Free On-Site Parking</h4>
                    <p className="text-xs text-[#5a6080] mt-0.5 leading-relaxed">Designated guest parking spaces and friendly parking guides upon arrival.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1a2090]/10 flex items-center justify-center text-[#1a2090] shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4 text-[#1a2090]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a2e]">Welcome Team</h4>
                    <p className="text-xs text-[#5a6080] mt-0.5 leading-relaxed">Our greeters will meet you at the doors and help guide you and your family.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1a2090]/10 flex items-center justify-center text-[#1a2090] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#1a2090]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a2e]">Children's Ministry Check-In</h4>
                    <p className="text-xs text-[#5a6080] mt-0.5 leading-relaxed">Safe, engaging environments for kids of all ages during Sunday services.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 mt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#1a2090] hover:bg-[#3040cc] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                Get Directions in Google Maps
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-md border border-gray-200 bg-white relative min-h-[350px] sm:min-h-[420px] flex flex-col">
            <iframe
              title="Directions to House of Dayspring International Church"
              className="w-full h-full min-h-[350px] sm:min-h-[420px] border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(googleMapsQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            />
            {/* Quick map bottom link bar */}
            <div className="bg-[#fcfbf9] px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#5a6080]">
              <span>House of Dayspring Main Campus</span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#1a2090] hover:underline"
              >
                Open Full Map
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
