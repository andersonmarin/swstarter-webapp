export default function Home() {
    return (
        <div className="flex justify-center items-start h-screen bg-gray-100 p-8 gap-8">
            <div className="flex flex-col gap-5 bg-white p-4 rounded-lg border border-gray-300 min-w-xs shadow-md">
                <div>What are you searching for?</div>
                <div className="flex gap-4">
                    <label className="flex gap-1 items-center">
                        <input type="radio" name="searchType" value="people"/>
                        <span className="font-semibold">People</span>
                    </label>
                    <label className="flex gap-1 items-center">
                        <input type="radio" name="searchType" value="movie"/>
                        <span className="font-semibold">Movie</span>
                    </label>
                </div>
                <input className="h-8 px-2 border border-gray-300 rounded" type="text"
                       placeholder="e.g. Chewbacca, Yoda, Boba Fett"/>
                <button className="bg-green-600 text-white font-bold uppercase h-8 rounded-full">Search</button>
            </div>
            <div
                className="flex flex-col gap-5 bg-white p-4 rounded-lg border border-gray-300 min-w-lg shadow-md">
                <div className="font-semibold border-b border-gray-300 pb-2">Results</div>
                <div className="text-gray-400 text-center flex items-center justify-center min-h-100">
                    There are zero matches.<br/>Use the form to search for People or Movies.
                </div>
            </div>
        </div>
    );
}
