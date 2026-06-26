import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'
import '../components/velt/ui-customization/styles.css'
import { AppProviders } from "@/app/userAuth/AppProviders";

export const dynamic = 'force-dynamic';

const NUTRIENT_CDN_SCRIPT = 'https://cdn.cloud.nutrient.io/pspdfkit-web@1.15.1/nutrient-viewer.js'

export const metadata: Metadata = {
  title: 'Velt Nutrient Comments Demo',
  description: 'Nutrient PDF viewer with Velt commenting features',
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
        <Script src={NUTRIENT_CDN_SCRIPT} strategy="afterInteractive" />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
