'use client'

import { useEffect } from 'react'

export default function CookiePolicyContent() {
  useEffect(() => {
    const container = document.getElementById('cky-auto-cookie-policy')
    if (!container) return

    const existing = document.getElementById('cky-policy-script')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = 'cky-policy-script'
    script.type = 'text/javascript'
    script.src = 'https://cdn-cookieyes.com/client_data/77a7252c29f0b94c713b226d6f2b75b6/cookie-policy/script.js'
    container.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return <div id="cky-auto-cookie-policy" />
}
