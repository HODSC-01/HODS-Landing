import { useRef, useState, useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Splash from './components/Splash'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const logoTargetRef = useRef<HTMLDivElement>(null)

  // ── Always start at the beginning on reload ──
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Clear any hash fragment so browser doesn't anchor jump on reload
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  // ── Lock scroll during intro splash ──
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [showSplash])

  const handleSplashDone = useCallback(() => {
    setShowSplash(false)
  }, [])

  return (
    <>
      {showSplash && (
        <Splash
          onDone={handleSplashDone}
          logoTargetRef={logoTargetRef}
        />
      )}

      <Navbar logoTargetRef={logoTargetRef} />
      <Home />
    </>
  )
}
