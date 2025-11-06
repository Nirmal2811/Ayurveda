import React, { useEffect, useState } from 'react'
import Home from './pages/home'
import Pizhichil from './pages/pizhichil'
import Abhyanga from './pages/abhyanga'
import Shirodhara from './pages/shirodhara'
import Elakizhi from './pages/elakizhi'
import Njavarakizhi from './pages/njavarakizhi'
import Netratarpana from './pages/netratarpana'
// file is named `nasyam.jsx` in the pages folder
import Nasyam from './pages/nasyam'
// file is named `kativasti.jsx` in the pages folder
import Kativasti from './pages/kativasti'
import Shirovasti from './pages/shirovasti'
import Januvasti from './pages/januvasti'
import './App.css'

function App() {
  const [path, setPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/')
  const [isNavigating, setIsNavigating] = useState(false)

  // keep a map of scroll positions per URL so we can restore on back/forward
  const scrollPositions = React.useRef(new Map())
  // track whether the last navigation was a push or a pop so we decide whether to restore
  const lastAction = React.useRef(null)

  useEffect(() => {
    const onPop = () => {
      lastAction.current = 'pop'
      setPath(window.location.pathname)
    }
    window.addEventListener('popstate', onPop)
    // also respond to hash changes (e.g. /# or /#section) to show Home when hash-only navigation occurs
    const onHash = () => {
      // if the only difference is a hash on the home path, remove it from the URL and show Home
      if ((window.location.pathname === '/' || window.location.pathname === '/index.html') && window.location.hash) {
        // replace the URL to remove the hash without adding a new history entry
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
        // treat this as a pop-like action (user may have used anchor/hash)
        lastAction.current = 'pop'
        setPath(window.location.pathname)
        return
      }
      // otherwise update path normally
      // hashchange can be triggered by back/forward or programmatic changes; treat as pop
      lastAction.current = 'pop'
      setPath(window.location.pathname)
    }
  window.addEventListener('hashchange', onHash)

    // capture clicks on internal links so we can save scroll position before the browser navigates
    const onLinkClick = (e) => {
      try {
        // find nearest anchor
        const a = e.target && e.target.closest && e.target.closest('a')
        if (!a) return
        // ignore modified clicks / new tab
        if (a.target && a.target !== '' && a.target !== '_self') return
        const href = a.getAttribute('href')
        if (!href) return
        // ignore external links and hash-only navigation
        if (href.startsWith('#')) return
        if (href.startsWith('tel:') || href.startsWith('mailto:')) return
        
        // for internal navigation, prevent default and use pushState to handle it ourselves
        if (href.startsWith('/')) {
          e.preventDefault()

          // detect mobile/small viewports
          const isMobile = (typeof window !== 'undefined') && (window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent))

          // check if we're navigating to a page we've visited before (has saved scroll position)
          const targetKey = href.split('?')[0] + (href.includes('?') ? '?' + href.split('?')[1] : '')
          const hasScrollPosition = scrollPositions.current.has(targetKey)
          
          // don't show loading overlay on mobile when navigating back to a previously visited page
          const isBackNavigation = isMobile && hasScrollPosition

          // start navigation loading state only when not a back navigation on mobile
          if (!isBackNavigation) {
            setIsNavigating(true)
          }

          // save current scroll position
          const key = window.location.pathname + window.location.search
          scrollPositions.current.set(key, window.scrollY || window.pageYOffset || 0)
          lastAction.current = 'push'

          // no delay for back navigation on mobile, small delay otherwise
          const delay = isBackNavigation ? 0 : 50
          setTimeout(() => {
            // navigate using pushState
            window.history.pushState(null, '', href)
            setPath(href.split('?')[0]) // remove query params for our path matching
          }, delay)
        }
      } catch (err) {
        // swallow
      }
    }
    document.addEventListener('click', onLinkClick, { capture: true })

  // handle an initial hash on first load (e.g. visiting /# )
  onHash()

    // patch history.pushState so SPA navigations update our state too
    const origPush = window.history.pushState
    window.history.pushState = function (...args) {
      // save scroll position for the current URL before navigating away
      try {
        const key = window.location.pathname + window.location.search
        scrollPositions.current.set(key, window.scrollY || window.pageYOffset || 0)
      } catch (e) {
        // ignore
      }
      lastAction.current = 'push'
      const res = origPush.apply(this, args)
      // update our reactive path to the new location
      setPath(window.location.pathname)
      return res
    }

    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('hashchange', onHash)
      document.removeEventListener('click', onLinkClick, { capture: true })
      window.history.pushState = origPush
    }
  }, [])

  // when the `path` changes, restore scroll for pop navigations or scroll to top for push
  useEffect(() => {
    // wait a couple frames to ensure the new component has fully rendered and laid out
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        try {
          const key = window.location.pathname + window.location.search
          if (lastAction.current === 'pop') {
            const pos = scrollPositions.current.get(key) ?? 0
            // use setTimeout for mobile compatibility
            setTimeout(() => {
              window.scrollTo(0, pos)
              // end navigation loading state after scroll is done
              setTimeout(() => setIsNavigating(false), 100)
            }, 0)
          } else {
            // push/initial navigation -> scroll to top
            setTimeout(() => {
              window.scrollTo(0, 0)
              // end navigation loading state after scroll is done
              setTimeout(() => setIsNavigating(false), 150)
            }, 0)
          }
        } catch (e) {
          // fallback
          try {
            if (lastAction.current === 'pop') {
              const pos = scrollPositions.current.get(window.location.pathname) ?? 0
              document.documentElement.scrollTop = pos
              document.body.scrollTop = pos
            } else {
              document.documentElement.scrollTop = 0
              document.body.scrollTop = 0
            }
          } catch (e2) {
            // ignore
          }
          // end loading state even if there was an error
          setIsNavigating(false)
        } finally {
          lastAction.current = null
        }
      })
    })
  }, [path])

  // centralize page selection so we can render a single loading overlay reliably
  let content = <Home />

  if (path === '/' || path === '/index.html') {
    content = <Home />
  } else if (path.startsWith('/pizhichil')) {
    content = <Pizhichil />
  } else if (path.startsWith('/abhyanga')) {
    content = <Abhyanga />
  } else if (path.startsWith('/shirodhara')) {
    content = <Shirodhara />
  } else if (path.startsWith('/elakizhi')) {
    content = <Elakizhi />
  } else if (path.startsWith('/njavarakizhi')) {
    content = <Njavarakizhi />
  } else if (path.startsWith('/netratarpana')) {
    content = <Netratarpana />
  } else if (path.startsWith('/nasyam')) {
    content = <Nasyam />
  } else if (path.startsWith('/kativasti')) {
    content = <Kativasti />
  } else if (path.startsWith('/shirovasti')) {
    content = <Shirovasti />
  } else if (path.startsWith('/januvasti')) {
    content = <Januvasti />
  }

  // Render overlay once at top level to ensure it always covers the page (use an opaque bg)
  return (
    <>
      {isNavigating && (
        <div className="fixed inset-0 bg-white z-[99999] flex items-center justify-center" aria-hidden={false} role="status" aria-label="Loading">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {content}
    </>
  )
}

export default App
