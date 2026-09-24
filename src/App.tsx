import { useRef, useState, useCallback, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Splash from './components/Splash'
import GivePage from './pages/GivePage'
import LaunchPage, { hasLaunchPassed } from './pages/LaunchPage'

function MainSite({
  hasSeenSplash,
  onSplashDone,
}: {
  hasSeenSplash: boolean
  onSplashDone: () => void
}) {
  const [showSplash, setShowSplash] = useState(!hasSeenSplash)
  const logoTargetRef = useRef<HTMLDivElement>(null)

  // ── Scroll management ──
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Only clear hash on initial fresh load if splash is active
    if (showSplash && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    if (showSplash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0)
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [showSplash])

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
    onSplashDone()
  }, [onSplashDone])

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

export default function App() {
  const [hasSeenSplash, setHasSeenSplash] = useState(() => {
    return hasLaunchPassed()
  })

  const markSplashSeen = useCallback(() => {
    setHasSeenSplash(true)
  }, [])

  const showSplashAfterLaunch = useCallback(() => {
    setHasSeenSplash(false)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainSite hasSeenSplash={hasSeenSplash} onSplashDone={markSplashSeen} />}
        />
        <Route path="/launch" element={<LaunchPage onShowSplash={showSplashAfterLaunch} />} />
        <Route path="/give" element={<GivePage />} />
      </Routes>
    </BrowserRouter>
  )
}
