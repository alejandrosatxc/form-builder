import TextInput from "./TextInput"

const Name = ({ title, id }) => {

    return (
        <>
            <h3 className="text-black text-xl mb-2">{title}</h3>
            <div className="flex flex-row">
                <TextInput id={id} label="First"/>
                <TextInput id={id} label="Middle" />
                <TextInput id={id} label="Last" />
            </div>
        </>
    )
}

export default Name