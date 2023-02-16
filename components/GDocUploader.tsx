import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useAppContext } from '../pages/_app'

const GDocUploader = () => {

    const router = useRouter()
    const inputRef = useRef(null)
    const [error, setError] = useState({ message: null })
    const [loading, setLoading] = useState(false)
    const { setGdoc, setActiveModal, setModalToggle } = useAppContext()

    const activeError = `
        absolute top-56
        flex flex-row justify-between place-items-center                     
        w-full h-auto p-4 mx-auto
        bg-yellow-100 border-yellow-300 opacity-100 
        border-2 rounded-lg 
        transition-opacity ease-in duration-1000
    `

    const inactiveError = `
        absolute hidden
        flex flex-row justify-between place-items-center                     
        w-full h-14 p-4 mx-auto
        bg-yellow-100 border-yellow-300 opacity-0
        border-2 rounded-lg 
        transition-opacity ease-out duration-200
    `

    const handleGdocSubmit = async () => {

        setLoading(true)
        var userInput = inputRef.current.value

        //Check if input is empty
        if (!userInput) {
            setError({ message: 'Oof. The box above is empty 🤷' })
            setLoading(false)
            return
        }

        //Check if user is logged in
        const {data: session, status} = useSession()
        if (status !== 'authenticated') {
            setError({ message: 'You need to login in to google first ☝️' })
            setLoading(false)
            return
        }

        //Request a google docs access_token
        const access_token = await (await fetch(`/api/user/`)).json()

        //Check if request for access_token is successful
        if (!access_token) {
            setError({ message: 'No Access token, access denied' })
            setLoading(false)
            return
        }

        //Match a GoogleDocs URL
        const regex = /\/document\/d\/([a-zA-Z0-9-_]+)/
        var baseURL = 'https://docs.googleapis.com/v1/documents/'
        var documentId = regex.exec(userInput)

        //Ask google for a users Google Doc
        const response = await fetch(baseURL + documentId[1], {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + access_token
            })
        })

        //If Google says no
        if(!response.ok) {
            setError({ message: `Google says: ${JSON.stringify(await response.json())}` });
            setLoading(false)
            return
        }

        //Otherwise, we successfully got a Google Doc
        const doc = await response.json()
        setGdoc(doc)
        if (router.pathname !== '/formbuilder') {
            router.push('/formbuilder')
        }
        setActiveModal('Analysis')
        setModalToggle(true)
    }

    return (
        <div className="flex flex-col justify-center bg-slate-900 border-t-4 border-primary rounded-xl shadow-2xl">
            <label className="text-3xl text-slate-700 my-2 mx-auto h-8 hidden" htmlFor="url">Paste a Google Doc URL</label>
            <input className="rounded-full shadow-well text-lg placeholder-indigo-600 bg-indigo-300 border-indigo-300 border-0 mt-8 mb-4 mx-auto h-14 p-4 w-4/5" ref={inputRef} type="url" name="url" id="url"
                placeholder="Paste a Google Doc URL"
                pattern="https://.*" size={30}
                required>
            </input>
            <button onClick={handleGdocSubmit} className="rounded-full transition ease-in-out delay-50 bg-gradient-to-r from-fuchsia-700 to-violet-700  text-white shadow-bump h-14 w-4/5 mb-8 mt-2 p-4 mx-auto" type="submit">
                Submit <FontAwesomeIcon className={loading ? "animate-spin" : "hidden"} icon={faCircleNotch} />
            </button>
            <div className={error.message ? activeError : inactiveError}>
                <span>{error.message}</span>
                <button onClick={() => { setError({ message: null }) }}>X</button>
            </div>
        </div>
    )
}

export default GDocUploader
