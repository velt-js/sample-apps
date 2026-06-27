import type { Metadata } from 'next'
import '../styles/globals.css'
import '../components/velt/ui-customization/styles.css'
import '@mescius/spread-sheets/styles/gc.spread.sheets.excel2013white.css'
import { AppProviders } from "@/app/userAuth/AppProviders";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Velt SpreadJS Comments Demo',
  description: 'SpreadJS spreadsheet workbook with Velt commenting features',
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
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
