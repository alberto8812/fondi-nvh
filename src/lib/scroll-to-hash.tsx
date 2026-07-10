import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToHash() {
  const { hash } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // On a hard/direct load with a hash in the URL, the browser already scrolls
    // to the fragment natively — skip that first render so we don't double-scroll.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!hash) return

    const id = hash.slice(1)
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return null
}
