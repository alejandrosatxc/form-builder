import FormComponent from "./FormComponent"
const Contact = () => {

    return (
        <FormComponent name="Email Input" type="email">
            <h3 className="text-black text-xl text-left ">Contact</h3>
            <label className="text-black ">Email:</label>
            <input className="text-black border-2" type="text"></input>
            <label className="text-black ">Phone:</label>
            <input className="text-black border-2" type="text"></input>
        </FormComponent>
    )
}

export default Contact