import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUserService } from '../services/login-user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: LoginUserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    console.log('Token en Interceptor: ', token);
    

    if (token) {
        // Ejemplo de uso
    const decodedToken = this.decodeToken(token);
    console.log('Issuer:', decodedToken.iss);
    console.log('Audience:', decodedToken.aud);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

  // Frontend: Puedes ver el contenido decodificado del token
  decodeToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
