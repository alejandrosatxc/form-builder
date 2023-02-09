import '../styles/globals.css'
import Layout from '../components/layout/layout'
import { SessionProvider } from 'next-auth/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { createContext, useContext, useState } from 'react'

export type AppContent = {
  Gdoc: any,
  setGdoc: (g: any) => void
}

export const AppContext = createContext<AppContent>({
  Gdoc: null, //set default values
  setGdoc: () => {}
})

export const useAppContext = () => useContext(AppContext)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [Gdoc, setGdoc] = useState<AppContent>(null)

  return (
    <SessionProvider session={session}>
      <DndProvider backend={HTML5Backend}>
        <AppContext.Provider value={{Gdoc, setGdoc}}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
      </DndProvider>
    </SessionProvider>
  )
}

export default MyApp
