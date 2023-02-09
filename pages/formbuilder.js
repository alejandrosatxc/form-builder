import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FormComponentsTray from '../components/FormComponentsTray'
import FormBuilder from '../components/FormBuilder'
import TemplateAnalysis from '../components/TemplateAnalysis'
import GDocUploader from '../components/GDocUploader'
import { useAppContext } from './_app'

export default function FormBuilderInterface() {

  //const [Gdoc, setGdoc] = useState(null)
  const {Gdoc, setGdoc} = useAppContext()
  const [GdocData, setGdocData] = useState(null)
  const [modalToggle, setModalToggle] = useState(false)
  const [activeModal, setActiveModal] = useState('')

  const router = useRouter()

  useEffect(() => {
    //Check if router.query is empty object, which means no query
    if (Object.keys(router.query).length !== 0) {
      setGdoc(JSON.parse(router.query.data))
      setModalToggle(true)
      setActiveModal('Analysis')
    }
  }, [])

  var modal;

  switch (activeModal) {
    case 'Upload': modal = <GDocUploader setGdoc={setGdoc} setActiveModal={setActiveModal} />; break;
    case 'Analysis': modal = <TemplateAnalysis Gdoc={Gdoc} setGdocData={setGdocData} setModalToggle={setModalToggle} />; break;
    default: break;

  }

  return (
    <div className="flex flex-col h-auto w-full">
      <button className="w-16 bg-white" onClick={() => { setModalToggle(!modalToggle); setActiveModal('Upload') }}>Import new Google Doc</button>
      <div className={modalToggle ? "opacity-10 bg-black w-full" : "w-full"}>
        <FormBuilder GdocData={GdocData} modalToggle={modalToggle} />
      </div>
      {modalToggle ?
        <div className="fixed flex place-items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          {modal}
        </div>
        : null}
    </div>
  )
}