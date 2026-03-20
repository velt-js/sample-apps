import type { Metadata } from 'next'
import '../styles/globals.css'
import '../components/velt/ui-customization/styles.css'
import { AppProviders } from "@/app/userAuth/AppProviders";

export const metadata: Metadata = {
  title: 'freestyle-comments-demo',
  description: 'freestyle-comments demo for comments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
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
      <body className="h-full m-0 p-0 overflow-hidden">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
