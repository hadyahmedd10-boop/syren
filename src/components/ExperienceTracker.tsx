'use client'

import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import { analyticsAllowed } from '@/lib/consent'

interface ExperienceTrackerProps {
  experienceTitle: string
  experienceSlug: string
}

export default function ExperienceTracker({ experienceTitle, experienceSlug }: ExperienceTrackerProps) {
  const posthog = usePostHog()

  useEffect(() => {
    // Only after analytics cookies are accepted.
    if (analyticsAllowed() && posthog?.__loaded) {
      posthog.capture('experience_viewed', {
        experience_title: experienceTitle,
        experience_slug: experienceSlug,
      })
    }
  }, [posthog, experienceTitle, experienceSlug])

  return null
}
