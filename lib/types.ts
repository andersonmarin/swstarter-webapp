export type Resource<T> = {
    uid: string
    properties: T
}

export type People = {
    name: string
    birth_year: string
    gender: string
    eye_color: string
    hair_color: string
    height: string
    mass: string
    films: string[]
}

export type Film = {
    title: string
    characters: string[]
    opening_crawl: string
}

export type Collections = {
    people: People,
    films: Film
}

export type Collection = keyof Collections