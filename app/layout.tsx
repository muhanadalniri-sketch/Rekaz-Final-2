
import './styles.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:'Rekaz Work Manager', description:'Offline-first WO/WNSC tracker', manifest:'/manifest.json',
  icons:{ icon:'/icons/icon-192.png', apple:'/icons/icon-192.png' }, themeColor:'#0b61ff'
}
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head><meta name="apple-mobile-web-app-capable" content="yes" /><meta name="apple-mobile-web-app-status-bar-style" content="default" /></head>
      <body>{children}</body>
    </html>
  )
}
