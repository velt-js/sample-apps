import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import '../styles/globals.css'
import '../components/velt/ui-customization/styles.css'
import { AppProviders } from "@/app/userAuth/AppProviders";

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-urbanist',
})

export const metadata: Metadata = {
  title: 'marketing-spend-demo',
  description: 'Library demo for AgGrid',
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