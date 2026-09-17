import { useState } from 'react'
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
    alt: 'House of DaySpring welcoming community',
  },
  {
    id: 1,
    src: church5,
    alt: 'House of DaySpring worship service',
  },
  {
    id: 2,
    src: church9,
    alt: 'House of DaySpring joyful fellowship',
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

      {/* ── Hero Section with Animated Scroll Gallery (No Borders, No Frame) ── */}
      <section id="home" className="relative bg-white pt-24 border-0 overflow-x-clip">

        {/* Hero Header Text */}
        <ContainerStagger className="relative z-20 max-w-4xl mx-auto px-6 pt-2 pb-1 mb-2 text-center border-0">
          <ContainerAnimated>
            <h1 className="text-[clamp(2rem,5.5vw,4.6rem)] font-bold leading-[1.08] tracking-tight text-[#1a1a2e]">
              A Place of Light,<br />
              Faith &amp; <span className="text-gradient-gold">Community</span>
            </h1>
          </ContainerAnimated>

          <ContainerAnimated className="my-3">
            <p className="text-[1.05rem] sm:text-[1.1rem] leading-relaxed text-[#5a6080] max-w-xl mx-auto">
              We are a welcoming family of faith walking together in love, hope, and grace.
            </p>
          </ContainerAnimated>

          <ContainerAnimated className="flex items-center justify-center flex-wrap gap-3 mt-1">
            <Button
              className="px-7 py-3 rounded-full text-sm font-semibold text-white bg-[#1a2090] hover:bg-[#3040cc] transition-all cursor-pointer border-0"
              onClick={() => {
                const el = document.getElementById('services')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Join Us Sunday
            </Button>
            <Button
              variant="link"
              className="text-sm font-semibold text-[#1a2090] cursor-pointer"
              onClick={() => {
                const el = document.getElementById('about')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              About Us →
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        {/* ── Mobile: 3-Card Fanned Showcase (Image 2 style) ── */}
        <div className="sm:hidden">
          <MobileHeroCards />
        </div>

        {/* ── Desktop: Full 3D Animated Scroll Gallery ── */}
        <div className="hidden sm:block">
          <ContainerScroll className="relative h-[165vh] w-full px-6 md:px-10 border-0 -mt-12 -mb-4 md:-mb-6">
            <ContainerSticky className="h-screen w-full border-0 items-start pt-4">
              <GalleryContainer className="w-full border-0 pt-0 pb-0 gap-2">
                <GalleryCol yRange={['-6%', '2%']} className="mt-0 border-0 gap-2">
                  {IMAGES_1.map((imageUrl, index) => (
                    <img
                      key={index}
                      className="aspect-video block h-auto max-h-full w-full rounded-xl object-cover shadow-md border-0"
                      src={imageUrl}
                      alt="House of DaySpring gallery item"
                    />
                  ))}
                </GalleryCol>
                <GalleryCol className="mt-[-10%] border-0 gap-2" yRange={['8%', '2%']}>
                  {IMAGES_2.map((imageUrl, index) => (
                    <img
                      key={index}
                      className="aspect-video block h-auto max-h-full w-full rounded-xl object-cover shadow-md border-0"
                      src={imageUrl}
                      alt="House of DaySpring gallery item"
                    />
                  ))}
                </GalleryCol>
                <GalleryCol yRange={['-6%', '2%']} className="mt-0 border-0 gap-2">
                  {IMAGES_3.map((imageUrl, index) => (
                    <img
                      key={index}
                      className="aspect-video block h-auto max-h-full w-full rounded-xl object-cover shadow-md border-0"
                      src={imageUrl}
                      alt="House of DaySpring gallery item"
                    />
                  ))}
                </GalleryCol>
              </GalleryContainer>
            </ContainerSticky>
          </ContainerScroll>
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
              <div className="flex items-center gap-3 mb-4">
                <img src={welcomeImg} alt="House of DaySpring" className="w-9 h-9 object-contain" />
                <span className="font-bold text-lg text-white tracking-wide">House of DaySpring</span>
              </div>
              <p className="text-sm text-[#94a3b8] leading-relaxed max-w-md mb-6">
                A place of light, faith, and community. Walking together in love, hope, and grace as a family in Christ.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#cbd5e1]">
                <span className="w-2 h-2 rounded-full bg-[#c9a030] animate-pulse" />
                Sundays 8:00–11:00 AM • Mon Fellowship • Thu Study 5:00 PM
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 flex flex-col items-start text-left">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a030] mb-4">Navigation</h4>
              <ul className="space-y-2.5 text-sm text-[#cbd5e1]">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Who We Are</a></li>
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
            <p>© {new Date().getFullYear()} House of DaySpring. All rights reserved.</p>
            <a href="#home" className="hover:text-[#c9a030] transition-colors font-medium">
              Back to Top ↑
            </a>
          </div>

          {/* Giant HODS spread out from left to right in clean bold Arial/Tahoma font with sharp border */}
          <div className="relative w-full overflow-hidden pt-6 sm:pt-8 pb-0 -mb-2 sm:-mb-3 md:-mb-4 select-none pointer-events-none px-2 sm:px-6 md:px-10">
            <div
              className="w-full flex items-center justify-between uppercase text-[clamp(4.2rem,18vw,16rem)] leading-none text-transparent"
              style={{
                fontFamily: 'Arial, Tahoma, "Helvetica Neue", sans-serif',
                fontWeight: 700,
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.48)',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.03) 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.5))',
              }}
            >
              <span>H</span>
              <span>O</span>
              <span>D</span>
              <span>S</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  )
}
