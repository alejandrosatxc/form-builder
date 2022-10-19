import GDocUploader from '../components/GDocUploader'

const Upload = () => {
    return (
        <div className="grid grid-cols-3 gap-x-6 h-screen place-items-center bg-gray-400">
            <GDocUploader />
        </div>
    )
}

export default Upload