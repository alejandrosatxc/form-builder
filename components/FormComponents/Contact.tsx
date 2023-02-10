import TextInput from "./TextInput"

const Contact = ({ id }) => {

    return (
        <>
            <div className="flex flex-row flex-wrap">
                <TextInput id={id} label="Email" />
                <TextInput id={id} label="Phone" />
            </div>
        </>
    )
}

export default Contact