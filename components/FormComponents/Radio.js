import FormComponent from "./FormComponent"
const Radio = () => {

    return (
        <FormComponent name="Radio Input" type="radio">
            <h3 className="text-black text-xl text-left ">Radio</h3>
            <input className="text-black" type="radio" id="html" name="fav_language" value="HTML"></input>
            <label className="text-black" for="html">HTML</label>
            <input className="text-black" type="radio" id="css" name="fav_language" value="CSS"></input>
            <label className="text-black" for="css">CSS</label>
            <input className="text-black" type="radio" id="javascript" name="fav_language" value="JavaScript"></input>
            <label className="text-black" for="javascript">JavaScript</label>
        </FormComponent>
    )
}

export default Radio
