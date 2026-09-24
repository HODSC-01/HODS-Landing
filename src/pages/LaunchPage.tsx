import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import welcomeImg from '../assets/welcometohod.png'

const TARGET_LAUNCH = new Date('2026-09-27T11:30:00')

export function hasLaunchPassed() {
  return Date.now() >= TARGET_LAUNCH.getTime()
}

interface LaunchPageProps {
  onShowSplash: () => void
}

function formatNumber(value: number) {
  return String(value).padStart(2, '0')
}

export default function LaunchPage({ onShowSplash }: LaunchPageProps) {
  const navigate = useNavigate()
  const [now, setNow] = useState(() => new Date())
  const [isRevealing, setIsRevealing] = useState(false)
  const [showCountdown, setShowCountdown] = useState(true)
  const [fastTrackStartedAt, setFastTrackStartedAt] = useState<number | null>(null)
  const [fastTrackRemainingMs, setFastTrackRemainingMs] = useState<number | null>(null)

  const triggerReveal = useCallback(() => {
    if (isRevealing) return

    onShowSplash()
    setShowCountdown(false)
    setIsRevealing(true)

    window.setTimeout(() => {
      navigate('/', { replace: true })
    }, 2200)
  }, [isRevealing, navigate, onShowSplash])

  const triggerFastTrack = useCallback(() => {
    if (isRevealing) return

    setFastTrackStartedAt(Date.now())
    setFastTrackRemainingMs(Math.max(0, TARGET_LAUNCH.getTime() - Date.now()))
  }, [isRevealing])

  const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      triggerFastTrack()
    }
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date())
    }, 10)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (fastTrackStartedAt === null || fastTrackRemainingMs === null) return

    const tick = () => {
      const elapsed = Date.now() - fastTrackStartedAt
      const progress = Math.min(elapsed / 1400, 1)
      const eased = 1 - (1 - progress) ** 4
      const remaining = Math.max(0, fastTrackRemainingMs * (1 - eased))
      setFastTrackRemainingMs(remaining)

      if (remaining <= 0) {
        triggerReveal()
      }
    }

    const timer = window.setInterval(tick, 16)
    return () => window.clearInterval(timer)
  }, [fastTrackStartedAt, fastTrackRemainingMs, triggerReveal])

  const countdown = useMemo(() => {
    const baseDifference = Math.max(0, TARGET_LAUNCH.getTime() - now.getTime())
    const hours = Math.floor(baseDifference / (1000 * 60 * 60))
    const minutes = Math.floor((baseDifference / (1000 * 60)) % 60)
    const seconds = Math.floor((baseDifference / 1000) % 60)
    const hundredths = Math.floor((baseDifference % 1000) / 10)

    return {
      hours,
      minutes,
      seconds,
      hundredths,
      total: baseDifference,
    }
  }, [now])

  useEffect(() => {
    if (countdown.total <= 0 && !isRevealing) {
      triggerReveal()
    }
  }, [countdown.total, isRevealing, triggerReveal])

  const timeUnits = [
    { label: 'Hours', value: formatNumber(countdown.hours) },
    { label: 'Minutes', value: formatNumber(countdown.minutes) },
    { label: 'Seconds', value: formatNumber(countdown.seconds) },
    { label: 'Hundredths', value: formatNumber(countdown.hundredths) },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f6f1] text-[#111827]">
      <div className="absolute left-[-80px] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#c9a030]/30 blur-[120px]" />
      <div className="absolute right-[-80px] top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#1a2090]/20 blur-[120px]" />

      <div
        className={`pointer-events-none fixed inset-0 z-40 flex opacity-0 transition-opacity duration-700 ${isRevealing ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      >
        <div
          className={`h-full w-1/2 border-r border-white/20 bg-[linear-gradient(135deg,#0c1d5a_0%,#1a2090_30%,#d6b15d_100%)] shadow-[inset_0_0_50px_rgba(255,255,255,0.1)] transition-transform duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isRevealing ? '-translate-x-[105%]' : 'translate-x-0'}`}
        />
        <div
          className={`h-full w-1/2 border-l border-white/20 bg-[linear-gradient(225deg,#d6b15d_0%,#f4e3af_25%,#0c1d5a_100%)] shadow-[inset_0_0_50px_rgba(255,255,255,0.1)] transition-transform duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isRevealing ? 'translate-x-[105%]' : 'translate-x-0'}`}
        />
      </div>

      <div className={`relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8 transition-opacity duration-700 ${isRevealing ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full max-w-5xl text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <img
              src={welcomeImg}
              alt="House of Dayspring logo"
              className="h-12 w-12 object-contain sm:h-16 sm:w-16"
            />
            <div className="text-left">
              <p className="text-[10px] font-medium tracking-[0.35em] text-[#475569] sm:text-[11px]">
                House of Dayspring
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-[#1a2090] sm:text-xl">
                website launch
              </h2>
            </div>
          </div>

          <h1 className="mt-8 text-3xl font-semibold tracking-[-0.06em] text-[#0f172a] sm:text-4xl lg:text-6xl">
            We are launching on 27 September at 11:30 am
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#475569] sm:text-base">
            A new chapter is almost here. Until then, here is the countdown to our official launch.
          </p>

          {showCountdown && (
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
              {timeUnits.map((unit) => (
                <div
                  key={unit.label}
                  className="flex min-w-[120px] flex-col items-center justify-center rounded-[1.5rem] border border-white/40 bg-white/50 px-4 py-5 shadow-[0_18px_50px_rgba(26,32,144,0.06)] backdrop-blur-sm sm:min-w-[150px]"
                >
                  <div
                    className="font-black leading-none tracking-[-0.08em] text-[#1a2090]"
                    style={{
                      fontSize: 'clamp(2.2rem, 5vw, 5rem)',
                      textShadow: '0 0 24px rgba(26, 32, 144, 0.18)',
                    }}
                  >
                    {unit.value}
                  </div>
                  <div className="mt-2 text-xs font-medium tracking-[0.14em] text-[#475569] sm:text-sm">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <div className="rounded-full border border-[#dfe8ff] bg-[#eef4ff] px-4 py-2 text-sm font-medium text-[#1a2090] shadow-sm">
              Target time: 27 September 2026 • 11:30 am
            </div>
            <span
              role="button"
              tabIndex={0}
              onClick={triggerFastTrack}
              onKeyDown={handleEnterKeyDown}
              className="cursor-pointer text-sm font-semibold text-[#7a5a00] hover:underline focus:outline-none focus-visible:underline"
            >
              Enter site now
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
