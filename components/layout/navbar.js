const Navbar = () => {
    return (
        <header>
            <nav className="bg-white h-20 w-full flex justify-between items-center">
                <ul className="flex w-auto">
                    <a href="/"><li className="bg-gray-200 rounded-lg h-10 text-center mx-4 p-2 transition ease-in-out delay-300 hover:bg-blue-400">Form Builder</li></a>
                    <a href="/upload"><li className="bg-gray-200 rounded-lg h-10 text-center mx-4 p-2 transition ease-in-out delay-300 hover:bg-blue-400">Upload</li></a>
                    <a href="/preview"><li className="bg-gray-200 rounded-lg h-10 text-center mx-4 p-2 transition ease-in-out delay-300 hover:bg-blue-400">Preview</li></a>
                </ul>
                <h1 className="text-4xl p-4"><a href="/">✨🦆</a></h1>
            </nav>
        </header>
    )
}

export default Navbar