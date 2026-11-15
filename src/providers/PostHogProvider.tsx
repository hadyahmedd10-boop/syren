'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY

const isValidKey =
  !!posthogKey && posthogKey !== 'phc_...' && !posthogKey.includes('...')

let initialized = false

/**
 * Starts PostHog. Only called after the visitor accepts analytics cookies, so
 * no PostHog script loads and no PostHog cookie is set before consent.
 */
export function initPostHog() {
  if (initialized || typeof window === 'undefined' || !isValidKey) return
  initialized = true
  posthog.init(posthogKey!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,
  })
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  if (!isValidKey) {
    return <>{children}</>;
  }
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
