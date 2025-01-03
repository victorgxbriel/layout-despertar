import { Injectable, signal } from "@angular/core";
import { District, DistrictDetails } from "../../core/types/types";
import { MapAPIService } from "../../core/services/map-api.service";

@Injectable({
    providedIn: 'root'
})
export class CardInformationService {
    information = signal<District>({
        district: '',
        details: {
            title: '',
            description: '',
            population: 0,
            rate: 0,
        }
    })

    constructor(private api: MapAPIService) {
        this.load()
    }

    async load(){
        this.information.set( await this.api.getDetailsInformation('BRASIL') )
    }

    async reload(mapCode: string) {
        this.information.set( await this.api.getDetailsInformation(mapCode.toLowerCase()))
    }
}