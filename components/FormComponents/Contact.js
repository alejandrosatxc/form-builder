import TextInput from "./TextInput"

const Contact = ({ id }) => {

    return (
        <>
            <h3 className="text-black text-xl">Contact</h3>
            <div className="flex flex-row">
                <TextInput id={id} label="Email" />
                <TextInput id={id} label="Phone" />
                {/* <label className="text-black mr-4" htmlFor={id + '-email'}>Email</label>
                <input className="text-black mr-4 bg-slate-100 rounded shadow-well" id={id + '-email'} type="text"></input>
                <label className="text-black mr-4" htmlFor={id + '-phone'}>Phone</label>
                <input className="text-black mr-4 bg-slate-100 rounded shadow-well" id={id + '-phone'} type="text"></input> */}
            </div>
        </>
    )
}

export default Contact