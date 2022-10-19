import FormComponent from "./FormComponent"
const Contact = () => {

    return (
        <FormComponent name="Email Input">
            <h3 className="text-xl text-left ">Contact</h3>
            <label>Email:</label>
            <input className="border-2" type="text"></input>
            <label>Phone:</label>
            <input className="border-2" type="text"></input>
        </FormComponent>
    )
}

export default Contact