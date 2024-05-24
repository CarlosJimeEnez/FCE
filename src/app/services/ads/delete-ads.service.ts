import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class DeleteAdsService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/AdsControllerDelete/"
  
  constructor(private _http: HttpClient) { }

  deleteAd(id: number): Observable<any> {
    return this._http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

}
