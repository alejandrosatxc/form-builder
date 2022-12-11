import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'

const CondensedComponent = ({ type, name, icon, label }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.INPUT,
        item: { type, name },
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
        <div className="flex flex-row bg-slate-500 w-[300px] h-16 border-b-2 border-slate-600"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}>
            <div className="flex bg-slate-400 h-full w-12 justify-center place-items-center">
                <FontAwesomeIcon icon={icon} size="xl" />
            </div>
            <div className='flex bg-slate-500 h-full justify-center place-items-center'>
                <h3 className="text-black text-xl ml-4">{label}</h3>
            </div>
        </div>
    )
}

export default CondensedComponent