import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { useSession, getSession } from "next-auth/react"
import { getToken } from "next-auth/jwt"
import getServerSession from "next-auth/next"
import { useRouter } from 'next/router'
import { useAppContext } from './_app'
import { authOptions } from './api/auth/[...nextauth]'
import { useState, useEffect } from 'react'
//import { GetServerSideProps } from 'next'

// export async function getServerSideProps(context) {
//     const session = await getServerSession(context.req, context.res, authOptions)

//     console.log(session)

//     // Fetch data from external API
//     const res = await fetch(`http://localhost:3000/api/user/alejandro@satxconsultants.com`, {
//         method: 'GET',
//     })
//     //console.log(res)
//     const userdata = await res.json()
//     console.log(userdata)
//     // Pass data to the page via props
//     return { props: { userdata } }
//}

export default function Dashboard() {

    const { data: session, status } = useSession()
    //console.log(session)
    const { setGdocData } = useAppContext()
    const [userdata, setUserdata] = useState(null)
    const router = useRouter()

    if (status === 'loading') {
        return (<p>Loading...</p>)
    }

    if (status === "unauthenticated") {
        //TODO: Redirect to signin page
        return (
            <div className="bg-white rounded flex flex-col place-items-center justify-center">
                <p className="">You must be logged in first to see your dashboard!</p>
            </div>
        )
    }

    const loadUser = async () => {
        const res = await fetch(`http://localhost:3000/api/user/${session.user.email}`, {
            method: 'GET',
        })
        //console.log(res)
        const data = await res.json()
        //console.log(userdata)

        //setUserdata(userdata)
        return data

    }

    const handleFormSelect = async (formId) => {
        //console.log(id)
        const res = await fetch(`http://localhost:3000/api/form/${formId}`, {
            method: "GET"
        })
        const form = await res.json()
        //render form builder with new data

        router.push('/formbuilder')
        setGdocData({
            title: form.title,
            content: form.content,
        })

    }

    useEffect(() => {
        loadUser().then(data => setUserdata(data))
    }, [])

    return (
        <>
            {userdata ?
                <>
                    <h1 className="text-white text-4xl p-4">Welcome {userdata.name}</h1>
                    <h2 className="text-white text-3xl p-4">My Forms</h2>
                    <div className="bg-white h-screen m-4 p-4 rounded">
                        <ul className="w-full h-auto flex flex-row flex-wrap text-center">
                            {userdata.forms.length ?
                                userdata.forms.map((form) => <li key={form.id} onClick={() => handleFormSelect(form.id)} className="m-6 w-32 hover:cursor-pointer"><FontAwesomeIcon icon={faFileLines} size={'6x'} /><h3>{form.title}</h3></li>)
                                : <h2 className="text-3xl">Looks like you don't have any forms yet, create one!</h2>
                            }
                        </ul>
                    </div>
                </> : null}

        </>
    )

}