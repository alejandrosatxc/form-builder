import { useEffect, useState } from 'react'
import Dustbin from '../components/Dustbin'
import Trashcan from './Trashcan'

const FormBuilder = ({ formFields }) => {

    //console.log(formFields)

    const generateId = () => {
        const len = 10;
        var id = ''
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charslen = chars.length
        for(var i = 0; i < len; i++) {
          id += chars.charAt(Math.floor(Math.random() * charslen))
        }
    
        return id
      }

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
            console.log(array)
            setFormComponents(array)
        }
    }, [])
   

    return (
        <div className="col-span-2 flex flex-col bg-eggplant rounded-xl shadow-xl min-h-screen w-full p-6">
            <h1 className="text-6xl text-center border-b-2 my-2">Form Builder</h1>
            <Dustbin formComponents={formComponents} setFormComponents={setFormComponents} />
            <Trashcan formComponents={formComponents} setFormComponents={setFormComponents} />
        </div>
    )
}

export default FormBuilder