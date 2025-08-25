"use client";

import {useState} from "react";
import Link from "next/link";
import {searchFromSWAPI} from "@/lib/swapi";
import {Collection} from "@/lib/types";

export default function Home() {
    const availableSearchTypes: Record<string, Collection> = {
        "people": "people",
        "movie": "films",
    };

    const searchTypePlaceholder: Record<string, string> = {
        "people": "e.g. Chewbacca, Yoda, Boba Fett",
        "movie": "e.g. Attack of the Clones, The Empire Strikes Back",
    };

    const [results, setResults] = useState<{ uid: string, properties: { name?: string, title?: string } }[]>([]);
    const [searching, setSearching] = useState(false);
    const [searchType, setSearchType] = useState<keyof typeof availableSearchTypes>("people");
    const [latestSearchType, setLatestSearchType] = useState<typeof searchType>(searchType);
    const [searchText, setSearchText] = useState("");

    async function search() {
        if (searching) return;
        try {
            setSearching(true);
            const results = await searchFromSWAPI(availableSearchTypes[searchType], searchText);
            setResults(results);
            setLatestSearchType(searchType);
        } finally {
            setSearching(false);
        }
    }

    return (
        <>
            <div className="flex flex-col gap-5 bg-white p-4 rounded-lg border border-gray-300 min-w-xs shadow-md">
                <div>What are you searching for?</div>
                <div className="flex gap-4">
                    {Object.keys(availableSearchTypes).map((name) => (
                        <label key={name} className="flex gap-1 items-center">
                            <input type="radio" name="searchType" value={name}
                                   checked={searchType === name} onChange={() => setSearchType(name)}/>
                            <span className="font-semibold capitalize">{name}</span>
                        </label>
                    ))}
                </div>
                <input className="h-8 px-2 border border-gray-300 rounded" type="text"
                       placeholder={searchTypePlaceholder[searchType]}
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
                                    <Link href={`/${latestSearchType}/${r.uid}`}
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
