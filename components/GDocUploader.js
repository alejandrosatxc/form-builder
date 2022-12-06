import { useSession, signIn, signOut } from "next-auth/react"
import { useRef } from "react"
import { extractFields } from '../lib/getGdocText'

const GDocUploader = ({ setFormFields }) => {
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
                //console.log(doc)
                var formFields = extractFields(doc)
                //console.log(formFields)
                setFormFields(formFields)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="col-span-3 flex flex-col justify-center items-center bg-eggplant rounded-xl shadow-xl h-1/2 w-3/4">
            <label className="text-3xl h-8 my-2 mx-auto" htmlFor="url">Enter a Google Doc URL:</label>
            <input className="rounded border-2 my-4 mx-auto h-10 p-2 w-3/4 " ref={inputRef} type="url" name="url" id="url"
                placeholder="https://example.com"
                pattern="https://.*" size="30"
                required>
            </input>
            <button onClick={handleGdocSubmit} className="transition ease-in-out delay-50 bg-green-sheen hover:bg-terra-cotta hover:shadow-xl h-10 w-3/4 my-2 mx-auto rounded" type="submit">
                Submit
            </button>
            {session
                ?
                <div className="flex flex-col">  Signed in as {session.user.email} <br />
                    <button className="bg-terra-cotta rounded p-2 align" onClick={() => signOut()}>Sign out</button>
                </div>
                :
                <div className="flex flex-col">  Not signed in <br />
                    <button className="bg-deep-cham rounded p-2 align" onClick={() => signIn()}>Sign in</button>
                </div>
            }
        </div>
    )
}

export default GDocUploader
