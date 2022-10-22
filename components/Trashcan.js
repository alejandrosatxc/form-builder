import { useDrop } from 'react-dnd'
import { ItemTypes } from './FormComponents/Constants'
const style = {
  // height: '90%',
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
const Trashcan = ({ formComponents, setFormComponents }) => {
  
  const removeItem = (item) => {
    setFormComponents(item)
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({

    accept: ItemTypes.INPUT,
    drop: (item, monitor) => {
      removeItem(formComponents => formComponents.filter(component => component.id !== item.id))
      return { name: 'Trashcan' }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div className="mt-auto" ref={drop} style={{ ...style, backgroundColor }} data-testid="trashcan">
      {isActive ? 'Release to drop' : 'Drag a box here'}
      <h3 className="text-center">Trash</h3>
    </div>
  )
}

export default Trashcan