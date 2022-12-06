import { getRouteMatcher } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useRouter } from 'next/router'

const FormPreview = ({ fields, setFormFields }) => {

    const router = useRouter()

    if(fields === undefined) {
        fields = {matches: [], uniqueMatches: []}
    }

    const handleNewDocument = () => {
        //Reset state to empty values
        setFormFields({matches: [], uniqueMatches: []})
    }

    const handleFormGeneration = () => {
        router.push({
            pathname: '/',
            query: fields
        })
    }

    return (
        <div className="col-span-3 flex flex-col justify-center bg-white rounded-xl shadow-xl h-1/2 w-3/4">
            <h1 className="text-3xl text-center">Form Preview</h1>
            <h2>Number of Fields found: {fields.matches.length}</h2>
            <h2>Number of unique Fields found: {fields.uniqueMatches.length}</h2>
            <h2>Fields</h2>
            <ul>
                {fields.uniqueMatches.map((field, index) => {
                    return <li key={index}>{field}</li>
                })}
            </ul>
            <button onClick={handleNewDocument} className="transition ease-in-out delay-150 bg-blue-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-cyan-200 h-8 w-16 mx-auto rounded-lg">New Document</button>
            <button onClick={handleFormGeneration} className="transition ease-in-out delay-150 bg-blue-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-cyan-200 h-8 w-16 mx-auto rounded-lg">Generate Form</button>
        </div>
    )
}

export default FormPreview