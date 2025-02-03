
export interface DistrictDetails {
    title: string,
    description: string,
    population: number,
    rate: number
}

export interface District {
    district: string,
    details: DistrictDetails,
}

export interface NewsCard {
    title: string,
    description: string,
    tags: string[],
    imageUrl: string
}