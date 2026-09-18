import { useEffect, useState, useRef } from 'react'
import welcomeImg from '../assets/welcometohod.png'
import splashAudioSrc from '../assets/splashupgrade.mp3'

const FULL_TEXT = 'Welcome to House of Dayspring International Church'

interface SplashProps {
  onDone: () => void
  logoTargetRef: React.RefObject<HTMLDivElement | null>
}

interface Rect {
  top: number
  left: number
  width: number
  height: number
}

export default function Splash({ onDone, logoTargetRef }: SplashProps) {
  const [risen, setRisen]       = useState(false)
  const [isFlying, setIsFlying] = useState(false)
  const [fadingBg, setFadingBg] = useState(false)
  const [typed, setTyped]       = useState('')
  const [flyStyle, setFlyStyle] = useState<React.CSSProperties | null>(null)

  const audioRef      = useRef<HTMLAudioElement | null>(null)
  const emblemRef     = useRef<HTMLImageElement | null>(null)
  const isDeadRef     = useRef(false)
  const fadeTimerRef  = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Smooth Audio Fade-Out Controller ──
  const startAudioFadeOut = (durationMs = 1500) => {
    isDeadRef.current = true
    const audio = audioRef.current
    if (!audio) return

    const startVolume = audio.volume || 1.0
    const stepTime = 25 // update every 25ms for silky smooth fade
    const steps = Math.max(1, durationMs / stepTime)
    const volumeStep = startVolume / steps

    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current)

    fadeTimerRef.current = setInterval(() => {
      if (audio.volume > volumeStep) {
        audio.volume = Math.max(0, audio.volume - volumeStep)
      } else {
        audio.volume = 0
        audio.pause()
        audio.currentTime = 0
        audio.src = ''
        if (fadeTimerRef.current) clearInterval(fadeTimerRef.current)
        audioRef.current = null
      }
    }, stepTime)
  }

  // ── 1. Audio Lifecycle (ONLY plays in splash, NEVER in home) ──
  useEffect(() => {
    const audio = new Audio(splashAudioSrc)
    audio.preload = 'auto'
    audio.volume = 1.0
    audioRef.current = audio

    const cleanupListeners = () => {
      window.removeEventListener('pointerdown', startOnGesture)
      window.removeEventListener('keydown', startOnGesture)
      window.removeEventListener('touchstart', startOnGesture)
    }

    const startOnGesture = () => {
      if (!isDeadRef.current && audioRef.current) {
        audioRef.current.play().catch(() => {})
      }
      cleanupListeners()
    }

    // Attempt auto-play immediately
    audio.play().catch(() => {
      // Fallback: unlock on first user gesture if browser blocked unmuted autoplay
      window.addEventListener('pointerdown', startOnGesture, { once: true })
      window.addEventListener('keydown', startOnGesture, { once: true })
      window.addEventListener('touchstart', startOnGesture, { once: true })
    })

    return () => {
      isDeadRef.current = true
      cleanupListeners()
      if (fadeTimerRef.current) clearInterval(fadeTimerRef.current)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.volume = 0
        audioRef.current.currentTime = 0
        audioRef.current.src = ''
        audioRef.current = null
      }
    }
  }, [])

  // ── 2. Sequence Timing & Emblem Flight to Header ──
  useEffect(() => {
    // A. Emblem rises cleanly upward with sunrise glow
    const tRise = setTimeout(() => setRisen(true), 300)

    // B. Typewriter begins once emblem has risen
    let charInterval: ReturnType<typeof setInterval>
    const tType = setTimeout(() => {
      let i = 0
      charInterval = setInterval(() => {
        i++
        setTyped(FULL_TEXT.slice(0, i))

        // C. Once text is written complete, start audio fade-out and fly to header
        if (i >= FULL_TEXT.length) {
          clearInterval(charInterval)

          // 1. Immediately begin gradual, smooth audio fade-out over 1.5s
          startAudioFadeOut(1500)

          // 2. Short pause (400ms) to read complete text, then launch flight to header
          setTimeout(() => {
            if (emblemRef.current) {
              const startRect = emblemRef.current.getBoundingClientRect()
              const targetRect = logoTargetRef.current?.getBoundingClientRect()

              const dest: Rect = targetRect
                ? {
                    top: targetRect.top,
                    left: targetRect.left,
                    width: targetRect.width,
                    height: targetRect.height,
                  }
                : {
                    top: 14,
                    left: 24,
                    width: 48,
                    height: 48,
                  }

              // Initial fixed coordinates at center position
              setFlyStyle({
                position: 'fixed',
                top: `${startRect.top}px`,
                left: `${startRect.left}px`,
                width: `${startRect.width}px`,
                height: `${startRect.height}px`,
                zIndex: 60,
                margin: 0,
                pointerEvents: 'none',
              })

              setIsFlying(true)
              setFadingBg(true)

              // Animate directly into header logo slot
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  setFlyStyle({
                    position: 'fixed',
                    top: `${dest.top}px`,
                    left: `${dest.left}px`,
                    width: `${dest.width}px`,
                    height: `${dest.height}px`,
                    zIndex: 60,
                    margin: 0,
                    pointerEvents: 'none',
                    transition: 'all 1100ms cubic-bezier(0.16, 1, 0.3, 1)',
                  })
                })
              })

              // Handoff to main landing page once emblem has reached header
              setTimeout(() => {
                onDone()
              }, 1150)
            } else {
              onDone()
            }
          }, 400)
        }
      }, 65)
    }, 2400)

    return () => {
      clearTimeout(tRise)
      clearTimeout(tType)
      clearInterval(charInterval)
    }
  }, [onDone, logoTargetRef])

  return (
    <>
      {/* Background overlay — pure white, fades out during flight */}
      <div
        className={[
          'fixed inset-0 z-50 flex items-center justify-center bg-white overflow-hidden',
          'transition-opacity duration-1000',
          fadingBg ? 'opacity-0 pointer-events-none' : 'opacity-100',
        ].join(' ')}
      >
        {/* Centered content wrapper */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-3xl px-4">

          {/* ── Emblem + Sunrise Glow ── */}
          <div
            className={[
              'relative flex flex-col items-center justify-center',
              'transition-[transform,opacity] duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
              risen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0',
            ].join(' ')}
          >
            {/* Sunrise Glow behind emblem — fades out during fly */}
            <div
              className={[
                'absolute pointer-events-none animate-sunrise-glow transition-opacity duration-500',
                isFlying ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
              style={{
                top: '42%',
                left: '50%',
                width: 'clamp(520px, 60vw, 680px)',
                height: 'clamp(520px, 60vw, 680px)',
                borderRadius: '50%',
                background: `radial-gradient(
                  circle,
                  rgba(255, 220, 150, 0.90) 0%,
                  rgba(255, 170, 80, 0.50) 25%,
                  rgba(255, 100, 50, 0.20) 45%,
                  rgba(255, 60, 30, 0.06) 65%,
                  transparent 80%
                )`,
                filter: 'blur(28px)',
              }}
            />

            {/* Atmospheric soft sunrise haze */}
            <div
              className={[
                'absolute pointer-events-none transition-opacity duration-500',
                isFlying ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
              style={{
                top: '46%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(700px, 85vw, 980px)',
                height: 'clamp(380px, 45vw, 520px)',
                background: 'radial-gradient(ellipse, rgba(255, 150, 60, 0.16), transparent 70%)',
                filter: 'blur(50px)',
              }}
            />

            {/* Emblem Image in center */}
            <img
              ref={emblemRef}
              src={welcomeImg}
              alt="House of Dayspring emblem"
              className={[
                'relative z-10 w-72 sm:w-96 md:w-[420px] lg:w-[460px] h-auto select-none transition-opacity duration-150',
                isFlying ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            />
          </div>

          {/* ── Typewriter Text in Arial Light ── */}
          <div
            className={[
              'relative z-10 mt-6 h-10 flex items-center justify-center transition-opacity duration-500',
              isFlying ? 'opacity-0' : 'opacity-100',
            ].join(' ')}
          >
            <p
              className="text-center text-[#1a2090] tracking-wide"
              style={{
                fontFamily: 'Arial, "Helvetica Neue", sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(1.1rem, 2.6vw, 1.5rem)',
                letterSpacing: '0.04em',
              }}
            >
              {typed}
              {typed.length > 0 && typed.length < FULL_TEXT.length && (
                <span className="animate-blink font-light ml-0.5 text-[#1a2090]">|</span>
              )}
            </p>
          </div>

        </div>
      </div>

      {/* ── Flying Emblem (animates directly from center to header logo) ── */}
      {isFlying && flyStyle && (
        <img
          src={welcomeImg}
          alt="House of Dayspring emblem"
          style={flyStyle}
          className="select-none object-contain"
        />
      )}
    </>
  )
}
