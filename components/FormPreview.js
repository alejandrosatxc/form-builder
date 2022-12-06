import { getRouteMatcher } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useRouter } from 'next/router'

const FormPreview = ({ fields, setFormFields }) => {

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
            pathname: '/',
            query: fields
        })
    }

    return (
        <div className="col-span-3 flex flex-col justify-center bg-eggplant rounded-xl shadow-xl h-3/4 w-3/4">
            <h1 className="text-3xl text-center">Form Preview</h1>
            <div className="flex flex-row">
                <h2>Number of Fields found: {fields.matches.length}</h2>
                <h2>Number of unique Fields found: {fields.uniqueMatches.length}</h2>
            </div>
            <h2>Fields</h2>
            <ul>
                {fields.uniqueMatches.map((field, index) => {
                    return <li key={index}>{field}</li>
                })}
            </ul>
            <div className="flex flex-row">
                <button onClick={handleNewDocument} className="transition ease-in-out delay-150 bg-deep-cham hover:bg-terra-cotta hover:shadow-xl h-12 w-18 p-2 mx-auto rounded-lg">New Document</button>
                <button onClick={handleFormGeneration} className="transition ease-in-out delay-150 bg-green-sheen hover:bg-terra-cotta hover:shadow-xl h-12 w-18 p-2 mx-auto rounded-lg">Generate Form</button>
            </div>
        </div>
    )
}

export default FormPreview