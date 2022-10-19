const Navbar = () => {
    return(
        <nav className="bg-white h-20 w-1/2 flex justify-between items-center">
            <ul className="flex">
                <li className="bg-gray-200 rounded-lg h-10 mx-4  text-center p-2"><a href="/">Form Builder</a></li>
                <li className="bg-gray-200 rounded-lg h-10 mx-4  text-center p-2"><a href="/upload">Upload</a></li>
            </ul>
        </nav>
    )
}

export default Navbar