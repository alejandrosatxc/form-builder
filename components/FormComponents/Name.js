import FormComponent from './FormComponent'
import { useId } from 'react'

const Name = ({id}) => {

    // const id = useId()
    if(!id) {const id = useId()}

    return (
        <FormComponent name="Name Input" type="name" id={id}>
            <h3 className="text-black text-xl text-left ">Name</h3>
            <label className="text-black" htmlFor={id + '-firstName'} >First:</label>
            <input className="text-black border-2" id={id + '-firstName'} type="text"></input>
            <label className="text-black"htmlFor={id + '-lastName'}>Last:</label>
            <input className="text-black border-2" id={id + '-lastName'} type="text"></input>
        </FormComponent>
    )
}

export default Name