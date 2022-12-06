import { getRouteMatcher } from 'next/dist/shared/lib/router/utils/route-matcher'
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
        <div className="col-span-3 flex flex-col justify-center bg-eggplant rounded-xl shadow-xl w-3/4">
            <h1 className="text-3xl text-center my-4">Template Analysis</h1>
            <div className="flex flex-row justify-center my-2">
                <div className='border rounded bg-green-sheen mx-4 p-2 h-20 w-1/4'>
                    <h2 className='text-3xl'>{fields.uniqueMatches.length}</h2>
                    <p>Unique Fields Identified</p>
                </div>
                <div className='border rounded bg-green-sheen mx-4 p-2 h-20 w-1/4'>
                    <h2 className='text-3xl'>{fields.matches.length}</h2>
                    <p>Total Fields</p>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <h2 className='text-2xl'>Fields</h2>
                <ol className='list-decimal'>
                    {fields.uniqueMatches.map((field, index) => {
                        return <li key={index}>{field}</li>
                    })}
                </ol>
                <div className="flex flex-row my-4">
                    <button onClick={handleNewDocument} className="transition ease-in-out delay-50 bg-deep-cham hover:bg-terra-cotta hover:shadow-xl h-12 w-18 p-2 mx-8 rounded-lg">New Document</button>
                    <button onClick={handleFormGeneration} className="transition ease-in-out delay-50 bg-green-sheen hover:bg-terra-cotta hover:shadow-xl h-12 w-18 p-2 mx-8 rounded-lg">Generate Form</button>
                </div>
            </div>
        </div>
    )
}

export default TemplateAnalysis