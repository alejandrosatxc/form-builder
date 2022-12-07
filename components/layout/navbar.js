import Link from "next/link"

const Navbar = () => {
    return (
        <header className="h-20">
            <nav className="bg-white h-full w-full flex justify-between items-center">
                <h1 className="text-4xl p-4"><Link href="/">✨🦆</Link></h1>
                <ul className="flex flex-row grow w-auto justify-center">
                    <Link href="/formbuilder"><li className="h-10 min-w-28 text-center text-lg mx-4 p-2 cursor-pointer transition ease-in-out hover:bg-terra-cotta">Form Builder</li></Link>
                    <Link href="/"><li className="h-10 min-w-28 text-center text-lg mx-4 p-2 cursor-pointer transition ease-in-out hover:bg-terra-cotta">Upload</li></Link>
                    <Link href="/preview"><li className="h-10 min-w-28 text-center text-lg mx-4 p-2 cursor-pointer transition ease-in-out hover:bg-terra-cotta">Preview</li></Link>
                </ul>
                <button className="p-4 bg-slate-200 rounded-md mx-4">Sign in</button>
            </nav>
        </header>
    )
}

export default Navbar