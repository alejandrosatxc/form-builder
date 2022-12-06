import FormComponent from "./FormComponents/FormComponent"

const FieldsTray = () => {
    return (
        <div className="col-span-1 bg-eggplant rounded-xl shadow-xl h-fit w-full p-4">
            <h2 className="text-3xl text-center border-b-2 ">Fields Tray</h2>
            <ul className="">
                <FormComponent name="Name Input" type="name" id="name-tray"/>
                <FormComponent name="Contact Input" type="contact" id="contact-tray"/>
                <FormComponent name="Radio Input" type="radio" id="radio-tray"/>
                <FormComponent name="Checkbox Input" type="checkbox" id="checkboxes-tray"/>
            </ul>
        </div>
    )
}

export default FieldsTray