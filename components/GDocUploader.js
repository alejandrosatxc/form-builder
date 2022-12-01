import { useSession, signIn, signOut } from "next-auth/react"
import { useRef } from "react"
import { readStructuralElements } from '../lib/getGdocText'

const GDocUploader = () => {
    const { data: session } = useSession()
    const inputRef = useRef(null)

    const handleGdocSubmit = () => {
        console.log(session)
        const regex = /\/document\/d\/([a-zA-Z0-9-_]+)/
        var baseURL = 'https://docs.googleapis.com/v1/documents/'
        var userInput = inputRef.current.value
        var documentId = regex.exec(userInput)
        //console.log(documentId[1])
        //console.log(baseURL + documentId[1])
        fetch(baseURL + documentId[1],{
            method: 'GET',
            headers: new Headers ({
                'Authorization' : 'Bearer ' + session.accessToken
            })
        })
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then(doc => {
            console.log(doc)
            var headerContent = ''
            var footerContent = ''
            var bodyContent = readStructuralElements(doc.body.content)
            for(var footer in doc.footers) {
                footerContent += readStructuralElements(doc.footers[footer].content)
            }
            for(var header in doc.headers) {
                //console.log(readStructuralElements(doc.headers[header].content))
                headerContent += readStructuralElements(doc.headers[header].content)
            }

            //Match all {{}} fields in a template
            var re = /\{{([^}]+)\}}/g
            var text = headerContent + footerContent + bodyContent
            var matches = [...text.matchAll(re)]
            var matchesData = {
                matches : [],
                uniqueMatches : [], 
            }
            var field = ''
            matches.forEach(match => {
                //remove {{}} from field name
                field = match[0].replace('{{', '').replace('}}', '')
                matchesData.matches.push(field)
            })
            //This gets all unique values in an array by changing a random array into a Set object, (which
            //only has unique values), then changes the Set back to an array (and it only contains unique values)
            matchesData.uniqueMatches = [...new Set(matchesData.matches)]
            console.log(matchesData)
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="col-span-3 flex flex-col justify-center items-center bg-white rounded-xl shadow-xl h-1/2 w-3/4">
            <label className="h-8 mx-auto" htmlFor="url">Enter a Google Doc URL:</label>
            <input className="border-2 my-4 mx-auto" ref={inputRef} type="url" name="url" id="url"
                placeholder="https://example.com"
                pattern="https://.*" size="30"
                required>    
            </input>
            <button onClick={handleGdocSubmit} className="transition ease-in-out delay-150 bg-blue-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-cyan-200 h-8 w-16 mx-auto rounded-lg" type="submit">
                Submit
            </button>
            {session 
                ? 
                <div>  Signed in as {session.user.email} <br />
                <button className="bg-slate-200 rounded p-2" onClick={() => signOut()}>Sign out</button></div> 
                : 
                <div>  Not signed in <br />
                <button className="bg-slate-200 rounded p-2" onClick={() => signIn()}>Sign in</button></div>
            }
        </div>
    )
}

export default GDocUploader
