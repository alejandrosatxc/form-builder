import { useEffect, useState, createContext, useCallback } from 'react'
import FormCanvas from './FormCanvas'
import Trashcan from './Trashcan'
import FormComponentsTray from './FormComponentsTray'
import update from 'immutability-helper'
import { useAppContext } from '../pages/_app'


export const FormBuilderContext = createContext(null)

const FormBuilder = ({ modalToggle }) => {

    const [formComponents, setFormComponents] = useState([])
    const { GdocData } = useAppContext()
    var title = "New Form"
    useEffect(() => {
        if (GdocData) {
            title = GdocData.title
            var formComponent = {}
            const types = ['name', 'contact', 'checkbox', 'radio']
            var array = []
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
            <FormBuilderContext.Provider value={[formComponents, setFormComponents]} >
                <div className="flex flex-row w-full">
                    <div className="hidden md:flex">
                        <FormComponentsTray />
                    </div>
                    <div className="flex flex-col w-full mx-4 min-h-screen">
                        <input value={GdocData ? GdocData.title : "New Form"} type="text" className="text-6xl w-full my-2 text-white bg-slate-800 h-20 overflow-hidden resize-none border-none outline-none" />
                        <FormCanvas />
                    </div>
                </div>
            </FormBuilderContext.Provider>
        </div>
    )
}

export default FormBuilder