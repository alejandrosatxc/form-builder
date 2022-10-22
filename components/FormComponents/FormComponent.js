import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'
import { useId } from 'react'

const FormComponent = ({ name, type, id, children }) => {
    
    if(!id) {const id = useId()}

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
        <div
            className="bg-white h-auto2 w-auto my-2 border-2 rounded-xl p-2"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
            id={id}
        >
            {children}
        </div>
    )
}

export default FormComponent