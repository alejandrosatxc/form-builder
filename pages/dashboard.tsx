import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { useSession, getSession } from "next-auth/react"
import { GetServerSideProps } from 'next'
import { Form } from '../types/draftee'

export default function Dashboard() {

    const { data: session, status } = useSession()

    // const forms: Form[] = [
    //     { title: 'Intake Form', id: '1' },
    //     { title: 'Estate', id: '2' },
    //     { title: 'HIPPA', id: '3' },
    //     { title: 'Invitation', id: '5' },
    //     { title: 'RSVP Form', id: '6' },
    //     { title: 'Cancelation Form', id: '7' },
    //     { title: 'Survey Form', id: '8' },
    //     { title: 'Questionaire Form', id: '9' },
    // ]
    const forms: Form[] = undefined

    if (status === 'loading') {
        return (<p>Loading...</p>)
    }

    if (status === "unauthenticated") {
        //TODO: Redirect to signin page
        return <p>Access Denied</p>
    }

    return (
        <>
            <div className="bg-white h-screen m-4 p-4 rounded">
                <ul className="w-full h-auto flex flex-row flex-wrap text-center">
                    {
                        forms.map((form, index) => <li key={index} className="m-6 w-32 hover:cursor-pointer"><FontAwesomeIcon icon={faFileLines} size={'6x'} /><h3>{form.title}</h3></li>)
                    }
                </ul>
            </div>
        </>
    )
}