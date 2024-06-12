import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProfesorDTO } from 'src/app/interfaces/profesores';
import { PutCarrerasServiceService } from 'src/app/services/carreras/put-carreras-service.service';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css']
})
export class EditRolComponent implements OnInit {
  profesor!: ProfesorDTO
  rolForm!: FormGroup
  carreraId!: string

  roles = [
    { value: 1, label: "Coordinador",},
    { value: 2, label: "Docente",}    
  ]

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _putProfesoresCarrera: PutCarrerasServiceService,
    private _snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
      this._route.queryParams.subscribe(params => {
        this.profesor = JSON.parse(params['profesor']);
        this.carreraId = JSON.parse(params['carreraId']);
      })

      console.log(this.carreraId)
      console.log(this.profesor.profesorId!)

      this.rolForm = this._fb.group({
        rol: [this.profesor.rol, Validators.required]
      })
  }

  onSubmitRolForm():void {
    console.log("onSubmitRolForm")
    if (this.rolForm.valid && this.profesor) {

      const rolProfesor: {[ key: string ]: () => void } = {
        "1": () => {this.profesor.rol = "Coordinador"},
        "2": () => {this.profesor.rol = "Docente"}
      };

      if (rolProfesor[this.rolForm.value.rol]){
        rolProfesor[this.rolForm.value.rol]()
      }
      
      this._putProfesoresCarrera.putRolProfesor(this.profesor.profesorId!, +this.carreraId, this.profesor).subscribe({
        next: (value: any) => {
            console.log(value)
        },

        error: (err: any) => {
          console.log(err)
          this.alerta("Error en la petición")
        },

        complete: () => {
          console.log("Cambio de rol completado") 
          this.alerta("Cambio de rol completado")
          this.back();
        }

      })
      
      console.log(this.profesor.rol)
    }
  }

  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    });
  }

  back(){
    this._router.navigate([`admin/editar-carrera/${this.carreraId}`]);
  }
}
