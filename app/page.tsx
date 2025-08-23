"use client";

import {useState} from "react";

export default function Home() {
    const availableSearchTypes = ["people", "movie"];

    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState(availableSearchTypes[0]);
    const [searchText, setSearchText] = useState("");

    async function fetchData(searchType: typeof availableSearchTypes[number], searchText: string) {
        const response = await fetch(`https://www.swapi.tech/api/${searchType}/?name=${searchText}`);
        const data = await response.json();

        if (data.message !== "ok") {
            throw new Error(data.message);
        }

        return data.result;
    }

    async function search() {
        const results = await fetchData(searchType, searchText);
        setResults(results);
    }

    return (
        <div className="flex justify-center items-start h-screen bg-gray-100 p-8 gap-8">
            <div className="flex flex-col gap-5 bg-white p-4 rounded-lg border border-gray-300 min-w-xs shadow-md">
                <div>What are you searching for?</div>
                <div className="flex gap-4">
                    {availableSearchTypes.map((type) => (
                        <label key={type} className="flex gap-1 items-center">
                            <input type="radio" name="searchType" value={type}
                                   checked={searchType === type} onChange={() => setSearchType(type)}/>
                            <span className="font-semibold capitalize">{type}</span>
                        </label>
                    ))}
                </div>
                <input className="h-8 px-2 border border-gray-300 rounded" type="text"
                       placeholder="e.g. Chewbacca, Yoda, Boba Fett"
                       value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                <button
                    className="bg-green-600 text-white font-bold uppercase h-8 rounded-full cursor-pointer disabled:bg-gray-300"
                    onClick={search} disabled={searchText.length === 0}>
                    Search
                </button>
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
