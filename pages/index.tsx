import GDocUploader from '../components/GDocUploader'

const Upload = () => {

    return (
        <>
            <div className="relative flex flex-col bg-[url('/hero.jpg')] bg-bottom bg-cover justify-center place-items-center h-80 w-full">
                <h1 className='text-white text-5xl sm:text-6xl mb-4 mx-4'>DraftMe away. To the future.</h1>
                <div className="absolute top-56 mx-4" >
                    <GDocUploader />
                </div>
            </div>
            <div className='w-full h-96 shadow-inner bg-slate-800'>

            </div>
        </>
    )
}

export default Upload