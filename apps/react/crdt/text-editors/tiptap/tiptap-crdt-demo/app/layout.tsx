import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppProviders } from './userAuth/AppProviders'

export const metadata: Metadata = {
  title: 'tiptap-crdt-demo',
  description: 'tiptap demo for crdt',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
