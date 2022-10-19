import FormComponent from "./FormComponent"
const Checkboxes = () => {

    return (
        <FormComponent name="Checkboxes Input">
            <h3 className="text-xl text-left ">Checkboxes</h3>
            <input type="checkbox" id="c_html" name="fav_language" value="HTML"></input>
            <label for="c_html">HTML</label>
            <input type="checkbox" id="c_css" name="fav_language" value="CSS"></input>
            <label for="c_css">CSS</label>
            <input type="checkbox" id="c_javascript" name="fav_language" value="JavaScript"></input>
            <label for="c_javascript">JavaScript</label>
        </FormComponent>
    )
}

export default Checkboxes