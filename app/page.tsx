"use client";

import {useState} from "react";
import Link from "next/link";

export default function Home() {
    const availableSearchTypes = ["people", "movie"];

    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchType, setSearchType] = useState(availableSearchTypes[0]);
    const [searchText, setSearchText] = useState("");

    async function fetchData(searchType: typeof availableSearchTypes[number], searchText: string) {
        const collection = searchType === "people" ? "people" : "films";
        const property = searchType === "people" ? "name" : "title";
        const response = await fetch(`https://www.swapi.tech/api/${collection}/?${property}=${searchText}`);
        const data = await response.json();

        if (data.message !== "ok") {
            throw new Error(data.message);
        }

        return data.result;
    }

    async function search() {
        if (searching) return;
        try {
            setSearching(true);
            const results = await fetchData(searchType, searchText);
            setResults(results);
        } finally {
            setSearching(false);
        }
    }

    return (
        <>
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
                    className="bg-green-600 text-white font-bold uppercase h-8 rounded-full cursor-pointer disabled:bg-gray-300 flex items-center justify-center"
                    onClick={search} disabled={searchText.length === 0}>
                    {searching ? "Searching..." : "Search"}
                </button>
            </div>
            <div
                className="flex flex-col bg-white p-4 rounded-lg border border-gray-300 min-w-lg shadow-md">
                <div className="font-semibold border-b border-gray-300 pb-2">Results</div>
                {results.length > 0 && !searching
                    ? (
                        <div className="h-100 overflow-y-auto">
                            {results.map((r) => (
                                <div key={r.uid}
                                     className="flex gap-4 items-center justify-between h-12 border-b border-gray-300">
                                    <div className="font-semibold">{r.properties.name || r.properties.title}</div>
                                    <Link href={`/${searchType}/${r.uid}`}
                                          className="bg-green-600 px-4 text-white font-bold uppercase h-8 rounded-full cursor-pointer disabled:bg-gray-300 flex items-center justify-center">
                                        See details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )
                    : (
                        <div className="text-gray-400 text-center flex items-center justify-center h-100">
                            {searching
                                ? <>Searching...</>
                                : <>There are zero matches.<br/>Use the form to search for People or Movies.</>
                            }
                        </div>
                    )}
            </div>
        </>
    );
}
