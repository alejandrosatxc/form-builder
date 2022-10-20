import Dustbin from '../components/Dustbin'
import Trashcan from './Trashcan'

const FormBuilder = () => {
        
    return (
        <div className="col-span-2 flex flex-col bg-white rounded-xl shadow-xl h-full w-full p-6">
            <h1 className="text-6xl text-center border-b-2 my-2">Form Builder</h1>
            <Dustbin/>
            <Trashcan />
        </div>
    )
}

export default FormBuilder