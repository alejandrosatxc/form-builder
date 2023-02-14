import { ItemTypes } from './Constants'
import { useDrag, useDrop } from 'react-dnd'
import { useContext, useId, useRef, useState } from 'react'
import { useFormBuilderContext } from '../../pages/formbuilder'
import Name from "./Name"
import Contact from "./Contact"
import Radio from "./Radio"
import Checkboxes from "./Checkboxes"

const FormComponent = ({ name, type, id, index, moveComponent}) => {

    const [title, setTitle] = useState(name)
    const {setFormComponents} = useFormBuilderContext()
    const ref = useRef(null)

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
          const hoverIndex = index
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
          moveComponent(dragIndex, hoverIndex)
          // Note: we're mutating the monitor item here!
          // Generally it's better to avoid mutations,
          // but it's good here for the sake of performance
          // to avoid expensive index searches.
          item.index = hoverIndex
        },
      })

      const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.INPUT,
        item: () => {
          return { name, id, index }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      })
      drag(drop(ref))

    // const [{ isDragging }, drag] = useDrag(() => ({
    //     type: ItemTypes.INPUT,
    //     item: { name, type, id },
    //     end: (item, monitor) => {
    //         const dropResult = monitor.getDropResult()
    //         // if (item && dropResult) {
    //         //     alert(`You dropped ${item.name} into ${dropResult.name}!`)
    //         // }
    //     },
    //     collect: monitor => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }))


    return (
        <li
            className="flex flex-col justify-left bg-white border border-white h-auto w-auto my-2 rounded-lg transition ease-in-out duration-500 hover:shadow-xl group hover:border-slate-300 p-4"
            ref={ref}
            data-handler-id={handlerId}
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
        >
            <button onClick={() => {removeItem(formComponents => formComponents.filter(component => component.id !== id))}} className="text-red-500 bg-red-800 rounded-full w-4 absolute self-end invisible group-hover:visible">X</button>
            {/* <div className="bg-slate-500 rounded-full w-fit p-[4px] text-sm text-white">
                {id}
            </div> */}
            <input type="text" id={id} value={title} onChange={e => setTitle(e.target.value)} className="w-full text-black text-xl focus:outline-none" ></input>
            <div className="flex flex-col justify-left place-items-start w-auto">{component}</div>
        </li>
    )
}

export default FormComponent