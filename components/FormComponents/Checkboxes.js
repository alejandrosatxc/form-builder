const Checkboxes = ({id}) => {

    return (
        <>
            <h3 className="text-black text-xl text-left ">Checkboxes</h3>
            <input className="text-black" type="checkbox" id={id + '-c_html'} name="fav_language" value="HTML"></input>
            <label className="text-black" htmlFor={id + '-c_html'}>HTML</label>
            <input className="text-black" type="checkbox" id={id + '-c_css'} name="fav_language" value="CSS"></input>
            <label className="text-black" htmlFor={id + "-c_css"}>CSS</label>
            <input className="text-black" type="checkbox" id={id + '-c_javascript'} name="fav_language" value="JavaScript"></input>
            <label className="text-black" htmlFor={id + '-c_javascript'}>JavaScript</label>
        </>
    )
}

export default Checkboxes