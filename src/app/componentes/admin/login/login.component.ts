import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/interfaces/login';
import { LoginUserService } from 'src/app/services/login-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild("emailStyle") emailStyle!: ElementRef; 
  @ViewChild("passwordStyle") passwordStyle!: ElementRef; 
  loginForm: FormGroup;
  user: LoginModel; 
  formSubmitted: boolean = false;
  colorPredeterminado: string = "primary"

  constructor (
    private _fb: FormBuilder,
    private _loginService: LoginUserService,
    private _renderer: Renderer2,
    private _router: Router,
  )
    {    
      this.user = { email: "", password: "", rememberMe: false}

      this.loginForm = this._fb.group({
        email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/)]],
        password: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/)]],
        rememberMe: ['']
      });
  }

  restablecerColorEmail(): void{
    this._renderer.addClass(this.emailStyle.nativeElement, 'predeterminado');
  }

  restablecerColorPassword(): void{
    this._renderer.addClass(this.passwordStyle.nativeElement, 'predeterminado');
  }

  login(): void {
    if(this.loginForm.valid) {
      this.user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        rememberMe: false
      }
      
      this._loginService.login(this.user).subscribe(
        token => {
          // Aquí manejarías la respuesta del servidor, como guardar el token, etc.
          // localStorage.setItem('tokenJWT', token);
          this._loginService.setToken(token);
          this.formSubmitted = true;
          this.inicioSesion()
        },
        error => {
          console.error('Error durante el inicio de sesión:', error);
          this.loginForm.reset();
          this.addErrorStyleEmail();
          this.addErrorStylePassword();
        }
      );
    }
  }

  addErrorStyleEmail(){
    this._renderer.removeClass(this.emailStyle.nativeElement, 'predeterminado');
    this._renderer.addClass(this.emailStyle.nativeElement, 'error');
  }

  addErrorStylePassword(){
    this._renderer.removeClass(this.passwordStyle.nativeElement, 'predeterminado');
    this._renderer.addClass(this.passwordStyle.nativeElement, 'error');
  }

  inicioSesion(): void {
    this._router.navigate([`admin/inicio`], {fragment: 'inicio'});
  }
  
}
