import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import ToastProvider from './components/ToastProvider'

export const metadata: Metadata = {
  title: 'ActionFlow AI — From Conversation to Execution',
  description:
    'Transform messy meetings, lectures, and brainstorming sessions into structured execution plans. Extract tasks, decisions, owners, deadlines, and risks automatically.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ToastProvider />
        {children}
        {/* Novus (Pendo) SDK loader */}
        <Script id="pendo-loader" strategy="afterInteractive">{`
(function(apiKey){
  (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
  v=['initialize','identify','updateOptions','pageLoad','track','trackAgent'];
  for(w=0,x=v.length;w<x;++w)(function(m){
    o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};
  })(v[w]);
  y=e.createElement(n);y.async=!0;
  y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
  z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);
  })(window,document,'script','pendo');
})('c01d3d77-9b63-4f48-bc12-c1e7c3bf260c');
`}</Script>
        <Script id="pendo-init" strategy="afterInteractive">{`
(function(){
  var aid='anon_'+Date.now()+'_'+Math.random().toString(36).slice(2,8);
  window.pendo&&window.pendo.initialize({visitor:{id:aid}});
})();
`}</Script>
      </body>
    </html>
  )
}
