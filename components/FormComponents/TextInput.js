const TextInput = ({ id, label }) => {
    return (
        <div className="flex flex-col">
            <label className="text-black text-left" htmlFor={id + '-' + label} >{label}</label>
            <input className="text-black h-10 mr-4 border border-slate-300 rounded" id={id + '-' + label} type="text"></input>
        </div>
    )
}

export default TextInput