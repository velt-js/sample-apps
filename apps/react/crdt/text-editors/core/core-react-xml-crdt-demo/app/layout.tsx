import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppProviders } from './userAuth/AppProviders'

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'core-xml-crdt-demo',
  description: 'core React XML CRDT mind map demo with Velt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Urbanist:wght@400;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=new URLSearchParams(window.location.search).get('theme')||localStorage.getItem('theme-preference')||'light';var d=t==='system'?window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light':t;if(d==='dark')document.documentElement.classList.add('dark')}catch(e){}})()` }} />
      </head>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
