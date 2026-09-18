import { Sparkles, Zap, Sun } from 'lucide-react'
import pastorPlaceholder from '../assets/heroimg/church-2.jpg'

interface WhoWeAreProps {
  pastorImage?: string
}

export default function WhoWeAre({ pastorImage = pastorPlaceholder }: WhoWeAreProps) {
  return (
    <section id="about" className="relative bg-white pt-4 sm:pt-5 pb-20 lg:pb-28 px-6 md:px-12 overflow-hidden border-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Pastor Circular Portrait with Decorative Curved Arcs */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div className="relative w-[320px] sm:w-[380px] lg:w-[460px] max-w-[90vw] aspect-square flex items-center justify-center">
              
              {/* Outer Decorative Curved Lines/Swooshes */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none -rotate-12 scale-110"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outermost sweeping arc */}
                <path
                  d="M 50,250 A 200,200 0 1,1 250,450"
                  stroke="#E8ECEF"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="opacity-70"
                />
                {/* Secondary accent arc with subtle brand gradient */}
                <path
                  d="M 80,180 A 180,180 0 0,1 400,160"
                  stroke="#CBD5E1"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray="16 8"
                  className="opacity-50"
                />
                {/* Soft outer glow ring */}
                <circle
                  cx="250"
                  cy="250"
                  r="215"
                  stroke="#F1F5F9"
                  strokeWidth="24"
                  className="opacity-60"
                />
              </svg>

              {/* Main Circular Image Frame */}
              <div className="relative z-10 w-[285px] sm:w-[340px] lg:w-[410px] aspect-square rounded-full p-2.5 bg-white shadow-2xl ring-1 ring-black/5">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900">
                  <img
                    src={pastorImage}
                    alt="Pastor - House of Dayspring International Church"
                    className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] transition-transform duration-500 hover:scale-105"
                  />
                  {/* Subtle inner vignette */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Section Tag */}
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a030] mb-2 block">
              Who We Are
            </span>

            {/* Main Heading */}
            <h2 className="text-[clamp(2.1rem,3.8vw,3.2rem)] font-extrabold tracking-tight text-[#111827] leading-[1.16] mb-3">
              House of Dayspring International Church,{' '}
              <span className="text-[#005a9c] font-black">HODi</span>
            </h2>

            {/* Pacesetters Assembly Tagline */}
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#1a2090] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#c9a030]" />
              The Pacesetters Assembly
            </div>

            {/* Body Copy */}
            <p className="text-[1.05rem] sm:text-[1.12rem] leading-[1.8] text-[#374151] max-w-xl mb-3">
              We are also known as the <strong className="text-[#1a2090] font-bold">Pacesetters Assembly</strong>.
            </p>

            <p className="text-[1.02rem] sm:text-[1.1rem] leading-[1.8] text-[#374151] max-w-xl mb-3">
              We are a people of <strong className="text-[#111827]">Character</strong>, <strong className="text-[#111827]">Power</strong> and <strong className="text-[#111827]">Purpose</strong>. A people destined to shine in the midst of darkness.
            </p>

            <p className="text-[0.98rem] sm:text-[1.05rem] leading-[1.8] text-[#4b5563] max-w-xl mb-6">
              We achieve this through the preaching and teaching of our Lord Jesus Christ and through prayers.
            </p>

            {/* 3 Core Pillars Visual Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-xl mb-8">
              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 flex flex-col items-start text-left shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#1a2090]/10 text-[#1a2090] flex items-center justify-center font-bold mb-2">
                  <Sparkles className="w-4 h-4 text-[#1a2090]" />
                </div>
                <span className="font-bold text-sm text-[#111827]">Character</span>
                <span className="text-xs text-[#64748b] mt-0.5">Integrity &amp; Christlikeness</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 flex flex-col items-start text-left shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#c9a030]/15 text-[#8a6a10] flex items-center justify-center font-bold mb-2">
                  <Zap className="w-4 h-4 text-[#8a6a10]" />
                </div>
                <span className="font-bold text-sm text-[#111827]">Power</span>
                <span className="text-xs text-[#64748b] mt-0.5">Holy Spirit &amp; prayers</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-slate-200/80 flex flex-col items-start text-left shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-[#005a9c]/10 text-[#005a9c] flex items-center justify-center font-bold mb-2">
                  <Sun className="w-4 h-4 text-[#005a9c]" />
                </div>
                <span className="font-bold text-sm text-[#111827]">Purpose</span>
                <span className="text-xs text-[#64748b] mt-0.5">Shining in darkness</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#services"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-900 bg-white text-gray-900 text-sm font-semibold hover:bg-gray-900 hover:text-white transition-all duration-200 cursor-pointer shadow-xs"
              >
                <span>Learn More</span>
                <svg
                  className="w-2.5 h-2.5 fill-current transition-transform duration-200 group-hover:translate-x-1"
                  viewBox="0 0 6 10"
                >
                  <path
                    d="M0.5 0.5L5 5L0.5 9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
