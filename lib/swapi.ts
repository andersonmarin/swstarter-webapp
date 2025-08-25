"use server";

import {Collections, Resource} from "@/lib/types";

const BASE_URL = "https://www.swapi.tech/api";

export async function getFromSWAPIByUID<K extends keyof Collections>(collection: K, uid: string): Promise<Resource<Collections[K]>> {
    return fetchFromSWAPI(`${BASE_URL}/${collection}/${uid}`);
}

export async function getFromSWAPIByURI<K extends keyof Collections>(uri: string): Promise<Resource<Collections[K]>> {
    return fetchFromSWAPI(uri);
}

async function fetchFromSWAPI<T>(uri: string): Promise<T> {
    const response = await fetch(uri, {cache: "force-cache"});
    const data = await response.json();

    if (data.message !== "ok") {
        throw new Error(data.message);
    }

    return data.result || data.results;
}

const searchProperties: Readonly<Record<keyof Collections, string>> = {
    people: "name",
    films: "title",
};

export async function searchFromSWAPI<K extends keyof Collections>(collection: K, search: string): Promise<Resource<Collections[K]>[]> {
    const property = searchProperties[collection];
    return fetchFromSWAPI(`https://www.swapi.tech/api/${collection}/?${property}=${search}`);
}