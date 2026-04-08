import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppUserProvider } from './userAuth/AppUserContext'

export const metadata: Metadata = {
  title: 'codemirror-comments-demo',
  description: 'codemirror demo for comments',
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
      </head>
      <body>
        <AppUserProvider>
          {children}
        </AppUserProvider>
      </body>
    </html>
  )
}
