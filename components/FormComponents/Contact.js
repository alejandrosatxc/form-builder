import TextInput from "./TextInput"

const Contact = ({ id }) => {

    return (
        <>
            <div className="flex flex-row">
                <TextInput id={id} label="Email" />
                <TextInput id={id} label="Phone" />
            </div>
        </>
    )
}

export default Contact