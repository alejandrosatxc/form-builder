import { useSession} from "next-auth/react"
import { useRef, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { useAppContext }  from '../pages/_app'

type GDocUploaderProps = {
    setActiveModal?: any
}

const GDocUploader = ({ setActiveModal } : GDocUploaderProps) => {

    const { data: session } = useSession()
    const inputRef = useRef(null)
    const [error, setError] = useState({message: null})
    const [loading, setLoading] = useState(false)
    const { setGdoc } = useAppContext()

    const activeError = `
        absolute top-56
        flex flex-row justify-between place-items-center                     
        w-full h-14 p-4 mx-auto
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

    const handleGdocSubmit = () => {
        setLoading(true)
        var userInput = inputRef.current.value

        //Guardian Clauses
        if(!userInput) { 
            setError({message: 'Oof. The box above is empty 🤷'})
            setLoading(false)
            return 
        }
        if(!session) { 
            setError({message: 'You need to login in to google first ☝️'}) 
            setLoading(false)
            return
         }
        if(!session.accessToken) { 
            setError({message: 'Try Signing out, then Sign in again'})
            setLoading(false)
            return
        }

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
                if(!res.ok) { 
                    setError({message: 'Try Signing out, then Sign in again'}); 
                    setLoading(false)
                    return 
                }
                return res.json()
            })
            .then(doc => {
                console.log(doc)
                setGdoc(doc)
                if(setActiveModal !== undefined) setActiveModal('Analysis')
            })
            .catch(err => {
                console.log(err)
                setError({message: "Something went wrong"})
                setLoading(false)
            })
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
                Submit <FontAwesomeIcon className={loading ? "animate-spin" : "hidden" } icon={faCircleNotch}/>
            </button>
            <div className={error.message ? activeError : inactiveError}>
                <span>{error.message}</span>
                <button onClick={() => { setError({message: null})}}>X</button>
            </div>
        </div>
    )
}

export default GDocUploader
