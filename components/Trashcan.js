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
const Trashcan = ({formComponents, setFormComponents}) => {
    //TODO solve item removal
    const removeItem = (item) => {
      const array = [...formComponents]
      for(var i = 0; i < array.length; i++) {
        if(array[i].type === item.type) {
          array.splice(i, 1)
        }
      }
      setFormComponents(array)
    }

    const [{ canDrop, isOver }, drop] = useDrop(() => ({

        accept: ItemTypes.INPUT,
        drop: (item, monitor) => {
          removeItem(item)
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