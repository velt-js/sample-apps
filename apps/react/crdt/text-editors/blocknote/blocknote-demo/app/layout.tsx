import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppProviders } from "@/app/userAuth/AppProviders";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Velt BlockNote Demo',
  description: 'BlockNote editor with Velt collaboration features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=new URLSearchParams(window.location.search).get('theme')||localStorage.getItem('theme-preference');var d=t==='dark'||(t==='system'||!t)&&window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400&family=Urbanist:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
