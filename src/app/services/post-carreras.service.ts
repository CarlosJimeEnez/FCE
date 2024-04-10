import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';
import { AtributoEgresoDto } from '../interfaces/Dto';

@Injectable({
  providedIn: 'root'
})
export class PostCarrerasService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/CarrerrasControllerPost/"
  myAtributosEgresoUrl: string = "atributosEgreso"
  
  constructor(private _http: HttpClient) { }

  postAtributosEgreso(atributo: AtributoEgresoDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myAtributosEgresoUrl}`, atributo)
  }

}
