const Name = ({ title, id }) => {

    return (
        <>
            <h3 className="text-black text-xl">Name</h3>
            <div className="flex flex-row">
                <label className="text-black mr-4" htmlFor={id + '-firstName'} >First</label>
                <input className="text-black mr-4 bg-slate-100 rounded shadow-well" id={id + '-firstName'} type="text"></input>
                <label className="text-black mr-4" htmlFor={id + '-lastName'}>Last</label>
                <input className="text-black mr-4 bg-slate-100 rounded shadow-well" id={id + '-lastName'} type="text"></input>
            </div>
        </>
    )
}

export default Name