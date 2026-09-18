import { useState, useEffect, useRef, type RefObject, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import welcomeImg from '../assets/welcometohod.png'

interface NavbarProps {
  logoTargetRef?: RefObject<HTMLDivElement | null>
  borderBottom?: boolean
}

export default function Navbar({ logoTargetRef, borderBottom = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const fallbackLogoRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const effectiveLogoRef = logoTargetRef || fallbackLogoRef

  useEffect(() => {
    const handleScroll = () => {
      // Glassmorph the header as soon as user scrolls down
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    setDropdownOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      if (id === 'home') {
        navigate('/')
      } else {
        navigate('/#' + id)
      }
    }
  }

  const handleWatchLive = (e: React.MouseEvent) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    navigate('/live')
  }

  const showActiveStyle = isScrolled || mobileMenuOpen || borderBottom

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 will-change-[background,backdrop-filter]',
        showActiveStyle
          ? 'bg-white/90 shadow-xs border-b border-gray-100/90'
          : 'bg-transparent border-0',
      ].join(' ')}
      style={showActiveStyle ? {
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between">

        {/* Brand / Destination Logo Slot */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2.5 sm:gap-3.5"
        >
          <div
            ref={effectiveLogoRef}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center relative shrink-0"
          >
            <img
              src={welcomeImg}
              alt="House of Dayspring logo"
              className="w-10 sm:w-12 h-auto max-h-12 object-contain select-none"
            />
          </div>

          <span className="font-bold text-lg sm:text-xl tracking-tight text-[#1a2090] whitespace-nowrap">
            House of <span className="text-gradient-gold">Dayspring</span>
          </span>
        </a>

        {/* Desktop Nav Links: 5 main items + dropdown */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-[#5a6080]">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="hover:text-[#1a2090] transition-colors">Home</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-[#1a2090] transition-colors">About Us</a>
          {/* Watch Live — navigates to /live page */}
          <Link
            to="/live"
            className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 transition-colors font-semibold"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            Watch Live
          </Link>
          <a href="#sermons" onClick={(e) => handleNavClick(e, 'sermons')} className="hover:text-[#1a2090] transition-colors">Sermons</a>
          <Link
            to="/give"
            className="hover:text-[#1a2090] transition-colors font-medium"
          >
            Give
          </Link>

          {/* Dropdown for remaining items: Services, Directions, Contact */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-1 hover:text-[#1a2090] transition-colors focus:outline-none cursor-pointer"
            >
              <span>More</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-3 w-44 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="block px-4 py-2 text-sm text-[#5a6080] hover:text-[#1a2090] hover:bg-slate-50 transition-colors"
                >
                  Services
                </a>
                <a
                  href="#directions"
                  onClick={(e) => handleNavClick(e, 'directions')}
                  className="block px-4 py-2 text-sm text-[#5a6080] hover:text-[#1a2090] hover:bg-slate-50 transition-colors"
                >
                  Directions
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="block px-4 py-2 text-sm text-[#5a6080] hover:text-[#1a2090] hover:bg-slate-50 transition-colors"
                >
                  Contact
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Right side: Desktop CTA + Mobile Hamburger Button */}
        <div className="flex items-center gap-3">
          {/* Join CTA (Desktop & Tablet) */}
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, 'services')}
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full text-xs font-bold tracking-wide text-white transition-transform hover:-translate-y-0.5 shadow-xs"
            style={{
              background: 'linear-gradient(135deg, #8a6a10, #c9a030, #f0c060)',
            }}
          >
            Join Us
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl text-[#1a2090] hover:bg-black/5 transition-colors focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#1a1a2e]">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="py-2 hover:text-[#1a2090] transition-colors border-b border-gray-50"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="py-2 hover:text-[#1a2090] transition-colors border-b border-gray-50"
            >
              About Us
            </a>
            {/* Watch Live → /live page */}
            <a
              href="/live"
              onClick={handleWatchLive}
              className="py-2 border-b border-gray-50 flex items-center gap-2 font-semibold text-red-600"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              Watch Live
            </a>
            {/* Give Online → /give page */}
            <Link
              to="/give"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gray-50 flex items-center justify-between hover:text-[#1a2090] transition-colors"
            >
              <span>Give Online</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                Offering &amp; Tithe
              </span>
            </Link>
            <a
              href="#sermons"
              onClick={(e) => handleNavClick(e, 'sermons')}
              className="py-2 hover:text-[#1a2090] transition-colors border-b border-gray-50"
            >
              Sermons &amp; Media
            </a>
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="py-2 hover:text-[#1a2090] transition-colors border-b border-gray-50"
            >
              Weekly Services
            </a>
            <a
              href="#directions"
              onClick={(e) => handleNavClick(e, 'directions')}
              className="py-2 hover:text-[#1a2090] transition-colors border-b border-gray-50"
            >
              Directions
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="py-2 hover:text-[#1a2090] transition-colors"
            >
              Contact
            </a>

            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="mt-2 text-center py-3 rounded-full text-sm font-bold text-white shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #8a6a10, #c9a030, #f0c060)',
              }}
            >
              Join Us Sunday
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
