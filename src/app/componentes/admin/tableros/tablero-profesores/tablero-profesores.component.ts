import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/interfaces/profesores';
import { DeleteProfesoresService } from 'src/app/services/profesores/delete-profesores.service';
import { GetProfesoresService } from 'src/app/services/profesores/get-profesores.service';

@Component({
  selector: 'app-tablero-profesores',
  templateUrl: './tablero-profesores.component.html',
  styleUrls: ['./tablero-profesores.component.css']
})
export class TableroProfesoresComponent implements OnInit{
  profesores: Profesor[] = [];
  dataSource = new MatTableDataSource(this.profesores)

  constructor(private _router: Router,
    private _profesoresService: GetProfesoresService,
    private _deleteProf: DeleteProfesoresService,
    private _snackBar: MatSnackBar,){}

  ngOnInit(): void {
    this.getProfesores()
  }

  displayedColumns: string[] = ["Nombre", "Edificio", "Horario", "Correo", "Acciones"]; 
  // dataSource = new MatTableDataSource(this.carreras)

  getProfesores() {
    this._profesoresService.getProfesores().subscribe(profesores => 
      {
        console.log(profesores)
        this.dataSource = new MatTableDataSource(profesores)
      }, err => {
        console.log(err)
      })
  }

  editarProfesor(id: number, profesor: string){
    this._router.navigate([`admin/editar-carrera/${id}`], { queryParams: { profesor:  profesor} })
  }

  applyFilter(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = inputValue.trim().toLowerCase();
  }

  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    })
  };

  eliminarProfesor(id: number): void {
    this._deleteProf.deleteProfesor(id).subscribe({
      next: (data: any) => {
        
      },
      error: (data: any) => {
        this.alerta("Error al eliminar el elemento")
        console.log(data);
      },
      complete: () => {
        console.log("Elemento eliminado correctamente");
        this.alerta("Elemento eliminado correctamente")
        this.getProfesores()
      },
    })    
  }
}
