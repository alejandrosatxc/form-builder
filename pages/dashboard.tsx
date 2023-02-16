import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { useSession, getSession } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { useRouter } from 'next/router'
import { useAppContext } from './_app'
import { authOptions } from './api/auth/[...nextauth]'
import { useState, useEffect } from 'react'
import prisma from '../lib/prisma'
import { Form } from '@prisma/client'

//import { GetServerSideProps } from 'next'

export async function getServerSideProps(context) {
    //Get server-side session
    const session = await getServerSession(context.req, context.res, authOptions)

    //If a session doesn't exist
    if (!session) {
        return { props: { userdata: null } }
    }

    //Find user using session.user.email
    const prismaUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    //If a user doesn't exist
    if (!prismaUser) {
        return { props: { userdata: null } }
    }

    //Get all the forms on a userId
    const forms = await prisma.form.findMany({
        where: {
            userId: prismaUser.id
        }
    })

    // Pass data to the page via props
    return {
        props: {
            userdata: {
                forms: JSON.parse(JSON.stringify(forms))
            }
        }
    }
}

export default function Dashboard({ userdata }) {

    const { data: session, status } = useSession()
    const { setGdocData } = useAppContext()
    const router = useRouter()

    if (status === 'loading') {
        return (<p>Loading...</p>)
    }

    if (status === "unauthenticated") {
        //TODO: Redirect to signin page
        return (
            <div className="bg-white h-64 rounded flex flex-col place-items-center justify-center">
                <p className="">You must be logged in first to see your dashboard!</p>
            </div>
        )
    }

    //Submit a form to the back-end
    const handleFormSelect = async (formId: string) => {
        const res = await fetch(`http://localhost:3000/api/form/${formId}`, {
            method: "GET"
        })
        const form = await res.json()

        if (!form) {
            console.log("There was error retreiving the form")
            return
        }

        //render form builder with new data
        router.push('/formbuilder')
        setGdocData({
            title: form.title,
            content: form.content,
        })

    }

    return (
        <>
            <h1 className="text-white text-4xl p-4">Welcome {session.user.name}</h1>
            <h2 className="text-white text-3xl p-4">My Forms</h2>
            <div className="bg-white h-screen m-4 p-4 rounded">
                <ul className="w-full h-auto flex flex-row flex-wrap text-center">
                    {userdata.forms.length ?
                        userdata.forms.map((form: Form) => {
                            return (
                                <li key={form.id} onClick={() => handleFormSelect(form.id)} className="m-6 w-32 hover:cursor-pointer">
                                    <FontAwesomeIcon icon={faFileLines} size={'6x'} /><h3>{form.title}</h3>
                                </li>
                            )
                        })
                        : <h2 className="text-3xl">Looks like you don't have any forms yet, create one!</h2>
                    }
                </ul>
            </div>
        </>
    )

}