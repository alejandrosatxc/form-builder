import { useState, createContext, useContext } from 'react'
import { useSession, signIn } from 'next-auth/react'
import FormBuilder from '../components/FormBuilder'
import TemplateAnalysis from '../components/TemplateAnalysis'
import GDocUploader from '../components/GDocUploader'
import { useAppContext } from './_app'
import { FormContent, FormComponent } from '../types/draftee'
import { useRouter } from 'next/router'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export const FormBuilderContext = createContext<FormContent>({
  formComponents: [], //set default values
  setFormComponents: () => { },
  formTitle: "",
  setFormTitle: () => { }
})

export const useFormBuilderContext = () => useContext(FormBuilderContext)

export default function FormBuilderInterface() {

  const { setGdoc, setGdocData, activeModal, setActiveModal, modalToggle, setModalToggle } = useAppContext()
  const [loading, setLoading] = useState(false)
  const [formComponents, setFormComponents] = useState<FormComponent[]>([])
  const [formTitle, setFormTitle] = useState<string>("New Form")
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    //Check if signed in
    if (status !== 'authenticated') {
      signIn()
      return
    }

    let result = null;
    //If this is a form that alredy exists
    if (router.query.formId) {
      result = await fetch(`/api/form/${router.query.formId}`, {
        method: 'PUT',
        body: JSON.stringify({ content: formComponents, title: formTitle }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else { //Otherwise, create a new form
      result = await fetch("/api/form", {
        method: 'POST',
        body: JSON.stringify({ content: formComponents, title: formTitle }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    //If successful, redirect to the dashboard
    if (result.ok) {
      setLoading(false)
      router.push('/dashboard')
    }
  }

  var modal: any;

  switch (activeModal) {
    case 'Upload': modal = <GDocUploader />; break;
    case 'Analysis': modal = <TemplateAnalysis />; break;
    default: break;

  }

  return (
    <div className="flex flex-col h-auto w-full">
      <div className="flex flex-row bg-slate-700 p-4">
        <button className="w-32 rounded-full bg-yellow-500" onClick={() => { setModalToggle(!modalToggle); setActiveModal('Upload') }}>Import new Google Doc</button>
        <button className="w-32 mx-4 rounded-full bg-red-500" onClick={() => { setFormComponents([]); setGdocData(null); setGdoc(null); setFormTitle('New Form') }}>Clear Form</button>
        <button className="w-32 rounded-full bg-green-500" onClick={(e) => { handleFormSubmit(e) }} >Save Form <FontAwesomeIcon className={loading ? "animate-spin" : "hidden"} icon={faCircleNotch} /></button>
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