import type { Metadata } from 'next'
import { Inter, Urbanist, Poppins } from 'next/font/google'
import '../styles/globals.css'
import '../components/velt/ui-customization/styles.css'
import { AppProviders } from "@/app/userAuth/AppProviders"

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Velt Nivo Comments Demo',
  description: 'Velt Comments demo: hover-to-comment on Nivo charts via custom layers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var p = new URLSearchParams(window.location.search); var theme = p.get('theme') || localStorage.getItem('theme-preference');
              var isDark = theme === 'dark' || (!theme && false) || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
              if (isDark) document.documentElement.classList.add('dark');
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className={`${inter.variable} ${urbanist.variable} ${poppins.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
