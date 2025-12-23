'use client'

import { VeltProvider } from '@veltdev/react'
import { AppProviders } from './userAuth/AppProviders'

export function Providers({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_VELT_API_KEY || ''

  return (
    <VeltProvider
      apiKey={apiKey}
      permissionProvider={{
        // Force re-validation on each access check for demo purposes
        // This ensures permission changes are reflected immediately
        forceRefresh: true,
        // Retry configuration for failed permission requests
        retryConfig: {
          retryCount: 3,
          retryDelay: 2000,
        },
      }}
    >
      <AppProviders>{children}</AppProviders>
    </VeltProvider>
  )
}
