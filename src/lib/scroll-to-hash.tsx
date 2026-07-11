import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToHash() {
  const { pathname, hash } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // On a hard/direct load, the browser already scrolls to the fragment (or
    // top) natively — skip that first render so we don't double-scroll.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (!hash) {
      // Client-side route change with no anchor (e.g. navbar "Trabajá con
      // nosotros" to /careers) — the SPA doesn't reload, so the browser keeps
      // whatever scroll position the previous page was at unless we reset it.
      window.scrollTo(0, 0)
      return
    }

    const id = hash.slice(1)
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [pathname, hash])

  return null
}
