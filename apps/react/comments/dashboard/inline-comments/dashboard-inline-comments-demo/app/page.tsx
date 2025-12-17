'use client'

import DocumentCanvas from '@/components/document/document-canvas'
import { VeltProvider } from '@veltdev/react'
import { VeltCollaboration } from '@/components/velt/VeltCollaboration'
import { AppProviders } from './userAuth/AppProviders'
import { useVeltAuthProvider } from '@/components/velt/VeltInitializeUser'

function VeltWrapper({ children }: { children: React.ReactNode }) {
  const { authProvider } = useVeltAuthProvider()

  return (
    <VeltProvider
      apiKey={process.env.NEXT_PUBLIC_VELT_API_KEY || '6xTcUFtlYAlCdh11zrKB'}
      authProvider={authProvider}
    >
      <VeltCollaboration />
      {children}
    </VeltProvider>
  )
}

export default function Home() {
  return (
    <AppProviders>
      <VeltWrapper>
        <main className="flex h-screen w-screen">
          <DocumentCanvas />
        </main>
      </VeltWrapper>
    </AppProviders>
  )
}
