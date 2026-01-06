import type { Metadata } from 'next'
import '../styles/globals.css'
import '../components/velt/ui-customization/styles.css'
import { AppProviders } from "@/app/userAuth/AppProviders";

// Prevent static generation - Velt SDK requires client-side execution
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Velt SlateJS Comments Demo',
  description: 'SlateJS editor with Velt commenting features',
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
