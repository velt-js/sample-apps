import type { Metadata } from 'next'
import '../styles/globals.css'
import { AppProviders } from "@/app/userAuth/AppProviders";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Velt ReactFlow CRDT Demo',
  description: 'ReactFlow canvas with Velt CRDT real-time collaboration',
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
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
