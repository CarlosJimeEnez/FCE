import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroments';
import { AdsDto } from 'src/app/interfaces/Dto';


@Injectable({
  providedIn: 'root'
})
export class AdsService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/Ads/"
  
  constructor(private http: HttpClient) {}

  getAds(): Observable<AdsDto[]>{
    return this.http.get<AdsDto[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
  
}
