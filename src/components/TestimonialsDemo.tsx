import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Marquee } from '@/components/ui/3d-testimonails'

// Unique reviews / church community testimonials data
export const testimonials = [
  {
    name: 'Ava Green',
    username: '@ava',
    body: 'House of DaySpring welcomed my family with open arms. The worship and sermons are truly life changing!',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    country: '🇦🇺 Australia',
  },
  {
    name: 'Ana Miller',
    username: '@ana',
    body: 'The biblical wisdom taught here has transformed my spiritual walk and personal growth completely.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    country: '🇩🇪 Germany',
  },
  {
    name: 'Mateo Rossi',
    username: '@mat',
    body: 'The love, the atmosphere, and the worship are so pure and inspiring every single service!',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    country: '🇮🇹 Italy',
  },
  {
    name: 'Maya Patel',
    username: '@maya',
    body: 'Found genuine community and friendship here. House Fellowship on Mondays has been a total blessing!',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    country: '🇮🇳 India',
  },
  {
    name: 'Noah Smith',
    username: '@noah',
    body: 'A true beacon of light. The messages give practical principles for victorious Christian living.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    country: '🇺🇸 USA',
  },
  {
    name: 'Lucas Stone',
    username: '@luc',
    body: 'Thursday Bible Study goes so deep into the Word. I learn something uplifting every week.',
    img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    country: '🇫🇷 France',
  },
  {
    name: 'Haruto Sato',
    username: '@haru',
    body: 'Even streaming the sermons online touches my heart deeply. Such a powerful global movement!',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    country: '🇯🇵 Japan',
  },
  {
    name: 'Emma Lee',
    username: '@emma',
    body: 'The pastor speaks with grace, compassion, and divine insight. My faith has grown immensely.',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    country: '🇨🇦 Canada',
  },
  {
    name: 'Carlos Ray',
    username: '@carl',
    body: 'Wonderful community and authentic fellowship. Blessed to call House of DaySpring my home.',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    country: '🇪🇸 Spain',
  },
]

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-56 sm:w-60 bg-white/90 backdrop-blur-xs border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl p-0 overflow-hidden">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-[#1a2090]/10">
            <AvatarImage src={img} alt={name} className="object-cover" />
            <AvatarFallback className="bg-[#1a2090] text-white font-semibold text-xs">
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <figcaption className="text-sm font-bold text-[#1a1a2e] flex items-center gap-1.5 leading-tight">
              {name} <span className="text-xs">{country}</span>
            </figcaption>
            <p className="text-xs font-medium text-[#5a6080]">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-xs sm:text-sm text-[#4b5563] leading-relaxed text-left">
          "{body}"
        </blockquote>
      </CardContent>
    </Card>
  )
}

export default function DemoOne() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white via-[#fcfbf9] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c9a030]">
          Community Stories
        </span>
        <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-tight text-[#1a2090] mt-2 mb-4">
          Voices of Light &amp; Faith
        </h2>
        <p className="text-sm sm:text-base text-[#5a6080] max-w-xl mx-auto">
          Hear from our global family members walking together in faith, hope, and community.
        </p>
      </div>

      <div className="relative flex h-[480px] sm:h-[540px] w-full max-w-5xl mx-auto flex-row items-center justify-center overflow-hidden [perspective:1000px]">
        <div
          className="flex flex-row items-center gap-4 sm:gap-6 will-change-transform"
          style={{
            transform:
              'translateX(-50px) translateY(0px) translateZ(-50px) rotateX(20deg) rotateY(-12deg) rotateZ(16deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Vertical Marquee 1 (downwards) */}
          <Marquee vertical pauseOnHover repeat={4} className="[--duration:35s]">
            {testimonials.map((review) => (
              <TestimonialCard key={`col1-${review.username}`} {...review} />
            ))}
          </Marquee>

          {/* Vertical Marquee 2 (upwards - reverse) */}
          <Marquee vertical pauseOnHover reverse repeat={4} className="[--duration:38s]">
            {testimonials.map((review) => (
              <TestimonialCard key={`col2-${review.username}`} {...review} />
            ))}
          </Marquee>

          {/* Vertical Marquee 3 (downwards) */}
          <Marquee vertical pauseOnHover repeat={4} className="[--duration:36s]">
            {testimonials.map((review) => (
              <TestimonialCard key={`col3-${review.username}`} {...review} />
            ))}
          </Marquee>

          {/* Vertical Marquee 4 (upwards - reverse) */}
          <Marquee vertical pauseOnHover reverse repeat={4} className="[--duration:40s]">
            {testimonials.map((review) => (
              <TestimonialCard key={`col4-${review.username}`} {...review} />
            ))}
          </Marquee>
        </div>

        {/* Gradient overlays for buttery smooth vertical edge fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />
      </div>
    </section>
  )
}
