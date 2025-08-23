import Link from "next/link";

async function Page({params}: { params: Promise<{ id: string }> }) {
    const people = await (await fetch(`https://www.swapi.tech/api/people/${(await params).id}`)).json();

    const films = [];
    for (const uri of people.result.properties.films) {
        films.push(await (await fetch(uri)).json());
    }

    console.log(films);

    return (
        <div
            className="flex flex-col gap-5 bg-white p-4 rounded-lg border border-gray-300 min-w-2xl shadow-md h-100">
            <div className="font-semibold">{people.result.properties.name}</div>
            <div className="flex flex-row gap-10 flex-1">
                <div className="flex-1">
                    <div className="font-semibold border-b border-gray-300 pb-2">Details</div>
                    <div className="py-2">
                        <div>Birth Year: {people.result.properties.birth_year}</div>
                        <div>Gender: {people.result.properties.gender}</div>
                        <div>Eye Color: {people.result.properties.eye_color}</div>
                        <div>Hair Color: {people.result.properties.hair_color}</div>
                        <div>Height: {people.result.properties.height}</div>
                        <div>Mass: {people.result.properties.mass}</div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="font-semibold border-b border-gray-300 pb-2">Movies</div>
                    <div className="py-2">
                        {films.map(film => (
                            <Link key={film.result.uid}
                                  href={`/movies/${film.result.uid}`}
                                  className="text-blue-700 underline">{film.result.properties.title}</Link>
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