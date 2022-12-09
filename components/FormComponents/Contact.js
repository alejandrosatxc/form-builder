const Contact = ({id}) => {

    return (
        <>
            <h3 className="text-black text-xl">Contact</h3>
            <label className="text-black " htmlFor={id + '-email'}>Email:</label>
            <input className="text-black bg-slate-100 rounded shadow-well" id={id + '-email'} type="text"></input>
            <label className="text-black " htmlFor={id + '-phone'}>Phone:</label>
            <input className="text-black bg-slate-100 rounded shadow-well" id={id + '-phone'} type="text"></input>
        </>
    )
}

export default Contact