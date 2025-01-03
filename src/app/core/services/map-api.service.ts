import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { District } from "../types/types";

@Injectable({
    providedIn: 'root',
})
export class MapAPIService {

    private apiUrl = 'assets/data/complete/data.json'
    private cachedDistricts!: District[]
    private empty: District = {
        district: '',
        details: {
            title: '',
            description: '',
            population: 0,
            rate: 0
        }
    }

    http = inject(HttpClient)
    
    getDistricts(): Observable<District[]> {
        return this.http.get<District[]>(this.apiUrl)
    }

    getDistrictDetails(mapCode: string): Observable<District>{
        return new Observable((obs) => {
            this.getDistricts().subscribe((dis) => {
                const found = dis.find((d) => d.district === mapCode)
                obs.next(found)
                obs.complete()
            })
        })
    }

    async getAllInformation(): Promise<District[]> {
        if(!this.cachedDistricts)
            this.cachedDistricts = await firstValueFrom(this.http.get<District[]>(this.apiUrl))
        return this.cachedDistricts
    }

    async getDetailsInformation(mapCode: string): Promise<District> {
        const observable = await this.getAllInformation()
        const dis = observable.find((district) => district.district === mapCode)
        return dis ? dis : this.empty
    }
}