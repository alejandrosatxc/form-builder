import { useState, createContext, useContext } from 'react'
import FormBuilder from '../components/FormBuilder'
import TemplateAnalysis from '../components/TemplateAnalysis'
import GDocUploader from '../components/GDocUploader'
import { useAppContext } from './_app'

export interface FormContent {
  formComponents: FormComponent[],
  setFormComponents: (g: any) => void,
}

export interface FormComponent {
  name: string,
  type: string,
  id: string
}

export const FormBuilderContext = createContext<FormContent>({
  formComponents: [], //set default values
  setFormComponents: () => { },
})

export const useFormBuilderContext = () => useContext(FormBuilderContext)

export default function FormBuilderInterface() {

  const { setGdoc, setGdocData, activeModal, setActiveModal, modalToggle, setModalToggle } = useAppContext()
  const [formComponents, setFormComponents] = useState<FormComponent[]>([])

  var modal : any;

  switch (activeModal) {
    case 'Upload': modal = <GDocUploader />; break;
    case 'Analysis': modal = <TemplateAnalysis />; break;
    default: break;

  }

  return (
    <div className="flex flex-col h-auto w-full">
      <button className="w-16 bg-white" onClick={() => { setModalToggle(!modalToggle); setActiveModal('Upload') }}>Import new Google Doc</button>
      <button className="w-16 bg-white" onClick={() => { setFormComponents([]); setGdocData(null); setGdoc(null) }}>Clear Form</button>
      <FormBuilderContext.Provider value={{ formComponents, setFormComponents }}>
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