import '../styles/globals.css'
import Layout from '../components/layout/layout'
import { SessionProvider } from 'next-auth/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { createContext, useContext, useState } from 'react'

export interface GoogleDocData {
  matches:  string[],
  uniqueMatches: string[]
  title: string,
  id: string
}
export interface AppContent {
  Gdoc: any,
  setGdoc: (g: any) => void,
  GdocData: GoogleDocData,
  setGdocData: (g: any) => void,
  activeModal: string,
  setActiveModal: (g: any) => void,
  modalToggle: boolean,
  setModalToggle: (g: any) => void
}

export const AppContext = createContext<AppContent>({
  Gdoc: null, //set default values
  setGdoc: () => {},
  GdocData: null,
  setGdocData: () => {},
  activeModal: '',
  setActiveModal: () => {},
  modalToggle: false,
  setModalToggle: () => {}
})

export const useAppContext = () => useContext(AppContext)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [Gdoc, setGdoc] = useState<AppContent>(null)
  const [GdocData, setGdocData] = useState<GoogleDocData>(null)
  const [activeModal, setActiveModal] = useState('')
  const [modalToggle, setModalToggle] = useState(false)

  return (
    <SessionProvider session={session}>
      <DndProvider backend={HTML5Backend}>
        <AppContext.Provider value={{Gdoc, setGdoc, GdocData, setGdocData, activeModal, setActiveModal, modalToggle, setModalToggle}}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
      </DndProvider>
    </SessionProvider>
  )
}

export default MyApp