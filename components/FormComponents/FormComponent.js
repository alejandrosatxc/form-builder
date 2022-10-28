import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import { useId } from 'react'
import Name from "./Name"
import Contact from "./Contact"
import Radio from "./Radio"
import Checkboxes from "./Checkboxes"

const FormComponent = ({ name, type, id, myKey}) => {

    var component;

    switch (type) {
        case 'name':  component = <Name name={name} type={type} id={id}/>; break;
        case 'contact': component = <Contact name={name} type={type} id={id}/>; break;
        case 'checkbox': component = <Checkboxes name={name} type={type} id={id}/>; break;
        case 'radio': component = <Radio name={name} type={type} id={id}/>; break;
        default: break;
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.INPUT,
        item: { name, type, id },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            // if (item && dropResult) {
            //     alert(`You dropped ${item.name} into ${dropResult.name}!`)
            // }
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <li
            className="bg-white h-auto w-auto my-2 border-2 rounded-xl p-2"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
            id={id}
            // key = {myKey}
        >
            <span className="text-black">{id + ' ' + myKey}</span>
            {component}
        </li>
    )
}

export default FormComponent