import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {


    const router = useRouter()
    const { data: session } = useSession()
    const [toggle, setToggle] = useState(false)
    //Figure out how to flip this value on an error message firing
    const pingSignin = false

    const navitems = [
        { title: "Form Builder", path: "/formbuilder" },
        { title: "Upload", path: "/" },
        { title: "Components", path: "/components" }
    ]
    const activeClasses = "flex justify-center place-items-center w-full h-full text-center text-lg text-primary border-b-2 border-b-primary"
    const inactiveClasses = "flex justify-center place-items-center w-full h-full text-center text-lg text-slate-400"
    return (
        <header className="h-20">
            <nav className="bg-black h-full w-full flex justify-between items-center">
                <h1 className="text-4xl p-4"><Link href="/">✨🦆</Link></h1>
                <ul className="flex flex-row w-1/2 h-full justify-center place-items-center">
                    {navitems.map(item => {
                        return (
                            <li key={item.title} className={router.pathname === item.path ? activeClasses : inactiveClasses}>
                                <Link href={item.path}>{item.title}</Link>
                            </li>
                        )
                    })}
                </ul>
                {session
                    ?
                    <div className="flex flex-col p-4">
                        <img onClick={() => {setToggle(!toggle)}} className="rounded-full w-12 hover:cursor-pointer" src={session.user.image} />
                        {toggle
                            ? <div className="flex justify-center place-items-center rounded-lg absolute top-24 right-4 p-4 bg-white border-2 border-slate-100">Signed in as {session.user.email}<button className="bg-slate-200 rounded p-2 align" onClick={() => signOut()}>Sign out</button></div>
                            : null}
                    </div>
                    :
                    <div className="flex justify-center place-items-center p-4">
                        <button onClick={() => signIn()} className="bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white rounded h-10 w-20 p-2 z-10">Sign in</button>
                        { pingSignin ? <span className="animate-ping absolute bg-fuchsia-600 rounded h-8 w-14 p-2 cursor-default"></span> : null }
                    </div>
                }
            </nav>
        </header>
    )
}

export default Navbar