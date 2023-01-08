const Checkboxes = ({ id }) => {

    return (
        <>
            <div className="flex flex-row">
                <input className="text-black" type="checkbox" id={id + '-c_html'} name="fav_language" value="HTML"></input>
                <label className="text-black ml-2 mr-4" htmlFor={id + '-c_html'}>HTML</label>
                <input className="text-black" type="checkbox" id={id + '-c_css'} name="fav_language" value="CSS"></input>
                <label className="text-black ml-2 mr-4" htmlFor={id + "-c_css"}>CSS</label>
                <input className="text-black" type="checkbox" id={id + '-c_javascript'} name="fav_language" value="JavaScript"></input>
                <label className="text-black ml-2 mr-4" htmlFor={id + '-c_javascript'}>JavaScript</label>
            </div>

        </>
    )
}

export default Checkboxes