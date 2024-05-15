import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../interfaces/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  myAppUrl: string = environment.endpoint
  myControllerUrl: string = "api/Login"

  constructor(private _http: HttpClient) {}

  login(credentials: LoginModel): Observable<string> {
    console.log(credentials)
    return this._http.post<string>(`${this.myAppUrl}${this.myControllerUrl}`, credentials,  { responseType: 'text' as 'json' })
  }
}
