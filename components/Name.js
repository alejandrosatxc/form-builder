import FormComponent from './FormComponent'
const Name = () => {

    return (
        <FormComponent name="Name Input">
            <h3 className="text-xl text-left ">Name</h3>
            <label>First:</label>
            <input className="border-2" type="text"></input>
            <label>Last:</label>
            <input className="border-2" type="text"></input>
        </FormComponent>
    )
}

export default Name