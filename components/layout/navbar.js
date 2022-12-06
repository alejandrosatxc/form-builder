import Link from "next/link"

const Navbar = () => {
    return (
        <header className="h-20">
            <nav className="bg-green-sheen h-full w-full flex justify-between items-center">
                <ul className="flex w-auto">
                    <Link href="/formbuilder"><li className="bg-eggplant rounded-lg h-10 text-center mx-4 p-2 cursor-pointer transition ease-in-out hover:bg-terra-cotta">Form Builder</li></Link>
                    <Link href="/"><li className="bg-eggplant rounded-lg h-10 text-center mx-4 p-2 cursor-pointer transition ease-in-out hover:bg-terra-cotta">Upload</li></Link>
                    <Link href="/preview"><li className="bg-eggplant rounded-lg h-10 text-center mx-4 p-2 cursor-pointer transition ease-in-out hover:bg-terra-cotta">Preview</li></Link>
                </ul>
                <h1 className="text-4xl p-4"><Link href="/">✨🦆</Link></h1>
            </nav>
        </header>
    )
}

export default Navbar