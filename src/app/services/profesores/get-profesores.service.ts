import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroments';
import { Profesor, ProfesorDTO } from 'src/app/interfaces/profesores';

@Injectable({
  providedIn: 'root'
})
export class GetProfesoresService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/ProfesoresControllerGet/"
  myProfesoresCarreraUrl: string = "api/ProfesoresCarrerasGet/"
  profesoresUrl: string = "profesores/"

  constructor(private _http: HttpClient) {}

  getProfesores(): Observable<ProfesorDTO[]>{
    return this._http.get<ProfesorDTO[]>(`${this.myAppUrl}${this.myApiUrl}${this.profesoresUrl}`)
  }

  getProfesoresExcluirById(excluirProfesoresId: number[]): Observable<ProfesorDTO[]>{
    let params = new HttpParams();

    excluirProfesoresId.forEach(id => {
      params = params.append("excluirProfesorIds", id.toString()); 
    }) 
    console.log("params: ")
    console.log(params);
    return this._http.get<ProfesorDTO[]>(`${this.myAppUrl}${this.myApiUrl}${this.profesoresUrl}`, {params}); 
  }

  getProfesorPorCarreraId(id: number): Observable<ProfesorDTO[]>{
    return this._http.get<ProfesorDTO[]>(`${this.myAppUrl}${this.myProfesoresCarreraUrl}${id}`)
  }
}
