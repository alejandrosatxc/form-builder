import { useState } from 'react'
import TemplateAnalysis from '../components/TemplateAnalysis'
import GDocUploader from '../components/GDocUploader'

const Upload = () => {

    const [Gdoc, setGdoc] = useState(null)

    return (
        <div className="flex flex-col justify-center place-items-center">
        {Gdoc 
        ?   <TemplateAnalysis setGdoc={setGdoc} Gdoc={Gdoc}/>
        :   <GDocUploader setGdoc={setGdoc}/>
        }           
        </div>
    )
}

export default Upload