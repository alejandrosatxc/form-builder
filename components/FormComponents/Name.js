import TextInput from "./TextInput"

const Name = ({ title, id }) => {

    return (
        <>
            <div className="flex flex-row">
                <TextInput id={id} label="First"/>
                <TextInput id={id} label="Middle" />
                <TextInput id={id} label="Last" />
            </div>
        </>
    )
}

export default Name