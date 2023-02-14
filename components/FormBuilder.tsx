import { useEffect, useState, createContext, useCallback } from 'react'
import FormCanvas from './FormCanvas'
import Trashcan from './Trashcan'
import FormComponentsTray from './FormComponentsTray'
import update from 'immutability-helper'
import { useAppContext } from '../pages/_app'
import { useFormBuilderContext, FormComponent } from '../pages/formbuilder'


export const FormBuilderContext = createContext(null)

const FormBuilder = () => {

    const { setFormComponents, formTitle, setFormTitle} = useFormBuilderContext()
    const { GdocData } = useAppContext()
    //const [title, setTitle] = useState("New Form")

    const handleChange = (e) => {
        setFormTitle(e.target.value)
    }
    useEffect(() => {
        var array = []
        //setTitle("New Form")
        if (GdocData) {
            setFormTitle(GdocData.title)
            var formComponent: FormComponent = null
            const types = ['name', 'contact', 'checkbox', 'radio']
            GdocData.uniqueMatches.forEach((match) => {
                formComponent = {
                    name: match,
                    type: types[Math.floor(Math.random() * 4)],
                    id: match
                }
                array.push(formComponent)
            })
            setFormComponents(array)
        }
    }, [GdocData])

    return (
        <div className="flex flex-col bg-slate-800 min-h-screen min-w-0 w-full">
                <div className="flex flex-row w-full">
                    <div className="hidden md:flex">
                        <FormComponentsTray />
                    </div>
                    <div className="flex flex-col w-full mx-4 min-h-screen">
                        <input onChange={handleChange} value={formTitle} type="text" className="text-6xl w-full my-2 text-white bg-slate-800 h-20 overflow-hidden resize-none border-none outline-none" />
                        <FormCanvas />
                    </div>
                </div>
        </div>
    )
}

export default FormBuilder