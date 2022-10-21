import { useDrop } from 'react-dnd'
import { ItemTypes } from './FormComponents/Constants'
import Name from './FormComponents/Name'
import Contact from './FormComponents/Contact'
import Checkboxes from './FormComponents/Checkboxes'
import Radio from './FormComponents/Radio'

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

  const addItem = (item) => {
    setFormComponents(item)
  }

  const [{ canDrop, isOver }, drop] = useDrop(() => ({

    accept: ItemTypes.INPUT,
    drop: (item, monitor) => {
      addItem(formComponents => [...formComponents, item]) //Set formComponents array to include what it did before, and new item
      return { name: 'Dustbin' }
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
          switch (component.type) {
            case 'name': return <Name />;
            case 'contact': return <Contact />;
            case 'checkbox': return <Checkboxes />;
            case 'radio': return <Radio />;
            default: break;
          }
        })}
      </div>
    </div>
  )
}

export default Dustbin