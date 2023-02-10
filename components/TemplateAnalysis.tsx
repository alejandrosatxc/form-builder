import { useState } from 'react'
import { extractFields } from '../lib/getGdocText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '../pages/_app'
import { useFormBuilderContext } from '../pages/formbuilder'
import { GoogleDocData } from '../pages/_app'

type Fields = {
    matches: string[],
    uniqueMatches: string[]
}

const TemplateAnalysis = () => {

    const { Gdoc, setGdocData, setActiveModal, setModalToggle} = useAppContext()
    const { setFormComponents } = useFormBuilderContext()
    const [fieldsToggle, setFieldsToggle] = useState(false)

    if (Gdoc) {
        const fields : Fields = extractFields(Gdoc)
        var GdocData : GoogleDocData = {
            matches: fields.matches,
            uniqueMatches: fields.uniqueMatches,
            title: Gdoc.title,
            id: Gdoc.documentId,
        }
        console.log(GdocData)
    } else {
        var GdocData : GoogleDocData = {
            matches: [],
            uniqueMatches: [],
            title: "Title",
            id: null
        }
    }

    //Go back to the upload module
    const handleGoBack = () => {
        setActiveModal("Upload")
        //setGdocData(null)
    }

    const handleFormGeneration = () => {
        setGdocData(GdocData)
        setModalToggle(false)
    }

    const active = "h-52 overflow-y-scroll scrollbar shadow-inner flex flex-col bg-slate-800 text-white w-full transition-height ease-in-out duration-500"
    const inactive = "h-0 overflow-hidden shadow-inner flex flex-col bg-slate-800 text-white w-full transition-height ease-in-out duration-500"
    const activeTextToggle = "text-primary text-xl w-14 ml-8 mr-2 my-4"
    const inactiveTextToggle = "text-slate-500 hover:text-primary text-xl w-14 ml-8 mr-2 my-4"

    return (
        <div className="flex flex-col justify-center bg-slate-900  border-t-4 border-primary rounded-xl shadow-xl my-8 w-4/5 max-w-[550px]">
            <div className="flex flex-row justify-between">
                <h2 className="text-lg text-slate-400 mt-8 mb-2 mx-8">Template Analysis</h2>
                <button className="text-white mr-8 hover:cursor-pointer" onClick={() => {setModalToggle(false)}}>X</button>
            </div>
            <h1 className="text-4xl text-white mt-2 mb-4 mx-8"><FontAwesomeIcon icon={faFileLines} className="mr-4" size="sm" />{GdocData.title}</h1>
            <div className="flex flex-row md:flex-nowrap flex-wrap justify-center w-full">
                <DataDisplay value={GdocData.uniqueMatches.length} description="Unique Fields Identified" />
                <DataDisplay value={GdocData.matches.length} description="Total Fields" />
            </div>
            <button onClick={() => { setFieldsToggle(!fieldsToggle) }} className="flex flex-row place-items-center text-left w-1/4 hover:text-primary">
                <h2 className={fieldsToggle ? activeTextToggle : inactiveTextToggle}>Fields </h2>
                <FontAwesomeIcon className={fieldsToggle ? "bg-slate-700 text-primary rounded-full p-1 transition ease-in-out duration-400 -rotate-180" : "bg-slate-700 text-white rounded-full p-1 transition ease-in-out duration-400"} icon={faChevronDown} size="sm" />
            </button>
            <div className={fieldsToggle ? active : inactive}>
                <ol className='list-decimal ml-8'>
                    {GdocData.uniqueMatches.map((field, index) => {
                        return <li className="my-2" key={index}>{field}</li>
                    })}
                </ol>
            </div>

            <div className="flex flex-row md:flex-nowrap flex-wrap-reverse bg-slate-900 rounded-b-lg w-full justify-end py-4 px-4">
                <button onClick={handleGoBack} className="bold text-primary h-12 w-full md:w-fit p-2 mx-2 rounded-full">Go Back</button>
                <button onClick={handleFormGeneration} className="bg-primary text-slate-100 shadow-2xl h-12 w-full md:w-fit p-2 mx-2 rounded-full">Generate Form</button>
            </div>
        </div>
    )
}

const DataDisplay = ({ value, description }) => {
    return (
        <div className='rounded bg-slate-800 mx-8 p-2 my-2 h-20 w-full'>
            <h2 className='text-white text-3xl'>{value}</h2>
            <p className='text-white'>{description}</p>
        </div>
    )
}

export default TemplateAnalysis