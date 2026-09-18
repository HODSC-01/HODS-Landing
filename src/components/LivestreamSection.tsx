import { useState } from 'react'

const YT_CHANNEL_HANDLE = 'houseofdayspring8395'
// YouTube live stream embed for a channel handle
const YT_LIVE_SRC = `https://www.youtube.com/embed/live_stream?channel=${YT_CHANNEL_HANDLE}&autoplay=0&rel=0&modestbranding=1`
// Facebook Live page embed via Facebook's plugin
const FB_LIVE_PAGE_URL = 'https://www.facebook.com/HODLiveFeed'
const FB_EMBED_SRC = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(FB_LIVE_PAGE_URL + '/videos')}&show_text=0&mute=0&autoplay=false&width=800`

type Tab = 'youtube' | 'facebook'

export default function LivestreamSection() {
  const [activeTab, setActiveTab] = useState<Tab>('youtube')

  return (
    <section id="live" className="w-full bg-[#080e20] border-0 overflow-hidden py-0">
      {/* Top accent bar */}
      <div className="w-full h-1 bg-gradient-to-r from-[#c9a030] via-[#f0c060] to-[#c9a030]" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-10 pb-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex flex-col items-start gap-2">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Live
            </div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black text-white leading-tight tracking-tight">
              Watch <span className="text-[#c9a030]">HODi</span> Live
            </h2>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Join us live for Sunday worship, special services, and powerful messages — streamed directly to you.
            </p>
          </div>

          {/* Platform tabs */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setActiveTab('youtube')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
                activeTab === 'youtube'
                  ? 'bg-[#FF0000] text-white shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('facebook')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
                activeTab === 'facebook'
                  ? 'bg-[#1877F2] text-white shadow-md'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook Live
            </button>
          </div>
        </div>

        {/* Player Area */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl" style={{ minHeight: '360px' }}>
          {/* Subtle glow */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/5 z-10" />

          {activeTab === 'youtube' && (
            <div className="w-full aspect-video">
              <iframe
                key="youtube-live"
                className="w-full h-full border-0"
                src={YT_LIVE_SRC}
                title="House of Dayspring International Church — YouTube Live"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}

          {activeTab === 'facebook' && (
            <div className="w-full flex flex-col">
              {/* Facebook note banner */}
              <div className="bg-[#1877F2]/20 border-b border-[#1877F2]/30 px-5 py-2 flex items-center gap-2 text-xs text-blue-300">
                <svg className="w-3.5 h-3.5 fill-current text-[#1877F2] shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook Live — if the stream doesn't load, allow third-party cookies or
                <a
                  href={FB_LIVE_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold text-white hover:text-blue-200 ml-1"
                >
                  watch directly on Facebook →
                </a>
              </div>
              <div className="w-full aspect-video bg-black flex items-center justify-center relative">
                <iframe
                  key="facebook-live"
                  className="w-full h-full border-0"
                  src={FB_EMBED_SRC}
                  title="House of Dayspring International Church — Facebook Live"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  scrolling="no"
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA row */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            Service times: Sundays 8:00 AM – 11:00 AM • Subscribe to never miss a broadcast
          </p>
          <div className="flex items-center gap-3">
            <a
              href={`https://www.youtube.com/@${YT_CHANNEL_HANDLE}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF0000] hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe on YouTube
            </a>
            <a
              href={FB_LIVE_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Open Facebook Live
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
