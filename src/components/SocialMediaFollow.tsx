import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const SOCIAL_ICONS = [
  {
    name: 'Facebook Page',
    badge: null,
    url: 'https://www.facebook.com/hodayspringpage',
    bgColor: 'bg-[#1877F2]',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook Live',
    badge: 'LIVE',
    url: 'https://www.facebook.com/HODLiveFeed?mibextid=ZbWKwL',
    bgColor: 'bg-gradient-to-tr from-[#1877F2] to-[#dc2626]',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    badge: null,
    url: 'https://www.instagram.com/houseofdayspring/',
    bgColor: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: 'Telegram Channel',
    badge: null,
    url: 'https://t.me/hodmessages',
    bgColor: 'bg-[#229ED9]',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.56 2.91-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    badge: null,
    url: 'https://youtu.be/ecvL6A39Nuc',
    bgColor: 'bg-[#FF0000]',
    icon: (
      <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
]

export default function SocialMediaFollow() {
  const [isOpen, setIsOpen] = useState(false)

  // Close on Escape key and prevent background scroll while open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* ── Outside Button Section right below Sermons ── */}
      <section className="w-full bg-[#0a416e] py-6 px-4 flex justify-center items-center border-t border-white/10 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#b9d529] hover:bg-[#cbf028] text-[#0a416e] font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-0"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0a416e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0a416e]"></span>
          </span>
          Follow Us on Social Media
        </button>
      </section>

      {/* ── Blurred Background with Bubble Pop-out Social Icons (No modal, no float, only icons) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl cursor-pointer select-none"
            onClick={() => setIsOpen(false)}
          >
            {/* Social Icons Container (Bubbles with clear labels) */}
            <div
              className="flex flex-col items-center gap-6 max-w-xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center select-none mb-1">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#b9d529]">Connect With Us</span>
                <h3 className="text-white text-xl sm:text-2xl font-bold mt-1">Join Our Online Community</h3>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
                {SOCIAL_ICONS.map((social, idx) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.2, 0.95, 1],
                      opacity: 1,
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 22,
                      delay: idx * 0.05,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className={`relative size-16 sm:size-20 rounded-full ${social.bgColor} text-white flex items-center justify-center shadow-2xl transition-all duration-200 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]`}>
                      {social.badge && (
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-red-600 text-[9px] font-black tracking-wider uppercase text-white shadow-md ring-2 ring-[#0a416e] animate-pulse">
                          {social.badge}
                        </span>
                      )}
                      {social.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white transition-colors text-center">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>

              <p className="text-white/60 text-xs mt-2 select-none">
                Tap outside to close
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
