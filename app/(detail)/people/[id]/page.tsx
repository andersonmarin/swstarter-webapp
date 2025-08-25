import Link from "next/link";
import {getFromSWAPIByUID, getFromSWAPIByURI} from "@/lib/swapi";
import DetailCard from "@/app/(detail)/_components/DetailCard";
import DetailCardCol from "@/app/(detail)/_components/DetailCardCol";

async function Page({params}: { params: Promise<{ id: string }> }) {
    const people = await getFromSWAPIByUID("people", (await params).id);

    const films = await Promise.all(people.properties.films.map(uri => getFromSWAPIByURI<"films">(uri)));

    return (
        <DetailCard title={people.properties.name}>
            <DetailCardCol title="Details">
                <div>Birth Year: {people.properties.birth_year}</div>
                <div>Gender: {people.properties.gender}</div>
                <div>Eye Color: {people.properties.eye_color}</div>
                <div>Hair Color: {people.properties.hair_color}</div>
                <div>Height: {people.properties.height}</div>
                <div>Mass: {people.properties.mass}</div>
            </DetailCardCol>
            <DetailCardCol title="Movies">
                {films.map(film => (
                    <Link key={film.uid}
                          href={`/movie/${film.uid}`}
                          className="text-blue-700 underline">{film.properties.title}</Link>
                ))}

            </DetailCardCol>
        </DetailCard>
    );
}

export default Page;