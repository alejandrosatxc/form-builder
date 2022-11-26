import '../styles/globals.css'
import Layout from '../components/layout/layout'
import { SessionProvider } from 'next-auth/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
        </DndProvider>
      </SessionProvider>
    </Layout>
  )
}

export default MyApp
