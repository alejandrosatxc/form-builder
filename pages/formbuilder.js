import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FormComponentsTray from '../components/FormComponentsTray'
import FormBuilder from '../components/FormBuilder'
import TemplateAnalysis from '../components/TemplateAnalysis'
import GDocUploader from '../components/GDocUploader'
import { useAppContext } from './_app'

export default function FormBuilderInterface() {

  //const [Gdoc, setGdoc] = useState(null)
  const { setGdoc, Gdoc, GdocData} = useAppContext()
  const [modalToggle, setModalToggle] = useState(false)
  const [activeModal, setActiveModal] = useState('')

  const router = useRouter()

  useEffect(() => {
    //On component load, check if there's already an existing Gdoc
    if(Gdoc) {
      setModalToggle(true)
      setActiveModal('Analysis')
    }
  }, [])

  var modal;

  switch (activeModal) {
    case 'Upload': modal = <GDocUploader setActiveModal={setActiveModal} />; break;
    case 'Analysis': modal = <TemplateAnalysis setModalToggle={setModalToggle} />; break;
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