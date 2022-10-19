import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'

const FormComponent = ({ name, children }) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.INPUT,
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
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
        >
            {children}
        </div>
    )
}

export default FormComponent