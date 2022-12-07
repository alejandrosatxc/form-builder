import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children }) {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Navbar />
      <main className='flex-grow bg-slate-300'>{children}</main>
      <Footer />
    </div>
  )
}