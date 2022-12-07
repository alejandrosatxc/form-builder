import { useRouter } from 'next/router'

const TemplateAnalysis = ({ fields, setFormFields }) => {

    const router = useRouter()

    if (fields === undefined) {
        fields = { matches: [], uniqueMatches: [] }
    }

    const handleNewDocument = () => {
        //Reset state to empty values
        setFormFields({ matches: [], uniqueMatches: [] })
    }

    const handleFormGeneration = () => {
        router.push({
            pathname: '/formbuilder',
            query: fields
        })
    }

    return (
        <div className="col-span-3 flex flex-col justify-center bg-white rounded-xl shadow-xl min-w-[550px]">
            <h1 className="text-3xl text-center text-slate-900 my-6">Template Analysis</h1>
            <div className="flex flex-row justify-center my-2 w-full">
                <div className='border rounded bg-slate-200 border-slate-300 mx-8 p-2 h-20 w-1/2'>
                    <h2 className='text-primary text-3xl'>{fields.uniqueMatches.length}</h2>
                    <p className='text-slate-600'>Unique Fields Identified</p>
                </div>
                <div className='border rounded bg-slate-200 border-slate-300 mx-8 p-2 h-20 w-1/2'>
                    <h2 className='text-primary text-3xl'>{fields.matches.length}</h2>
                    <p className='text-slate-600'>Total Fields</p>
                </div>
            </div>
            <div className='flex flex-col items-center my-4'>
                <h2 className='text-slate-900 text-2xl'>Fields</h2>
                <ol className='list-decimal'>
                    {fields.uniqueMatches.map((field, index) => {
                        return <li key={index}>{field}</li>
                    })}
                </ol>
            </div>
            <div className="flex flex-row bg-slate-200 border-t-slate-300 border-t rounded-b-lg w-full justify-end py-4 px-4">
                <button onClick={handleNewDocument} className="text-slate-700 h-12 w-18 p-2 mx-2 rounded-lg">New Document</button>
                <button onClick={handleFormGeneration} className="transition ease-in-out delay-50 bg-primary text-slate-100 hover:bg-terra-cotta hover:shadow-xl h-12 w-18 p-2 mx-2 rounded-lg">Generate Form</button>
            </div>
        </div>
    )
}

export default TemplateAnalysis