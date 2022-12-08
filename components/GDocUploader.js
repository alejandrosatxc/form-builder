import { useSession} from "next-auth/react"
import { useRef } from "react"

const GDocUploader = ({ setGdoc }) => {
    const { data: session } = useSession()
    const inputRef = useRef(null)

    const handleGdocSubmit = () => {
        //console.log(session)
        const regex = /\/document\/d\/([a-zA-Z0-9-_]+)/
        var baseURL = 'https://docs.googleapis.com/v1/documents/'
        var userInput = inputRef.current.value
        var documentId = regex.exec(userInput)

        fetch(baseURL + documentId[1], {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + session.accessToken
            })
        })
            .then(res => {
                console.log(res)
                return res.json()
            })
            .then(doc => {
                //console.log(doc)ß
                setGdoc(doc)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="flex flex-col justify-center bg-white rounded-xl shadow-xl my-8 min-w-[550px]">
            <label className="text-3xl text-slate-700 my-2 mx-auto h-8 hidden" htmlFor="url">Paste a Google Doc URL</label>
            <input className="rounded-full text-lg placeholder-indigo-600 bg-indigo-100 border-indigo-300 border-2 mt-8 mb-4 mx-auto h-14 p-2 w-4/5 " ref={inputRef} type="url" name="url" id="url"
                placeholder="Paste a Google Doc URL"
                pattern="https://.*" size="30"
                required>
            </input>
            <button onClick={handleGdocSubmit} className="rounded-full transition ease-in-out delay-50 bg-primary text-white hover:bg-terra-cotta hover:shadow-xl h-14 w-4/5 mb-8 mt-2 p-4 mx-auto" type="submit">
                Submit
            </button>
        </div>
    )
}

export default GDocUploader
