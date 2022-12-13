import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import { useId, useState } from 'react'
import Name from "./Name"
import Contact from "./Contact"
import Radio from "./Radio"
import Checkboxes from "./Checkboxes"

const FormComponent = ({ name, type, id}) => {

    var component;

    switch (type) {
        case 'name':  component = <Name title={name} type={type}/>; break;
        case 'contact': component = <Contact name={name} type={type}/>; break;
        case 'checkbox': component = <Checkboxes name={name} type={type}/>; break;
        case 'radio': component = <Radio name={name} type={type}/>; break;
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
            className="flex flex-col justify-left bg-white border border-white h-auto w-auto my-2 rounded-lg transition ease-in-out duration-500 hover:shadow-xl hover:border-slate-300 p-4"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
        >
            <div className="bg-slate-500 rounded-full w-fit p-[4px] text-sm">
                {id}
            </div>
            <div className="flex flex-col justify-left place-items-start w-auto">{component}</div>
        </li>
    )
}

export default FormComponent