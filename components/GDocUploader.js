import { useSession} from "next-auth/react"
import { useRef, useState } from "react"

const GDocUploader = ({ setGdoc }) => {

    const { data: session } = useSession()
    const inputRef = useRef(null)
    const [error, setError] = useState({message: null})

    const activeError = `
        absolute top-52
        flex flex-row justify-between place-items-center                     
        w-full h-14 p-4 mb-6 mx-auto
        bg-yellow-100 border-yellow-300 opacity-100 
        border-2 rounded-lg 
        transition-opacity ease-in duration-1000
    `

    const inactiveError = `
        absolute top-52
        flex flex-row justify-between place-items-center                     
        w-full h-14 p-4 mb-6 mx-auto
        bg-yellow-100 border-yellow-300 opacity-0
        border-2 rounded-lg 
        transition-opacity ease-out duration-200
    `

    const handleGdocSubmit = () => {

        var userInput = inputRef.current.value

        //Guardian Clauses
        if(!userInput) { setError({message: 'Oof. The box above is empty 🤷'}); return }
        if(!session) { setError({message: 'You need to login in to google first ☝️'}); return }
        if(!session.accessToken) { setError({message: 'Try Signing out, then Sign in again'}); return }

        const regex = /\/document\/d\/([a-zA-Z0-9-_]+)/
        var baseURL = 'https://docs.googleapis.com/v1/documents/'
        var documentId = regex.exec(userInput)

        fetch(baseURL + documentId[1], {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + session.accessToken
            })
        })
            .then(res => {
                console.log(res)
                if(!res.ok) { setError({message: 'Try Signing out, then Sign in again'}); return }
                return res.json()
            })
            .then(doc => {
                console.log(doc)
                setGdoc(doc)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="flex flex-col relative top-36 justify-center bg-white rounded-xl shadow-2xl my-8 max-w-[550px] min-w-[400px]">
            <label className="text-3xl text-slate-700 my-2 mx-auto h-8 hidden" htmlFor="url">Paste a Google Doc URL</label>
            <input className="rounded-full shadow-well text-lg placeholder-indigo-600 bg-indigo-300 border-indigo-300 border-0 mt-8 mb-4 mx-auto h-14 p-4 w-4/5" ref={inputRef} type="url" name="url" id="url"
                placeholder="Paste a Google Doc URL"
                pattern="https://.*" size="30"
                required>
            </input>
            <button onClick={handleGdocSubmit} className="rounded-full transition ease-in-out delay-50 bg-primary text-white shadow-bump h-14 w-4/5 mb-8 mt-2 p-4 mx-auto" type="submit">
                Submit
            </button>
            <div className={error.message ? activeError : inactiveError}>
                <span>{error.message}</span>
                <button onClick={() => { setError({message: null})}}>X</button>
            </div>
        </div>
    )
}

export default GDocUploader
