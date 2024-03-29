import TemplateAnalysis from "../components/TemplateAnalysis"
import FormComponent from "../components/FormComponents/FormComponent"
import GDocUploader from "../components/GDocUploader"

const Components = () => {
    return (
        <div className="flex flex-col h-fit justify-center place-items-center">
            <div className="flex place-items-center justify-center w-full h-16 bg-yellow-400 border-yellow-500 border-2">This is where we can discuss and refine the look, feel, and functionality of different UI elements</div>
            <TemplateAnalysis />
            <FormComponent name="Name Input" type="name" id="name-tray" />
            <FormComponent name="Contact Input" type="contact" id="contact-tray" />
            <FormComponent name="Radio Input" type="radio" id="radio-tray" />
            <FormComponent name="Checkbox Input" type="checkbox" id="checkboxes-tray" />
        </div>
    )
}

export default Components