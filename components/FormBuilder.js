import { useEffect, useState } from 'react'
import Dustbin from '../components/Dustbin'
import { extractFields } from '../lib/getGdocText'
import Trashcan from './Trashcan'

const FormBuilder = ({ GdocData }) => {

    const [formComponents, setFormComponents] = useState([])

    useEffect(() => {
        if (GdocData) {
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
        <div className="flex flex-col bg-slate-800 min-h-screen min-w-0 w-full p-6">
            <textarea rows="1" className="text-6xl my-2 text-white bg-slate-800 h-20 overflow-hidden resize-none border-none outline-none" defaultValue={GdocData ? GdocData.title : "New Form"}></textarea>
            <Dustbin formComponents={formComponents} setFormComponents={setFormComponents} />
            <Trashcan formComponents={formComponents} setFormComponents={setFormComponents} />
        </div>
    )
}

export default FormBuilder