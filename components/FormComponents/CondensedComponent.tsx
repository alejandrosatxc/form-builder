import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ItemTypes } from './Constants'
import { useDrag, useDrop } from 'react-dnd'
import { useRef, useContext, useCallback } from 'react'
import { FormBuilderContext } from '../FormBuilder'
import update from 'immutability-helper'

const CondensedComponent = ({ type, name, icon, label }) => {

  //const [formComponents, setFormComponents] = useContext(FormBuilderContext)

  const ref = useRef()
  const id = 'form-component'
  const index = 0

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.INPUT,
    item: () => {
      return { type, name, id, index }
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
  drag(ref)

  return (
    <div className="flex flex-row bg-slate-500 group hover:bg-primary hover:cursor-pointer transition-colors ease-in-out duration-300 h-16 border-b-2 border-slate-800"
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1
      }}
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