import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ConvexClientProvider from '../providers/ConvexClientProvider'
import { Header } from '../components/header'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Genie Drive',
  description: 'Genie Drive',
  icons: {
    icon: [
      {
        url: '/assets/logo.webp',
        href: '/assets/logo.webp',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          <Header />
          {children}
          {/* <Footer /> */}
        </ConvexClientProvider>
      </body>
    </html>
  )
}
