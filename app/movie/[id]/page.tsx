import Link from "next/link";

async function Page({params}: { params: Promise<{ id: string }> }) {
    const film = await (await fetch(`https://www.swapi.tech/api/films/${(await params).id}`)).json();

    const characters = [];
    for (const uri of film.result.properties.characters) {
        characters.push(await (await fetch(uri, {cache: "force-cache"})).json());
        console.log("get", uri);
    }

    console.log(characters);

    return (
        <div
            className="flex flex-col gap-5 bg-white p-4 rounded-lg border border-gray-300 w-2xl shadow-md">
            <div className="font-semibold">{film.result.properties.title}</div>
            <div className="flex flex-row gap-10 flex-1">
                <div className="flex-1">
                    <div className="font-semibold border-b border-gray-300 pb-2">Opening Crawl</div>
                    <div className="py-2 overflow-y-auto h-100">
                        {film.result.properties.opening_crawl}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="font-semibold border-b border-gray-300 pb-2">Characters</div>
                    <div className="py-2 flex flex-col gap-1 overflow-y-auto h-100">
                        {characters.map(film => (
                            <Link key={film.result.uid}
                                  href={`/people/${film.result.uid}`}
                                  className="text-blue-700 underline">{film.result.properties.name}</Link>
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