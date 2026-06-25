'use client'

import { useEffect } from 'react'

export default function CookiePolicyContent() {
  useEffect(() => {
    const container = document.getElementById('cky-auto-cookie-policy')
    if (!container) return
    const target: HTMLElement = container

    function movePolicy(): boolean {
      const policy = document.getElementById('cky-policy-container')
      if (!policy) return false
      if (policy.parentNode !== target) target.appendChild(policy)
      return true
    }

    if (movePolicy()) return

    const observer = new MutationObserver(() => {
      if (movePolicy()) {
        observer.disconnect()
        clearInterval(poll)
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })

    const poll = setInterval(() => {
      if (movePolicy()) {
        observer.disconnect()
        clearInterval(poll)
      }
    }, 300)

    const existing = document.getElementById('cky-policy-script')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.id = 'cky-policy-script'
    script.src = 'https://cdn-cookieyes.com/client_data/77a7252c29f0b94c713b226d6f2b75b6/cookie-policy/script.js'
    document.body.appendChild(script)

    return () => {
      observer.disconnect()
      clearInterval(poll)
    }
  }, [])

  return <div id="cky-auto-cookie-policy" />
}
