const Navbar = () => {
    return(
        <nav className="bg-white h-20 w-full flex justify-between items-center">
            <ul className="flex w-auto">
                <li className="bg-gray-200 rounded-lg h-10 text-center mx-4 p-2 transition ease-in-out delay-300 hover:bg-blue-400"><a href="/">Form Builder</a></li>
                <li className="bg-gray-200 rounded-lg h-10 text-center mx-4 p-2 transition ease-in-out delay-300 hover:bg-blue-400"><a href="/upload">Upload</a></li>
            </ul>
            <h1 className="text-4xl p-4"><a href="/">✨🦆</a></h1>
        </nav>
    )
}

export default Navbar