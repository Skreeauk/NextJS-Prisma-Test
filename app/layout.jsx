import '@/css/globals.css'
import { Inter } from 'next/font/google'

import { Nav } from '@/components/Nav'
import { Provider } from '@/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptopia',
  description: 'Next JS 13 Tutorial',
}

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
            <div className='main'>
                <div className='gradient'></div>
            </div>
            <main className='app'>
                <Nav />
                {children}
            </main>
        </Provider>
      </body>
    </html>
  )
}
