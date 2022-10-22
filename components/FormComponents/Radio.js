import FormComponent from "./FormComponent"
import { useId } from 'react'

const Radio = () => {

    const id = useId()

    return (
        <FormComponent name="Radio Input" type="radio">
            <h3 className="text-black text-xl text-left ">Radio</h3>
            <input className="text-black" type="radio" id={id + '-html'} name="fav_language" value="HTML"></input>
            <label className="text-black" htmlFor={id + '-html'}>HTML</label>
            <input className="text-black" type="radio" id={id + '-css'} name="fav_language" value="CSS"></input>
            <label className="text-black" htmlFor={id + '-css'}>CSS</label>
            <input className="text-black" type="radio" id={id + '-javascript'} name="fav_language" value="JavaScript"></input>
            <label className="text-black" htmlFor={id + '-javascript'}>JavaScript</label>
        </FormComponent>
    )
}

export default Radio
