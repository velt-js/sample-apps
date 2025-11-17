import type { Metadata } from 'next'
import '../styles/globals.css'
import '../styles/codemirror.css'
import { AppProviders } from './userAuth/AppProviders'

export const metadata: Metadata = {
  title: 'Velt CodeMirror Demo',
  description: 'CodeMirror editor with Velt collaboration features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
