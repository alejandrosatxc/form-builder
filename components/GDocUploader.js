const GDocUploader = () => {

    return (
        <div className="col-span-3 flex flex-col justify-center items-center bg-white rounded-xl shadow-xl h-1/2 w-3/4">
            <label className="h-8 mx-auto" for="url">Enter an Google Doc URL:</label>
            <input className="border-2 my-4 mx-auto" type="url" name="url" id="url"
                placeholder="https://example.com"
                pattern="https://.*" size="30"
                required>    
            </input>
            <button className="transition ease-in-out delay-150 bg-blue-300 hover:bg-blue-600 hover:shadow-xl hover:shadow-cyan-200 h-8 w-16 mx-auto rounded-lg" type="submit">
                Submit
            </button>
        </div>
    )
}

export default GDocUploader