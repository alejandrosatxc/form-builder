import FormComponent from "./FormComponent"
import { useId } from "react"

const Contact = () => {

    const id = useId()

    return (
        <FormComponent name="Email Input" type="contact">
            <h3 className="text-black text-xl text-left ">Contact</h3>
            <label className="text-black " htmlFor={id + '-email'}>Email:</label>
            <input className="text-black border-2" id={id + '-email'} type="text"></input>
            <label className="text-black " htmlFor={id + '-phone'}>Phone:</label>
            <input className="text-black border-2" id={id + '-phone'} type="text"></input>
        </FormComponent>
    )
}

export default Contact