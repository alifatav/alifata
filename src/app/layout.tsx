import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fikri Ali Fata',
  description: 'website by Fikri Ali Fata. #onelife',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
       <AuthProvider>
         <Navbar />
         <div className='mt-10 p-4 md:p-8'>
          {children}
         </div>
       </AuthProvider>
       <Toaster
         position="top-right"
         reverseOrder={false}
       />
      </body>
    </html>
  )
}


