const Radio = ({ id }) => {

    return (
        <>
            <div className="flex flex-row flex-wrap">
                <input className="text-black" type="radio" id={id + '-html'} name="fav_language" value="HTML"></input>
                <label className="text-black ml-2 mr-4" htmlFor={id + '-html'}>HTML</label>
                <input className="text-black" type="radio" id={id + '-css'} name="fav_language" value="CSS"></input>
                <label className="text-black ml-2 mr-4" htmlFor={id + '-css'}>CSS</label>
                <input className="text-black" type="radio" id={id + '-javascript'} name="fav_language" value="JavaScript"></input>
                <label className="text-black ml-2 mr-4" htmlFor={id + '-javascript'}>JavaScript</label>
            </div>
        </>
    )
}

export default Radio
