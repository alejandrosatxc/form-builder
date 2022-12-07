import { useState } from 'react'
import TemplateAnalysis from '../components/TemplateAnalysis'
import GDocUploader from '../components/GDocUploader'

const Upload = () => {
    const [formFields, setFormFields] = useState({
        matches: [],
        uniqueMatches: []
    })

    return (
        <div className="grid grid-cols-3 gap-x-6 h-screen place-items-center">
        {formFields.matches.length === 0 
        ?   <GDocUploader setFormFields={setFormFields}/>
        :   <TemplateAnalysis setFormFields={setFormFields} fields={formFields}/>
        }           
        </div>
    )
}

export default Upload