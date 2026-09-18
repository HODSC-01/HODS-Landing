interface SermonsSectionProps {
  videoId?: string
  youtubeChannelUrl?: string
}

export default function SermonsSection({
  videoId = 'ecvL6A39Nuc',
  youtubeChannelUrl = 'https://youtu.be/ecvL6A39Nuc',
}: SermonsSectionProps) {
  return (
    <section id="sermons" className="w-full bg-[#0e538d] border-0 overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Bold Catch-Up Messaging (Compact Height) */}
        <div className="lg:col-span-5 px-6 sm:px-10 lg:px-14 py-8 sm:py-10 flex flex-col justify-center items-start text-left">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-white/40 bg-white/10 text-white text-xs font-semibold tracking-wide mb-3 backdrop-blur-xs">
            Missed Service?
          </div>

          {/* Catch Up Heading */}
          <h2 className="text-[clamp(2rem,3.6vw,3.2rem)] font-black text-white leading-[1.02] tracking-tight uppercase">
            CATCH UP<br />
            ON OUR<br />
            POWERFUL
          </h2>

          {/* Slanted Vibrant SERMONS Highlight Tag */}
          <div className="mt-2 inline-block bg-[#b9d529] text-[#0a416e] font-black text-[clamp(1.7rem,3vw,2.7rem)] leading-none px-4 py-1.5 rounded-lg -rotate-2 shadow-md tracking-tight uppercase select-none">
            SERMONS
          </div>

          {/* Supportive description */}
          <p className="mt-3 text-white/85 text-xs sm:text-sm leading-relaxed max-w-sm">
            Stream inspirational messages and spirit-filled worship anytime, anywhere.
          </p>

          {/* Call to Action Button */}
          <div className="mt-5 flex items-center gap-3">
            <a
              href={youtubeChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0e538d] font-bold text-xs sm:text-sm shadow-sm hover:bg-slate-100 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4 text-red-600 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch on YouTube
            </a>
          </div>

        </div>

        {/* Right Column: Video Embed Player (Full Bleed, Reduced Height) */}
        <div className="lg:col-span-7 bg-black flex items-center justify-center relative min-h-[250px] sm:min-h-[320px] lg:min-h-[360px] max-h-[460px] overflow-hidden">
          <div className="w-full h-full aspect-video">
            <iframe
              className="w-full h-full object-cover border-0"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
              title="House of Dayspring Featured Sermon"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

      </div>
    </section>
  )
}
