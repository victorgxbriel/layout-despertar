
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