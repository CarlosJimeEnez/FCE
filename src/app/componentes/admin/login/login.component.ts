import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/interfaces/login';
import { LoginUserService } from 'src/app/services/login-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('emailInput') emailInput: ElementRef | undefined;
  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;
  loginForm!: FormGroup ;
  loginError: string = '';
  user!: LoginModel;
  formSubmitted: boolean = false;
  colorPredeterminado: string = 'primary';
  errorMessage: string = '';
  loading = false;
  isLogged: boolean = false

  constructor(
    private _fb: FormBuilder,
    private _loginService: LoginUserService,
    private _renderer: Renderer2,
    private _router: Router,
    private _loginUser: LoginUserService
  ) {}

  ngOnInit() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/),
        ],
      ],
    });

    const token = this._loginUser.getToken()
    if(token){
      this.isLogged = true
    }
  }

   // Getter para fácil acceso a los campos del formulario
   get f() { return this.loginForm.controls; }

  login(): void {
    this.formSubmitted = true
    this.errorMessage = '';

    if(this.loginForm.invalid){
      return
    }

    this.loading = true;

    const credentials: LoginModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      mantenerAbierta: false
    };

    this._loginService.login(credentials).subscribe({
      next: (token: any) => {
        this._loginService.setToken(token);
        this.inicioSesion();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false
        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrecto';
        } else if (error.status === 400) {
          this.errorMessage = 'Datos de inicio de sesión inválidos';
        } else if (error.status === 404){
          this.errorMessage = 'Usuario no encontrado';
        } 
        else {
          this.errorMessage = 'Error en el servidor. Por favor, intente más tarde';
          console.log(error);
        }
      },
      complete: () => {
        this.loading = false;
      }
    });
    
  }

  // Método de estilo de error más robusto
  addErrorStyle() {
    // Usa métodos seguros de Angular para manipular estilos
    if (this.emailInput?.nativeElement) {
      this.emailInput.nativeElement.classList.add('is-invalid');
    }

    if (this.passwordInput?.nativeElement) {
      this.passwordInput.nativeElement.classList.add('is-invalid');
    }
  }

  inicioSesion(): void {
    this._router.navigate([`admin/inicio`], { fragment: 'inicio' });
  }
}
