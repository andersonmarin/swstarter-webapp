import Link from "next/link";
import {getFromSWAPIByUID, getFromSWAPIByURI} from "@/lib/swapi";

async function Page({params}: { params: Promise<{ id: string }> }) {
    const people = await getFromSWAPIByUID("people", (await params).id);

    const films = await Promise.all(people.properties.films.map(uri => getFromSWAPIByURI<"films">(uri)));

    return (
        <div
            className="flex flex-col gap-5 bg-white p-4 rounded-lg border border-gray-300 w-2xl shadow-md">
            <div className="font-semibold">{people.properties.name}</div>
            <div className="flex flex-row gap-10 flex-1">
                <div className="flex-1">
                    <div className="font-semibold border-b border-gray-300 pb-2">Details</div>
                    <div className="py-2 h-100">
                        <div>Birth Year: {people.properties.birth_year}</div>
                        <div>Gender: {people.properties.gender}</div>
                        <div>Eye Color: {people.properties.eye_color}</div>
                        <div>Hair Color: {people.properties.hair_color}</div>
                        <div>Height: {people.properties.height}</div>
                        <div>Mass: {people.properties.mass}</div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="font-semibold border-b border-gray-300 pb-2">Movies</div>
                    <div className="py-2 h-100 overflow-y-auto flex flex-col gap-1">
                        {films.map(film => (
                            <Link key={film.uid}
                                  href={`/movie/${film.uid}`}
                                  className="text-blue-700 underline">{film.properties.title}</Link>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <Link href="/public"
                      className="bg-green-600 px-8 text-white font-bold uppercase h-8 rounded-full cursor-pointer disabled:bg-gray-300 inline-flex items-center justify-center">
                    Back to search
                </Link>
            </div>
        </div>
    );
}

export default Page;