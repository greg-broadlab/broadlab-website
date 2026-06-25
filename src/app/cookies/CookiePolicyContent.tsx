'use client'

import { useEffect } from 'react'

export default function CookiePolicyContent() {
  useEffect(() => {
    const container = document.getElementById('cky-auto-cookie-policy')
    if (!container) return

    function movePolicy() {
      const policy = document.getElementById('cky-policy-container')
      if (policy && policy.parentNode !== container) {
        container.appendChild(policy)
        return true
      }
      return false
    }

    // If CookieYes already injected the container (e.g. page refresh), move it immediately
    if (movePolicy()) return

    // Otherwise watch body for when CookieYes appends it
    const observer = new MutationObserver(() => {
      if (movePolicy()) observer.disconnect()
    })
    observer.observe(document.body, { childList: true })

    // Load the cookie policy script — must append to body so document.currentScript is set
    const existing = document.getElementById('cky-policy-script')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = 'cky-policy-script'
    script.src = 'https://cdn-cookieyes.com/client_data/77a7252c29f0b94c713b226d6f2b75b6/cookie-policy/script.js'
    document.body.appendChild(script)

    return () => {
      observer.disconnect()
    }
  }, [])

  return <div id="cky-auto-cookie-policy" />
}
