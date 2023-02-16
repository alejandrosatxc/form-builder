export interface FormContent {
    formId? : string
    formComponents: FormComponent[]
    setFormComponents: (g: any) => void
    formTitle: string
    setFormTitle: (g: any) => void
}

export interface FormComponent {
    name: string
    type: "name" | "contact" | "checkbox" | "radio"
    id: string
}

export interface Form {
    userId: string
    title: string
    formComponents: FormComponent[]
}

export interface GoogleDocData {
    matches?: string[],
    uniqueMatches?: string[]
    title: string,
    id: string,
    content?: Form
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