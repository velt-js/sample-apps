import type { Metadata } from 'next'
import '../styles/globals.css'
import '../components/velt/ui-customization/styles.css'
import { AppProviders } from "@/app/userAuth/AppProviders";

export const metadata: Metadata = {
  title: 'Velt Tiptap Comments Demo',
  description: 'Tiptap editor with Velt commenting features',
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
