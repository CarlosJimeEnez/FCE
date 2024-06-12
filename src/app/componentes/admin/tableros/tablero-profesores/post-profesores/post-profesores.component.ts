import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorDto } from 'src/app/interfaces/profesores';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { PosttProfesoresService } from 'src/app/services/profesores/post-profesores.service';
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
  postForm!: FormGroup

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _editarProfesor: PutProfesoresService,
    private _nuevoProfesor: PosttProfesoresService,
    private _handleError: HandleErrorService
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
        
        this.postForm = this._fb.group({
          nombre: [this.profesor.nombre, Validators.required],
          edificio: [this.profesor.edificio, Validators.required],
          horario: [this.profesor.horario, Validators.required],
          telefono: [this.profesor.telefono, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
          correo: [this.profesor.correo, [Validators.required, Validators.email]]
        })

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
    if(this.editForm.valid){
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
          this._handleError.HandleError(err);
        },
        complete: () => {
          console.log("Profesor editado correctamente")
          this.alerta("Profesor editado correctamente")
          this.back();
        },
      })    
    }
  }

  onSubmitCreate():void{
    if(this.postForm.valid){
      this.profesor.nombre = this.postForm.get('nombre')?.value; 
      this.profesor.edificio = this.postForm.get('edificio')?.value; 
      this.profesor.horario = this.postForm.get('horario')?.value;
      this.profesor.telefono = this.postForm.get('telefono')?.value;
      this.profesor.correo = this.postForm.get('correo')?.value;
      
      this._nuevoProfesor.postProfesor(this.profesor).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err: HttpErrorResponse) => {
          this._handleError.HandleError(err);
        },
        complete: () => {
          console.log("Post correctamente")
          this.alerta("Formulario enviado correctamente")
          this.back();
        },
      })  
    }
    else {
      console.log("Error al validar el formulario")
    }
  }
}
