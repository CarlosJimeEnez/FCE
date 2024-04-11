import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroments';
import { Profesor } from 'src/app/interfaces/profesores';

@Injectable({
  providedIn: 'root'
})
export class GetProfesoresService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/ProfesoresControllerGet/"
  profesoresUrl: string = "profesores/"

  constructor(private _http: HttpClient) {}

  getProfesores(): Observable<Profesor[]>{
    return this._http.get<Profesor[]>(`${this.myAppUrl}${this.myApiUrl}${this.profesoresUrl}`)
  }
}
