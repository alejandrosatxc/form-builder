const Name = ({title, id}) => {

    return (
        <>
            <h3 className="text-black text-xl">Name</h3>
            <label className="text-black" htmlFor={id + '-firstName'} >First:</label>
            <input className="text-black bg-slate-100 rounded shadow-well" id={id + '-firstName'} type="text"></input>
            <label className="text-black"htmlFor={id + '-lastName'}>Last:</label>
            <input className="text-black bg-slate-100 rounded shadow-well" id={id + '-lastName'} type="text"></input>
        </>
    )
}

export default Name