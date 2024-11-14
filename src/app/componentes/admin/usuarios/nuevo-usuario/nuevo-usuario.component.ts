import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent {
  usuariosForm: FormGroup;
  
  constructor(private _router: Router, private fb: FormBuilder, private _usuariosService: UsuariosService, private _snackBar: MatSnackBar) {
    this.usuariosForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    })
  };

  guardarUsuario() {
    if (this.usuariosForm.invalid) {
      this.usuariosForm.markAllAsTouched();
      return;
    }

    const usuarios: Usuarios = {
      email: this.usuariosForm.get('email')?.value,
      password: this.usuariosForm.get('password')?.value
    }

    this._usuariosService.postUsuarios(usuarios).subscribe({
      next: (resp) => {
        console.log(resp);
        this.alerta("Usuario creado correctamente");
        this._router.navigate(['/admin/tablero-usuarios']);
      },
      error: (err) => {
        console.log(err);
      }
    }); 

    
  }
}
