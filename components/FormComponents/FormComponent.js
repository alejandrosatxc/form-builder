import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import { useContext, useId, useState } from 'react'
import { FormBuilderContext } from '../FormBuilder'
import Name from "./Name"
import Contact from "./Contact"
import Radio from "./Radio"
import Checkboxes from "./Checkboxes"

const FormComponent = ({ name, type, id }) => {

    const [title, setTitle] = useState(name)
    const [formComponents, setFormComponents] = useContext(FormBuilderContext)

    var component;

    switch (type) {
        case 'name': component = <Name title={name} type={type} />; break;
        case 'contact': component = <Contact name={name} type={type} />; break;
        case 'checkbox': component = <Checkboxes name={name} type={type} />; break;
        case 'radio': component = <Radio name={name} type={type} />; break;
        default: break;
    }

    const removeItem = (item) => {
        setFormComponents(item)
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
            className="flex flex-col justify-left bg-white border border-white h-auto w-auto my-2 rounded-lg transition ease-in-out duration-500 hover:shadow-xl group hover:border-slate-300 p-4"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
        >
            <button onClick={() => {removeItem(formComponents => formComponents.filter(component => component.id !== id))}} className="text-red-500 bg-red-800 rounded-full w-4 absolute self-end invisible group-hover:visible">X</button>
            <div className="bg-slate-500 rounded-full w-fit p-[4px] text-sm text-white">
                {id}
            </div>
            <input type="text" id={id} value={title} onChange={e => setTitle(e.target.value)} className="w-full text-black text-xl focus:outline-none" ></input>
            <div className="flex flex-col justify-left place-items-start w-auto">{component}</div>
        </li>
    )
}

export default FormComponent