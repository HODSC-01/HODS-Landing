import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const YT_CHANNEL_HANDLE = 'houseofdayspring8395'
const YT_LIVE_SRC = `https://www.youtube.com/embed/live_stream?channel=${YT_CHANNEL_HANDLE}&autoplay=0&rel=0&modestbranding=1`
const FB_LIVE_PAGE_URL = 'https://www.facebook.com/HODLiveFeed'
const FB_EMBED_SRC = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(FB_LIVE_PAGE_URL + '/videos')}&show_text=0&mute=0&autoplay=false&width=800`

type StreamPlatform = 'youtube' | 'facebook'

export default function LivePage() {
  const [platform, setPlatform] = useState<StreamPlatform>('youtube')

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col">
      {/* Original Site Navbar */}
      <Navbar borderBottom={true} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col">
        {/* Header Introduction */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Watch <span className="text-[#c9a030]">HODi</span> live stream
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
              Connect with us live for Sunday service, mid-week word, and special prayers from wherever you are.
            </p>
          </div>

          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold self-start md:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span>Live broadcast</span>
          </div>
        </div>

        {/* Clean Stream Player Frame */}
        <section className="mt-6 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Stream Frame Top Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            {/* Stream Platform Segmented Switch */}
            <div className="inline-flex p-1 bg-slate-200/70 rounded-xl">
              <button
                type="button"
                onClick={() => setPlatform('youtube')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  platform === 'youtube'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <svg className="w-4 h-4 fill-[#FF0000]" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube live</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatform('facebook')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  platform === 'facebook'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook live</span>
              </button>
            </div>

            {/* Platform Help Note */}
            <div className="text-xs text-slate-500">
              {platform === 'youtube'
                ? 'Main feed via official YouTube channel'
                : 'Alternative feed via Facebook Live'}
            </div>
          </div>

          {/* Facebook browser cookie notification banner */}
          {platform === 'facebook' && (
            <div className="bg-blue-50/90 border-b border-blue-100 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-blue-900">
              <span>If the embedded video is restricted by your browser settings, you can open Facebook directly:</span>
              <a
                href={FB_LIVE_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-700 hover:text-blue-800 underline inline-flex items-center gap-1"
              >
                Go to Facebook live &rarr;
              </a>
            </div>
          )}

          {/* Video Player Display */}
          <div className="w-full aspect-video bg-black">
            {platform === 'youtube' ? (
              <iframe
                key="yt-live"
                className="w-full h-full border-0"
                src={YT_LIVE_SRC}
                title="House of Dayspring International Church - YouTube live"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <iframe
                key="fb-live"
                className="w-full h-full border-0"
                src={FB_EMBED_SRC}
                title="House of Dayspring International Church - Facebook live"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                scrolling="no"
              />
            )}
          </div>

          {/* Stream Frame Bottom Bar */}
          <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-xs text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">Weekly service schedule:</span>{' '}
              Sundays 8:00 am – 11:00 am • House fellowship Mondays • Bible study Thursdays 5:00 pm
            </div>

            {/* Quick External Links */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href={`https://www.youtube.com/@${YT_CHANNEL_HANDLE}?sub_confirmation=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium text-xs shadow-xs transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe on YouTube
              </a>

              <a
                href={FB_LIVE_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1877F2] hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook live
              </a>

              <a
                href="https://t.me/hodmessages"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#229ED9] hover:bg-sky-600 text-white font-medium text-xs shadow-xs transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.56 2.91-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
                Telegram
              </a>

              <Link
                to="/give"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs shadow-xs transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Give online
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-8 text-center text-xs text-slate-400 space-y-1">
          <p>House of Dayspring International Church • The Pacesetters Assembly</p>
          <p className="text-slate-500">Built by <span className="font-semibold text-slate-700">Tech Expo</span></p>
        </div>
      </main>
    </div>
  )
}
