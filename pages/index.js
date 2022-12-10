import { useState } from 'react'
import TemplateAnalysis from '../components/TemplateAnalysis'
import GDocUploader from '../components/GDocUploader'

const Upload = () => {

    const [Gdoc, setGdoc] = useState(null)

    return (
        <>
            <div className='flex flex-col justify-center place-items-center w-full h-64 bg-slate-300'>
                {Gdoc
                    ? <TemplateAnalysis setGdoc={setGdoc} Gdoc={Gdoc} />
                    : <GDocUploader setGdoc={setGdoc} />
                }
            </div>
            <div className='w-full h-96 shadow-inner bg-violet-400'>

            </div>
            <div className='w-full h-96 bg-violet-800'>

            </div>
        </>
    )
}

export default Upload