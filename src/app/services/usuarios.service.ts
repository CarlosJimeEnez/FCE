import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Usuarios, UsuariosDto } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/LoginControllerGet/"
  myApiUrlPost: string = "api/LoginControllerGet/post"

  constructor(private _http: HttpClient) { }

  getUsuarios():Observable<UsuariosDto[]>{
    return this._http.get<UsuariosDto[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }
  
  postUsuarios(usuarios: Usuarios):Observable<Usuarios>{
    return this._http.post<Usuarios>(`${this.myAppUrl}${this.myApiUrlPost}`, usuarios)
  }
}
