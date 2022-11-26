import { useSession, signIn, signOut } from "next-auth/react"

const quickstart = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button className="bg-slate-200 rounded p-2" onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button className="bg-slate-200 rounded p-2" onClick={() => signIn()}>Sign in</button>
        </>
    )

}

export default quickstart