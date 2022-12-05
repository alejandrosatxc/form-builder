const FormPreview = ({ fields, setFormFields }) => {

    const handleNewDocument = () => {
        //Reset state to empty values
        setFormFields({matches: [], uniqueMatches: []})
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
            <button onClick={handleNewDocument}>New Document</button>
        </div>
    )
}

export default FormPreview