import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtributoEgresoDto } from '../interfaces/Dto';

@Injectable({
  providedIn: 'root'
})
export class DeleteCarrerasService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/CarreraControllerDelete/"
  myAtributosEgresoUrl: string = "atributoEgreso/"
  
  constructor(private _http: HttpClient) { }
  
  // http://localhost:5000/api/CarreraControllerDelete/atributoEgreso/27

  deleteAtributosEgreso(atributosEgreso: AtributoEgresoDto): Observable<any>{
    return this._http.delete<any>(`${this.myAppUrl}${this.myApiUrl}${this.myAtributosEgresoUrl}${atributosEgreso.id}`)
  }
}
