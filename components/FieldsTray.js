import Name from "./Name"
import Contact from "./Contact"
import Radio from "./Radio"
import Checkboxes from "./Checkboxes"

const FieldsTray = () => {
    return (
        <div className="col-span-1 bg-white rounded-xl shadow-xl h-full w-full p-4">
            <h2 className="text-3xl text-center border-b-2 ">Fields Tray</h2>
            <div className="">
                <Name />
                <Contact />
                <Radio />
                <Checkboxes />
            </div>
        </div>
    )
}

export default FieldsTray