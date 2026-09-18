import { useState, useEffect, type RefObject, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import welcomeImg from '../assets/welcometohod.png'

interface NavbarProps {
  logoTargetRef: RefObject<HTMLDivElement | null>
}

export default function Navbar({ logoTargetRef }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      // Glassmorph the header as soon as user scrolls down
      setIsScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleWatchLive = (e: React.MouseEvent) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    navigate('/live')
  }

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 will-change-[background,backdrop-filter]',
        isScrolled || mobileMenuOpen
          ? 'bg-white/85 shadow-sm border-b border-white/60'
          : 'bg-transparent border-0',
      ].join(' ')}
      style={isScrolled || mobileMenuOpen ? {
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
            ref={logoTargetRef}
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

        {/* Desktop Nav Links */}
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
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-[#1a2090] transition-colors">Services</a>
          <a href="#directions" onClick={(e) => handleNavClick(e, 'directions')} className="hover:text-[#1a2090] transition-colors">Directions</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-[#1a2090] transition-colors">Contact</a>
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
