import CondensedComponent from "./FormComponents/CondensedComponent"
import { faUser, faEnvelope, faSquareCheck, faCircleDot, faPhone } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const FormComponentsTray = () => {

    const [components, setComponents] = useState([
        { type: "name", name: "Name", icon: faUser, label: "Name" },
        { type: "contact", name: "Contact", icon: faEnvelope, label: "Contact" },
        { type: "checkbox", name: "Checkbox", icon: faSquareCheck, label: "Checkboxes" },
        { type: "radio", name: "Radio", icon: faCircleDot, label: "Radio" },
        { type: null, name: null, icon: faPhone, label: "Phone" },
        { type: null, name: null, icon: null, label: "Address" },
        { type: null, name: null, icon: null, label: "Date" },
        { type: null, name: null, icon: null, label: "Name" },
        { type: null, name: null, icon: null, label: "Name" },
        { type: null, name: null, icon: null, label: "Name" },
        { type: null, name: null, icon: null, label: "Address" },
    ])

    return (
        <div className="bg-slate-800 shadow-xl h-fit w-[300px]">
            <h2 className="text-3xl p-4 text-white">Form Components</h2>
            <ul className="">
                {components.map(component => {
                    return (
                        <li key={component.label}>
                            <CondensedComponent type={component.type} name={component.name} icon={component.icon} label={component.label} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default FormComponentsTray