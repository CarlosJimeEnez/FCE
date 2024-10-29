import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';'../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../interfaces/login';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  myAppUrl: string = environment.endpoint
  myControllerUrl: string = "api/Login"
  private isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private _http: HttpClient, private router: Router) {}

  login(credentials: LoginModel): Observable<string> {
    return this._http.post<string>(`${this.myAppUrl}${this.myControllerUrl}`, credentials,  { responseType: 'text' as 'json' })
      .pipe(
        tap(token => {
          this.isLoggedIn.next(true);
        })
      )
  }

    // Método para guardar el token en el localStorage
    setToken(token: string): void {
      localStorage.setItem('tokenJWT', token);
    }
  
    // Método para obtener el token del localStorage
    getToken(): string | null {
      return localStorage.getItem('tokenJWT');
    }
  
    // Método para eliminar el token del localStorage
    clearToken(): void {
      localStorage.removeItem('tokenJWT');
      this.isLoggedIn.next(false);
      this.router.navigate(['/admin/login']);
    }

     // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedIn.value;
  }

  // Observable para el estado de autenticación
  get isLoggedIn$() {
    return this.isLoggedIn.asObservable();
  }

  // Verificar si hay un token en el localStorage
  private hasToken(): boolean {
    return !!this.getToken();
  }
}
