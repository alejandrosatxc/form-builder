import { useState, createContext, useContext } from 'react'
import { useSession } from 'next-auth/react'
import FormBuilder from '../components/FormBuilder'
import TemplateAnalysis from '../components/TemplateAnalysis'
import GDocUploader from '../components/GDocUploader'
import { useAppContext } from './_app'
import { FormContent, FormComponent } from '../types/draftee'

export const FormBuilderContext = createContext<FormContent>({
  formComponents: [], //set default values
  setFormComponents: () => { },
  formTitle: "",
  setFormTitle: () => { }
})

export const useFormBuilderContext = () => useContext(FormBuilderContext)

export default function FormBuilderInterface() {

  const { setGdoc, setGdocData, activeModal, setActiveModal, modalToggle, setModalToggle } = useAppContext()
  const [formComponents, setFormComponents] = useState<FormComponent[]>([])
  const [formTitle, setFormTitle] = useState<string>("New Form")
  const { data: session } = useSession()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log(session)
    //const content = JSON.stringify(formComponents)

    const result = fetch("http://localhost:3000/api/form", {
      method: 'POST',
      body: JSON.stringify({ content: formComponents, title: formTitle }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log(result)
  }

  var modal: any;

  switch (activeModal) {
    case 'Upload': modal = <GDocUploader />; break;
    case 'Analysis': modal = <TemplateAnalysis />; break;
    default: break;

  }

  return (
    <div className="flex flex-col h-auto w-full">
      <div className="flex flex-row bg-slate-700 p-4 justify-start ">
        <button className="w-32 rounded bg-yellow-500" onClick={() => { setModalToggle(!modalToggle); setActiveModal('Upload') }}>Import new Google Doc</button>
        <button className="w-32 mx-4 rounded bg-red-500" onClick={() => { setFormComponents([]); setGdocData(null); setGdoc(null) }}>Clear Form</button>
        <button className="w-32 rounded bg-green-500" onClick={(e) => { handleFormSubmit(e) }} >Save Form</button>
      </div>

      <FormBuilderContext.Provider value={{ formComponents, setFormComponents, formTitle, setFormTitle }}>
        <div className={modalToggle ? "opacity-10 bg-black w-full" : "w-full"}>
          <FormBuilder />
        </div>
        {modalToggle ?
          <div className="fixed flex place-items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            {modal}
          </div>
          : null}
      </FormBuilderContext.Provider>

    </div>
  )
}