import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { useSession, getSession } from "next-auth/react"
//import { GetServerSideProps } from 'next'
import { Form } from '../types/draftee'

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/api/user`, {
        method: 'GET',
    })
    //console.log(res)
    const userdata = await res.json()
    //console.log(userdata)
    // Pass data to the page via props
    return { props: { userdata } }
}

export default function Dashboard({ userdata }) {

    const { data: session, status } = useSession()

    if (status === 'loading') {
        return (<p>Loading...</p>)
    }

    if (status === "unauthenticated") {
        //TODO: Redirect to signin page
        return <p>Access Denied</p>
    }

    return (
        <>
            <h1 className="text-white text-4xl p-4">Welcome {userdata.name}</h1>
            <div className="bg-white h-screen m-4 p-4 rounded">
                {/* {userdata} */}
                <ul className="w-full h-auto flex flex-row flex-wrap text-center">
                    {
                        userdata.forms.map((form, index) => <li key={index} className="m-6 w-32 hover:cursor-pointer"><FontAwesomeIcon icon={faFileLines} size={'6x'} /><h3>{form.title}</h3></li>)
                    }
                </ul>
            </div>
        </>
    )
}