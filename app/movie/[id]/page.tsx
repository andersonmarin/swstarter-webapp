import Link from "next/link";
import {getFromSWAPIByUID, getFromSWAPIByURI} from "@/lib/swapi";

async function Page({params}: { params: Promise<{ id: string }> }) {
    const film = await getFromSWAPIByUID("films", (await params).id);

    const characters = await Promise.all(film.properties.characters.map(uri => getFromSWAPIByURI<"people">(uri)));

    return (
        <div
            className="flex flex-col gap-5 bg-white p-4 rounded-lg border border-gray-300 w-2xl shadow-md">
            <div className="font-semibold">{film.properties.title}</div>
            <div className="flex flex-row gap-10 flex-1">
                <div className="flex-1">
                    <div className="font-semibold border-b border-gray-300 pb-2">Opening Crawl</div>
                    <div className="py-2 overflow-y-auto h-100">
                        {film.properties.opening_crawl}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="font-semibold border-b border-gray-300 pb-2">Characters</div>
                    <div className="py-2 flex flex-col gap-1 overflow-y-auto h-100">
                        {characters.map(p => (
                            <Link key={p.uid}
                                  href={`/people/${p.uid}`}
                                  className="text-blue-700 underline">{p.properties.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <Link href="/"
                      className="bg-green-600 px-8 text-white font-bold uppercase h-8 rounded-full cursor-pointer disabled:bg-gray-300 inline-flex items-center justify-center">
                    Back to search
                </Link>
            </div>
        </div>
    );
}

export default Page;