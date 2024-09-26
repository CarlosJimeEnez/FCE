import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';'src/app/environments/enviroments';
import { AdsDtoFile } from 'src/app/interfaces/Dto';

@Injectable({
  providedIn: 'root'
})
export class PostAdsService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/AdsControllerPost/"
  myAdsPostUrl: string = "upload"
  
  constructor(private _http: HttpClient) { }

  postAd(ad: FormData): Observable<any> {
    return this._http.post(`${this.myAppUrl}${this.myApiUrl}${this.myAdsPostUrl}`, ad)
  }
}
