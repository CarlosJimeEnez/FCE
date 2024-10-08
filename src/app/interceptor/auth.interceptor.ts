import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUserService } from '../services/login-user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: LoginUserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
        console.log('Token en Interceptor: ', token);
    if (token) {
        const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(cloned);
    } else {
        return next.handle(req);
    }
}
}