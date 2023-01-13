import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ItemTypes } from './Constants'
import { useDrag, useDrop } from 'react-dnd'
import { useRef } from 'react'

const CondensedComponent = ({ type, name, icon, label }) => {
    const ref = useRef()
    const id = 'form-component'
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.INPUT,
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item, monitor) {
          if (!ref.current) {
            return
          }

          const dragIndex = item.index
          const hoverIndex = 0
          // Don't replace items with themselves
          if (dragIndex === hoverIndex) {
            return
          }
          // Determine rectangle on screen
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          // Get vertical middle
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          // Determine mouse position
          const clientOffset = monitor.getClientOffset()
          // Get pixels to the top
          const hoverClientY = clientOffset.y - hoverBoundingRect.top
          // Only perform the move when the mouse has crossed half of the items height
          // When dragging downwards, only move when the cursor is below 50%
          // When dragging upwards, only move when the cursor is above 50%
          // Dragging downwards
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
          }
          // Dragging upwards
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
          }
          // Time to actually perform the action
          //moveComponent(dragIndex, hoverIndex)
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          item.index = hoverIndex
        },
      })
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.INPUT,
        item: () => {
            return { type, name, id }
          },
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
    drag(drop(ref))

    return (
        <div className="flex flex-row bg-slate-500 group hover:bg-primary hover:cursor-pointer transition-colors ease-in-out duration-300 h-16 border-b-2 border-slate-800"
            ref={ref}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
            data-handler-id={handlerId}
        >
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