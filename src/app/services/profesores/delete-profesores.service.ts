import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';'../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteProfesoresService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/ProfesoresControllerDelete/"

  constructor(private _http: HttpClient) { }

  deleteProfesor(id: number): Observable<any> {
    return this._http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

}
