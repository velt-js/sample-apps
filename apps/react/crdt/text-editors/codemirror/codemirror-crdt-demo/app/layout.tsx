import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppUserProvider } from './userAuth/AppUserContext'

export const metadata: Metadata = {
  title: 'codemirror-crdt-demo',
  description: 'codemirror demo for CRDT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme-preference');var d=t==='dark'||(t==='system'||!t)&&window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark')}catch(e){}})()` }} />
      </head>
      <body>
        <AppUserProvider>
          {children}
        </AppUserProvider>
      </body>
    </html>
  )
}
