import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroments';
import { ProfesorDto } from 'src/app/interfaces/profesores';

@Injectable({
  providedIn: 'root'
})
export class PutProfesoresService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/ProfesoresContPut/"
  editarUrl: string = "editar/"

  constructor(private _http: HttpClient) { }

  editarProfesor(profesor: ProfesorDto): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.editarUrl}${profesor.id}${profesor.id}`, profesor)
  }
}
