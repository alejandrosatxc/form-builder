import { useRouter } from 'next/router'
import { useState } from 'react'
import { extractFields } from '../lib/getGdocText'

const TemplateAnalysis = ({ Gdoc, setGdoc }) => {

    const router = useRouter()
    const [fieldsToggle, setFieldsToggle] = useState(false)

    if (Gdoc) {
        var fields = extractFields(Gdoc)
    } else {
        var fields = { matches: [], uniqueMatches: [] }
        Gdoc = { title: "Title" }
    }

    const handleNewDocument = () => {
        setGdoc(null)
    }

    const handleFormGeneration = () => {
        router.push({
            pathname: '/formbuilder',
            query: fields
        })
    }

    const active = "h-52 overflow-scroll shadow-inner flex flex-col bg-slate-100 w-full transition-height ease-in-out duration-500"
    const inactive = "h-0 overflow-hidden shadow-inner flex flex-col bg-slate-100 w-full transition-height ease-in-out duration-500"

    return (
        <div className="flex flex-col justify-center bg-white rounded-xl shadow-xl my-8 min-w-[550px]">
            <h2 className="text-lg text-slate-400 mt-8 mb-2 mx-8">Template Analysis</h2>
            <h1 className="text-4xl text-primary mt-2 mb-4 mx-8">{Gdoc.title}</h1>
            <div className="flex flex-row justify-center w-full">
                <div className='border rounded shadow-inner bg-slate-100 border-slate-300 ml-8 mr-4 p-2 h-20 w-1/2'>
                    <h2 className='text-primary text-3xl'>{fields.uniqueMatches.length}</h2>
                    <p className='text-slate-600'>Unique Fields Identified</p>
                </div>
                <div className='border rounded shadow-inner bg-slate-100 border-slate-300 ml-4 mr-8 p-2 h-20 w-1/2'>
                    <h2 className='text-primary text-3xl'>{fields.matches.length}</h2>
                    <p className='text-slate-600'>Total Fields</p>
                </div>
            </div>
            {/* TODO: Make h2 stay purple when toggled */}
            <h2 onClick={() => { setFieldsToggle(!fieldsToggle) }} className='text-slate-500 hover:text-violet-600 text-2xl mx-8 my-4 hover:cursor-pointer'>{fieldsToggle ? "Fields -" : "Fields +"}</h2>
            <div className={fieldsToggle ? active : inactive}>
                <ol className='list-decimal ml-8'>
                    {fields.uniqueMatches.map((field, index) => { 
                        return <li className="my-2" key={index}>{field}</li>
                    })}
                </ol>
            </div>

            <div className="flex flex-row bg-slate-200 border-t-slate-300 border-t rounded-b-lg w-full justify-end py-4 px-4">
                <button onClick={handleNewDocument} className="bg-indigo-200 text-indigo-700 h-12 w-18 p-2 mx-2 rounded-full">New Document</button>
                <button onClick={handleFormGeneration} className="transition ease-in-out delay-50 bg-primary text-slate-100 hover:shadow-xl h-12 w-18 p-2 mx-2 rounded-full">Generate Form</button>
            </div>
        </div>
    )
}

export default TemplateAnalysis