import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';
import { Carrera } from '../interfaces/carrera';
@Injectable({
  providedIn: 'root'
})
export class CarrerasServicesService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/Carrerras/"
  myApiWelcome: string = "api/welcome"

  constructor(private http: HttpClient) {}

  getWelcome(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiWelcome}`)
  }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getCarrera(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }


}
