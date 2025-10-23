import type { Metadata } from 'next'
import '../styles/globals.css'
import '../styles/codemirror.css'
import { AppProviders } from './userAuth/AppProviders'

export const metadata: Metadata = {
  title: 'codemirror-demo',
  description: 'Library demo for codemirror',
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
