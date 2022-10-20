import { useDrop } from 'react-dnd'
import { ItemTypes } from './Constants'
import Name from './Name'
import Contact from './Contact'
import Checkboxes from './Checkboxes'
import Radio from './Radio'
const style = {
  height: '75%',
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

const Dustbin = ({ items }) => {

  const form = [
    {
      type: "name"
    },
    {
      type: "contact"
    },
    {
      type: "checkbox"
    },
    {
      type: "radio"
    }
  ]


  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.INPUT,
    drop: () => ({ name: 'Dustbin' }),
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
        {form.map((field) => {
          switch(field.type) {
            case 'name'     : return <Name />       ;
            case 'contact'  : return <Contact />    ;
            case 'checkbox' : return <Checkboxes /> ;
            case 'radio'    : return <Radio />      ;
            default:
              break;
          }
        })}
      </div>
    </div>
  )
}

export default Dustbin