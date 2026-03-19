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
  title: 'Velt AG Grid Multiple Tools Demo',
  description: 'AG Grid demo with multiple Velt collaboration tools',
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
              var theme = localStorage.getItem('theme-preference');
              var isDark = theme === 'dark' || (!theme && false) || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
              if (isDark) document.documentElement.classList.add('dark');
            } catch(e) {}
          })();
        `}} />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}