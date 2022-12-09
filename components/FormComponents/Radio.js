const Radio = ({id}) => {

    return (
        <>
            <h3 className="text-black text-xl">Radio</h3>
            <label className="text-black" htmlFor={id + '-html'}>HTML</label>
            <input className="text-black" type="radio" id={id + '-html'} name="fav_language" value="HTML"></input>
            <label className="text-black" htmlFor={id + '-css'}>CSS</label>
            <input className="text-black" type="radio" id={id + '-css'} name="fav_language" value="CSS"></input>
            <label className="text-black" htmlFor={id + '-javascript'}>JavaScript</label>
            <input className="text-black" type="radio" id={id + '-javascript'} name="fav_language" value="JavaScript"></input>
        </>
    )
}

export default Radio
