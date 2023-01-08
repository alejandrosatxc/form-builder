import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FormComponentsTray from '../components/FormComponentsTray'
import FormBuilder from '../components/FormBuilder'
import TemplateAnalysis from '../components/TemplateAnalysis'

export default function FormBuilderInterface() {

  const [Gdoc, setGdoc] = useState(null)
  const [GdocData, setGdocData] = useState(null)
  const [modalToggle, setModalToggle] = useState(false)

  const router = useRouter()

  useEffect(() => {
    //Check if router.query is empty object, which means no query
    if (Object.keys(router.query).length !== 0) {
      setGdoc(JSON.parse(router.query.data))
      setModalToggle(true)
    }
  }, [])


  return (
    <div className="flex flex-col h-auto w-full">
      <button className="w-16 bg-white" onClick={() => { setModalToggle(!modalToggle) }}>Import Google Doc</button>
      <div className={modalToggle ? "flex flex-row opacity-10 bg-black w-full" : "flex flex-row w-full"}>
        <div className="hidden md:flex">
          <FormComponentsTray />
        </div>
          <FormBuilder GdocData={GdocData} />
      </div>
      {modalToggle ?
        <div className="fixed flex place-items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
          <TemplateAnalysis Gdoc={Gdoc} setGdocData={setGdocData} setModalToggle={setModalToggle} />
        </div>
        : null}
    </div>
  )
}