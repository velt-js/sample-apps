import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppProviders } from "@/app/userAuth/AppProviders";

export const metadata: Metadata = {
  title: 'reactflow-demo',
  description: 'Library demo for reactflow',
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
