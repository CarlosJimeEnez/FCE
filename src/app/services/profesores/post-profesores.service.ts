import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';'src/app/environments/environment';
import { ProfesorDto } from 'src/app/interfaces/profesores';
// import { ProfesorDto } from 'src/app/interfaces/Dto';

@Injectable({
  providedIn: 'root'
})

export class PosttProfesoresService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/ProfesoresContPost/"
  postUrl: string = "upload/"

  constructor(private _http: HttpClient) { }

  postProfesor(profesor: ProfesorDto): Observable<any>{
    return this._http.post(`${this.myAppUrl}${this.myApiUrl}${this.postUrl}`, profesor)
  }
}
