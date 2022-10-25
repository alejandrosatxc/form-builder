import { useDrop } from 'react-dnd'
import { ItemTypes } from './FormComponents/Constants'
import { useId } from 'react'
import FormComponent from './FormComponents/FormComponent'

const style = {
  height: '90%',
  width: '100%',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}

const Dustbin = ({ formComponents, setFormComponents }) => {

  // const id = useId()
  const generateId = () => {
    const len = 10;
    const id = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charslen = chars.length
    for(var i = 0; i < len; i++) {
      id += chars.charAt(Math.floor(Math.random() * charslen))
    }

    return id
  }

  const addItem = (item) => {
    setFormComponents(item)
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({

    accept: ItemTypes.INPUT,
    drop: (item, monitor) => {

      var id = generateId()
      
      //Create a new object to represent the dropped component
      const newComponent = {id : id, name: item.name, type: item.type}
      addItem((formComponents) => [...formComponents, newComponent]) //Set formComponents array to include what it did before, and new item
      return { name: 'Dustbin' } //Return this object to the dropped component.
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  )

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      {isActive ? 'Release to drop' : 'Drag a box here'}
      <div>
        {formComponents.map((component) => {
          return <FormComponent name={component.name} type={component.type} id={component.id}/>
        })}
      </div>
    </div>
  )
}

export default Dustbin