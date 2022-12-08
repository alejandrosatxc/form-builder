import { useEffect, useState } from 'react'
import Dustbin from '../components/Dustbin'
import Trashcan from './Trashcan'

const FormBuilder = ({ formFields }) => {

    const [formComponents, setFormComponents] = useState([])
    useEffect(() => {
        if(formFields.matches.length > 0) {
            var formComponent = {}
            const types = ['name', 'contact', 'checkbox', 'radio']
            var array = []
            formFields.uniqueMatches.forEach((match) => {
                formComponent = {
                    name: match,
                    type: types[Math.floor(Math.random() * 4)],
                    id: match
                }
                array.push(formComponent)
            })
            //console.log(array)
            setFormComponents(array)
        }
    }, [])
   

    return (
        <div className="flex flex-col bg-slate-300 min-h-screen w-full p-6">
            <h1 className="text-6xl my-2">Form Builder</h1>
            <Dustbin formComponents={formComponents} setFormComponents={setFormComponents} />
            <Trashcan formComponents={formComponents} setFormComponents={setFormComponents} />
        </div>
    )
}

export default FormBuilder