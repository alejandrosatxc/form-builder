export interface FormContent {
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