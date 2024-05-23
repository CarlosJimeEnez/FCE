import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroments';
import { AdsEditDto } from 'src/app/interfaces/Dto';

@Injectable({
  providedIn: 'root'
})
export class PutAdsService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/AdsControllerPut/"
  myAdsEditUrl: string = "editar/"
  
  constructor(
    private _http: HttpClient
  ) { }

  editAd(Ads: AdsEditDto): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.myAdsEditUrl}${Ads.id}`, Ads)
  }
  
}
