import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppUserProvider } from "@/app/userAuth/useAppUser";

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
        <AppUserProvider>{children}</AppUserProvider>
      </body>
    </html>
  )
}
