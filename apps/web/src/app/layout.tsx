import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@repo/ui/ui'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import 'react-loading-skeleton/dist/skeleton.css'
import 'simplebar-react/dist/simplebar.min.css'
import { PageProps } from '../../.next/types/app/page';
import { AppRouter } from '../../../../packages/trpc/index';
import AuthProvider from '@/components/AuthProvider'



const inter = Inter({ subsets: ['latin'] })




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='light'>
        <Providers>
          <body
            className={cn(
              'min-h-screen font-sans antialiased grainy',
              inter.className
            )}>
            <Navbar />
            {children}
          </body>
        </Providers>
    </html>
  )
}