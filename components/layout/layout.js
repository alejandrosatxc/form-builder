import Head from 'next/head'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      {/* <Head>
        <title>Form Builder ✨🦆</title>
        <meta name="description" content="Created by Alejandro Zapien" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Navbar />
      <main className='flex-grow bg-slate-800 shadow-inner'>{children}</main>
      <Footer />
    </div>
  )
}