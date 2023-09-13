import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@alifata/app/context/AuthContext'
import Navbar from '@alifata/app/components/Navbar'

const inter = Inter({ subsets: ['latin'], style: 'normal' })

export const metadata: Metadata = {
  title: 'Fikri Ali Fata ⛹🏻',
  description: 'Hi, my name is Fikri. nice to meet u 🙋🏻‍♂️. this is my website.',
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
        <div className='mt-16 p-4 md:p-8'>
         {children}
        </div>
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
     </body>
   </html>
  )
}


