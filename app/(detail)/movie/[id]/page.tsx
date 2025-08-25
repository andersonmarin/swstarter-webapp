import Link from "next/link";
import {getFromSWAPIByUID, getFromSWAPIByURI} from "@/lib/swapi";
import DetailCard from "@/app/(detail)/_components/DetailCard";
import DetailCardCol from "@/app/(detail)/_components/DetailCardCol";

async function Page({params}: { params: Promise<{ id: string }> }) {
    const film = await getFromSWAPIByUID("films", (await params).id);

    const characters = await Promise.all(film.properties.characters.map(uri => getFromSWAPIByURI<"people">(uri)));

    return (
        <DetailCard title={film.properties.title}>
            <DetailCardCol title="Opening Crawl">
                {film.properties.opening_crawl}
            </DetailCardCol>
            <DetailCardCol title="Characters">
                {characters.map(p => (
                    <Link key={p.uid}
                          href={`/people/${p.uid}`}
                          className="text-blue-700 underline">{p.properties.name}</Link>
                ))}
            </DetailCardCol>
        </DetailCard>
    );
}

export default Page;