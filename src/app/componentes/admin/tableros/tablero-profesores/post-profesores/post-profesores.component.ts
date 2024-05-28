import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorDto } from 'src/app/interfaces/Dto';
import { Profesor } from 'src/app/interfaces/carrera';
import { PutProfesoresService } from 'src/app/services/profesores/put-profesores.service';

@Component({
  selector: 'app-post-profesores',
  templateUrl: './post-profesores.component.html',
  styleUrls: ['./post-profesores.component.css']
})
export class PostProfesoresComponent implements OnInit {
  id!: number; 
  isCreateMode!: boolean;
  profesor: ProfesorDto = {
    nombre: '',
    edificio: '',
    horario: '',
    telefono: '',
    correo: '',
  };
  editForm!: FormGroup

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _editarProfesor: PutProfesoresService
  ){}

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      if (params.has("id")) {
        this.isCreateMode = false;
        this.id = +params.get("id")!;

        this.profesor.id = this.id;
        console.log(this.isCreateMode);

        this.editForm = this._fb.group({
          nombre: [this.profesor.nombre, Validators.required],
          edificio: [this.profesor.edificio, Validators.required],
          horario: [this.profesor.horario, Validators.required],
          telefono: [this.profesor.telefono, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
          correo: [this.profesor.correo, [Validators.required, Validators.email]]
        })
      } else {
        this.isCreateMode = true;
      }
    })
  }

  back():void{
    this._router.navigate(['admin/tablero-profesores', {}])
  }

  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    });
  }

  onSubmit():void{
    this.profesor.nombre = this.editForm.get('nombre')?.value; 
    this.profesor.edificio = this.editForm.get('edificio')?.value; 
    this.profesor.horario = this.editForm.get('horario')?.value;
    this.profesor.telefono = this.editForm.get('telefono')?.value;
    this.profesor.correo = this.editForm.get('correo')?.value;
    
    this._editarProfesor.editarProfesor(this.profesor).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: any) => {
        console.log(err)
        this.alerta("Error al editar")
      },
      complete: () => {
        console.log("Profesor editado correctamente")
        this.alerta("Profesor editado correctamente")
        this.back();
      },
    })    
  }
}
