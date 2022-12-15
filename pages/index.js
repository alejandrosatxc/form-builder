import { useState } from 'react'
import TemplateAnalysis from '../components/TemplateAnalysis'
import GDocUploader from '../components/GDocUploader'

const Upload = () => {

    const [Gdoc, setGdoc] = useState(null)

    return (
        <>
            <div className="relative flex flex-col bg-[url('/hero.jpg')] bg-bottom bg-cover justify-center place-items-center h-80 w-full">
                <h1 className='text-white text-6xl mb-4 mx-4'>DraftMe away. To the future.</h1>
                <div className="absolute top-56 mx-4" >
                    <GDocUploader setGdoc={setGdoc} />
                </div>
                {/* {Gdoc
                    ? <div className='absolute top-24'><TemplateAnalysis setGdoc={setGdoc} Gdoc={Gdoc} /></div>
                    : <div className='relative top-36'><GDocUploader setGdoc={setGdoc} /></div>
                } */}
            </div>
            <div className='w-full h-96 shadow-inner bg-slate-800'>

            </div>
        </>
    )
}

export default Upload