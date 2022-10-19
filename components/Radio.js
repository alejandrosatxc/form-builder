import FormComponent from "./FormComponent"
const Radio = () => {

    return (
        <FormComponent name="Radio Input">
            <h3 className="text-xl text-left ">Radio</h3>
            <input type="radio" id="html" name="fav_language" value="HTML"></input>
            <label for="html">HTML</label>
            <input type="radio" id="css" name="fav_language" value="CSS"></input>
            <label for="css">CSS</label>
            <input type="radio" id="javascript" name="fav_language" value="JavaScript"></input>
            <label for="javascript">JavaScript</label>
        </FormComponent>
    )
}

export default Radio