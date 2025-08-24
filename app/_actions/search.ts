"use server";

const searchTypes = {
    "movie": {
        "collection": "films",
        "property": "title",
    },
    "people": {
        "collection": "people",
        "property": "name",
    },
};

export async function searchPeopleAndMovie(searchType: keyof typeof searchTypes, searchText: string) {
    const {collection, property} = searchTypes[searchType];
    const response = await fetch(`https://www.swapi.tech/api/${collection}/?${property}=${searchText}`);
    const data = await response.json();

    if (data.message !== "ok") {
        throw new Error(data.message);
    }

    return data.result;
}