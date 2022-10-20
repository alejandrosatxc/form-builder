import FormComponent from './FormComponent'
const Name = () => {

    return (
        <FormComponent name="Name Input" type="name">
            <h3 className="text-black text-xl text-left ">Name</h3>
            <label className="text-black">First:</label>
            <input className="text-black border-2" type="text"></input>
            <label className="text-black">Last:</label>
            <input className="text-black border-2" type="text"></input>
        </FormComponent>
    )
}

export default Name