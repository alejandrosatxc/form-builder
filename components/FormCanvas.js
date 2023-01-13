import { useDrop } from 'react-dnd'
import { ItemTypes } from './FormComponents/Constants'
import { useContext, useCallback } from 'react'
import { FormBuilderContext } from './FormBuilder'
import FormComponent from './FormComponents/FormComponent'
import update from 'immutability-helper'

const style = {
  height: '100%',
  width: '100%',
  borderRadius: '4px',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

const FormCanvas = () => {

  const [formComponents, setFormComponents] = useContext(FormBuilderContext)
  const generateId = () => {
    const len = 10;
    var id = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charslen = chars.length
    for (var i = 0; i < len; i++) {
      id += chars.charAt(Math.floor(Math.random() * charslen))
    }

    return id
  }

  const moveComponent = useCallback((dragIndex, hoverIndex) => {
    setFormComponents((formComponents) =>
      update(formComponents, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, formComponents[dragIndex]],
        ],
      }),
    )
  }, [])

  const addItem = (item) => {
    setFormComponents(item)
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({

    accept: ItemTypes.INPUT,
    drop: (item, monitor) => {

      if (item.id === 'form-component') {
        var id = generateId()

        //Create a new object to represent the dropped component
        const newComponent = { id: id, name: item.name, type: item.type }
        addItem((formComponents) => [...formComponents, newComponent]) //Set formComponents array to include what it did before, and new item
        return { name: 'Dustbin' } //Return this object to the dropped component.
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  )

  const isActive = canDrop && isOver
  let backgroundColor = '#FFFFFF'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      <ul>
        {formComponents.map((component, i) => {
          return <FormComponent key={component.id} index={i} name={component.name} type={component.type} id={component.id} moveComponent={moveComponent} />
        })}
      </ul>
    </div>
  )
}

export default FormCanvas