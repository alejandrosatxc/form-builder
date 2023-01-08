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
        <div className="flex flex-row bg-slate-500 group hover:bg-primary hover:cursor-pointer transition-colors ease-in-out duration-300 h-16 border-b-2 border-slate-800"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}>
            <div className="flex bg-slate-700 group-hover:bg-violet-500 transition-colors ease-in-out duration-300 h-full w-16 justify-center place-items-center">
                <FontAwesomeIcon className="text-white" icon={icon} size="xl" />
            </div>
            <div className='flex h-full justify-center place-items-center'>
                <h3 className="text-white text-xl ml-4">{label}</h3>
            </div>
        </div>
    )
}

export default CondensedComponent