import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import welcomeImg from '../assets/welcometohod.png'
import church1 from '../assets/heroimg/church-1.jpg'
import church2 from '../assets/heroimg/church-2.jpg'
import church3 from '../assets/heroimg/church-3.jpg'
import church4 from '../assets/heroimg/church-4.jpg'
import church5 from '../assets/heroimg/church-5.jpg'
import church6 from '../assets/heroimg/church-6.jpg'
import church7 from '../assets/heroimg/church-7.jpg'
import church8 from '../assets/heroimg/church-8.jpg'
import church9 from '../assets/heroimg/church-9.jpg'
import church10 from '../assets/heroimg/church-10.jpg'
import church11 from '../assets/heroimg/church-11.jpg'
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from './blocks/animated-gallery'
import { Button } from './ui/button'
import WhoWeAre from './WhoWeAre'
import SermonsSection from './SermonsSection'
import SocialMediaFollow from './SocialMediaFollow'
import TestimonialsDemo from './TestimonialsDemo'
import DirectionsSection from './DirectionsSection'

const IMAGES_1 = [church1, church2, church3, church4]
const IMAGES_2 = [church5, church6, church7, church8]
const IMAGES_3 = [church9, church10, church11, church1]

const MOBILE_HERO_CARDS = [
  {
    id: 0,
    src: church1,
    alt: 'House of Dayspring welcoming community',
  },
  {
    id: 1,
    src: church5,
    alt: 'House of Dayspring worship service',
  },
  {
    id: 2,
    src: church9,
    alt: 'House of Dayspring joyful fellowship',
  },
]

function MobileHeroCards() {
  const [activeIdx, setActiveIdx] = useState(1) // Center card initially active

  const getSlot = (idx: number) => {
    const diff = (idx - activeIdx + 3) % 3
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    return 'left'
  }

  return (
    <div className="relative w-full max-w-sm mx-auto pt-5 pb-10 px-4 flex items-center justify-center overflow-visible select-none">
      <div className="relative w-full h-[255px] flex items-center justify-center">
        {MOBILE_HERO_CARDS.map((card, idx) => {
          const slot = getSlot(idx)
          const isCenter = slot === 'center'
          const isLeft = slot === 'left'

          return (
            <motion.div
              key={card.id}
              onClick={() => setActiveIdx(idx)}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -30) {
                  setActiveIdx((prev) => (prev + 1) % 3)
                } else if (info.offset.x > 30) {
                  setActiveIdx((prev) => (prev + 2) % 3)
                }
              }}
              initial={false}
              animate={{
                x: isCenter ? '0%' : isLeft ? '-46%' : '46%',
                y: isCenter ? 0 : 12,
                rotate: isCenter ? 0 : isLeft ? -7.5 : 7.5,
                scale: isCenter ? 1.05 : 0.94,
                zIndex: isCenter ? 20 : 10,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 24,
              }}
              whileTap={{ scale: isCenter ? 1.02 : 0.96 }}
              className={`absolute top-2 w-[42vw] max-w-[165px] min-w-[130px] aspect-[3/4.2] rounded-2xl overflow-hidden cursor-pointer bg-white transition-shadow duration-300 ${
                isCenter
                  ? 'shadow-[0_22px_45px_-12px_rgba(0,0,0,0.26)] ring-1 ring-black/5'
                  : 'shadow-[0_14px_30px_-10px_rgba(0,0,0,0.18)] ring-1 ring-black/5'
              }`}
            >
              <img
                src={card.src}
                alt={card.alt}
                className="w-full h-full object-cover pointer-events-none"
                loading="eager"
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white text-[#1a1a2e] font-sans antialiased selection:bg-[#c9a030]/20 selection:text-[#1a2090] border-0 overflow-x-clip">

      {/* ── Hero Section with 3D Perspective Showcase (No Borders, No Huge Gaps) ── */}
      <section id="home" className="relative bg-white pt-28 sm:pt-32 border-0 overflow-x-clip">

        {/* Hero Header Text */}
        <ContainerStagger className="relative z-20 max-w-4xl mx-auto px-6 pt-2 pb-1 text-center border-0">
          <ContainerAnimated>
            <h1 className="text-[clamp(2rem,5.5vw,4.6rem)] font-bold leading-[1.08] tracking-tight text-[#1a1a2e]">
              A Place of Light,<br />
              Faith &amp; <span className="text-gradient-gold">Community</span>
            </h1>
          </ContainerAnimated>

          <ContainerAnimated className="my-3 sm:my-4">
            <p className="text-[1.05rem] sm:text-[1.15rem] leading-relaxed text-[#5a6080] max-w-xl mx-auto">
              We are a welcoming family of faith walking together in love, hope, and grace.
            </p>
          </ContainerAnimated>

          <ContainerAnimated className="flex items-center justify-center flex-wrap gap-3 mt-2 sm:mt-3">
            <Button
              className="px-7 py-3 rounded-full text-sm font-semibold text-white bg-[#1a2090] hover:bg-[#3040cc] transition-all cursor-pointer border-0 shadow-md hover:shadow-lg"
              onClick={() => {
                const el = document.getElementById('services')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Join Us Sunday
            </Button>
            <Button
              variant="link"
              className="text-sm font-semibold text-[#1a2090] cursor-pointer hover:underline"
              onClick={() => {
                const el = document.getElementById('about')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              About Us →
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        {/* ── Mobile: 3-Card Fanned Showcase (< 640px) ── */}
        <div className="sm:hidden mt-4">
          <MobileHeroCards />
        </div>

        {/* ── Desktop & Tablet: Seamless 3D Perspective Gallery (>= 640px) ── */}
        <div className="hidden sm:block mt-6 sm:mt-8 md:mt-10 mb-4 sm:mb-8">
          <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_85%,transparent_100%)]">
            <ContainerScroll className="w-full h-full border-0">
              <ContainerSticky className="w-full h-full border-0 items-start">
                <GalleryContainer className="w-full border-0 pt-0 pb-0 gap-3 md:gap-4">
                  <GalleryCol yRange={['-5%', '5%']} className="mt-0 border-0 gap-3 md:gap-4">
                    {IMAGES_1.map((imageUrl, index) => (
                      <img
                        key={index}
                        className="aspect-video block h-auto w-full rounded-2xl object-cover shadow-[0_12px_28px_-8px_rgba(0,0,0,0.22)] border border-black/5"
                        src={imageUrl}
                        alt="House of Dayspring gallery item"
                      />
                    ))}
                  </GalleryCol>
                  <GalleryCol className="mt-[-6%] border-0 gap-3 md:gap-4" yRange={['5%', '-5%']}>
                    {IMAGES_2.map((imageUrl, index) => (
                      <img
                        key={index}
                        className="aspect-video block h-auto w-full rounded-2xl object-cover shadow-[0_12px_28px_-8px_rgba(0,0,0,0.22)] border border-black/5"
                        src={imageUrl}
                        alt="House of Dayspring gallery item"
                      />
                    ))}
                  </GalleryCol>
                  <GalleryCol yRange={['-5%', '5%']} className="mt-0 border-0 gap-3 md:gap-4">
                    {IMAGES_3.map((imageUrl, index) => (
                      <img
                        key={index}
                        className="aspect-video block h-auto w-full rounded-2xl object-cover shadow-[0_12px_28px_-8px_rgba(0,0,0,0.22)] border border-black/5"
                        src={imageUrl}
                        alt="House of Dayspring gallery item"
                      />
                    ))}
                  </GalleryCol>
                </GalleryContainer>
              </ContainerSticky>
            </ContainerScroll>
          </div>
        </div>
      </section>

      {/* ── Who We Are Section ── */}
      <WhoWeAre />

      {/* ── Catch Up On Our Powerful Sermons (YouTube Section) ── */}
      <SermonsSection />

      {/* ── Follow Us on Social Media (Outside SermonsSection) ── */}
      <SocialMediaFollow />

      {/* ── 3D Testimonials Marquee Section ── */}
      <TestimonialsDemo />

      {/* ── Services Section (No Border) ── */}
      <section id="services" className="py-24 px-6 md:px-12 bg-white border-0">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a030] mb-3">
            Gather With Us
          </p>
          <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-tight text-[#1a2090] mb-12">
            Weekly Services &amp; Times
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-7 rounded-2xl bg-[#fcfbf9] border border-black/5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c9a030]">Every Sunday</span>
                <h3 className="text-xl font-bold text-[#1a2090] mt-1 mb-2">Sunday Worship</h3>
                <p className="text-sm font-semibold text-[#1a1a2e] mb-3">8:00 AM – 11:00 AM</p>
                <p className="text-xs text-[#5a6080] leading-relaxed">
                  Main Auditorium. Uplifting praise &amp; worship, Bible teaching, and children's church ministry.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#fcfbf9] border border-black/5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e538d]">Every Monday</span>
                <h3 className="text-xl font-bold text-[#1a2090] mt-1 mb-2">House Fellowship</h3>
                <p className="text-sm font-semibold text-[#1a1a2e] mb-3">Mondays</p>
                <p className="text-xs text-[#5a6080] leading-relaxed">
                  Close-knit community fellowship, prayers, and mutual spiritual encouragement in our home centers.
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#fcfbf9] border border-black/5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#c9a030]">Every Thursday</span>
                <h3 className="text-xl font-bold text-[#1a2090] mt-1 mb-2">Bible Study</h3>
                <p className="text-sm font-semibold text-[#1a1a2e] mb-3">Thursdays at 5:00 PM</p>
                <p className="text-xs text-[#5a6080] leading-relaxed">
                  An intimate time of studying the Word of God, prayer, and personal spiritual empowerment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Directions Section ── */}
      <DirectionsSection />

      {/* ── Footer Big Card ── */}
      <footer id="contact" className="bg-white px-2 sm:px-4 md:px-6 pb-2 sm:pb-3 pt-2 border-0">
        <div
          className="relative w-full max-w-[98.5%] 2xl:max-w-[1720px] mx-auto rounded-[2rem] sm:rounded-[2.5rem] bg-[#0b1024] text-white px-5 sm:px-8 md:px-12 pt-8 sm:pt-10 pb-0 shadow-2xl border border-[#1d2752] overflow-hidden"
          style={{ fontFamily: 'Arial, Tahoma, "Helvetica Neue", sans-serif' }}
        >
          
          {/* Subtle ambient card glow */}
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-[#1a2090]/30 rounded-full blur-[100px] pointer-events-none"
          />

          {/* Card Top Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-8 border-b border-white/10">
            {/* Brand column */}
            <div className="md:col-span-6 flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-3">
                <img src={welcomeImg} alt="House of Dayspring International Church" className="w-9 h-9 object-contain" />
                <span className="font-bold text-base sm:text-lg text-white tracking-wide">House of Dayspring International Church</span>
              </div>
              <p className="text-sm text-[#94a3b8] leading-relaxed max-w-md mb-5">
                A place of light, faith, and community. Walking together in love, hope, and grace as a family in Christ. The Pacesetters Assembly.
              </p>
              
              {/* Meeting Times Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#cbd5e1] mb-5">
                <span className="w-2 h-2 rounded-full bg-[#c9a030] animate-pulse" />
                Sundays 8:00–11:00 AM • Mon Fellowship • Thu Study 5:00 PM
              </div>

              {/* Social Media Links Bar */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/hodayspringpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/HODLiveFeed?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/houseofdayspring/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://t.me/hodmessages"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#229ED9] text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.56 2.91-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>
                <a
                  href="https://youtu.be/ecvL6A39Nuc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF0000] text-white flex items-center justify-center transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 flex flex-col items-start text-left">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a030] mb-4">Navigation</h4>
              <ul className="space-y-2.5 text-sm text-[#cbd5e1]">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Who We Are</a></li>
                <li>
                </li>
                <li>
                  <Link to="/give" className="hover:text-white transition-colors">
                    Give Online
                  </Link>
                </li>
                <li><a href="#sermons" className="hover:text-white transition-colors">Sermons</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Weekly Services</a></li>
                <li><a href="#directions" className="hover:text-white transition-colors">Directions</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Gather With Us */}
            <div className="md:col-span-3 flex flex-col items-start text-left">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a030] mb-4">Worship With Us</h4>
              <div className="text-sm text-[#cbd5e1] space-y-2.5">
                <div>
                  <p className="font-semibold text-white">Sunday Worship</p>
                  <p className="text-xs text-[#94a3b8]">8:00 AM – 11:00 AM</p>
                </div>
                <div>
                  <p className="font-semibold text-white">House Fellowship</p>
                  <p className="text-xs text-[#94a3b8]">Mondays</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Bible Study</p>
                  <p className="text-xs text-[#94a3b8]">Thursdays at 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-bar with Copyright & Back to Top */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 text-xs text-[#94a3b8]">
            <p>© {new Date().getFullYear()} House of Dayspring International Church. All rights reserved.</p>
            <a href="#home" className="hover:text-[#c9a030] transition-colors font-medium">
              Back to Top ↑
            </a>
          </div>

          {/* Giant HODi in bold, tight, borderless typography */}
          <div className="relative w-full overflow-hidden pt-4 sm:pt-6 pb-0 -mb-2 sm:-mb-3 md:-mb-4 select-none pointer-events-none flex items-center justify-center">
            <div
              className="text-center font-black tracking-[-0.07em] text-[clamp(4.5rem,22vw,18rem)] leading-[0.85] text-transparent select-none"
              style={{
                fontFamily: 'Arial, Tahoma, "Helvetica Neue", sans-serif',
                fontWeight: 900,
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.08) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              HOD<span className="normal-case">i</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ── Below Footer: Built by Tech Expo ── */}
      <div className="w-full bg-white py-4 text-center text-xs text-slate-500 border-t border-slate-100">
        <p>
          Built by <span className="font-semibold text-slate-800">Tech Expo</span>
        </p>
      </div>

    </div>
  )
}
