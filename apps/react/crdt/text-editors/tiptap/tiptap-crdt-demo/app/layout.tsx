import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppUserProvider } from './userAuth/AppUserContext'

export const metadata: Metadata = {
  title: 'tiptap-crdt-demo',
  description: 'tiptap demo for crdt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppUserProvider>
          {children}
        </AppUserProvider>
      </body>
    </html>
  )
}
