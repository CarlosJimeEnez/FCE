import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/interfaces/profesores';
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
    private _profesoresService: GetProfesoresService){}

  ngOnInit(): void {
    this.getProfesores()
  }

  displayedColumns: string[] = ["Nombre", "Cargo", "Edificio", "Horario", "Correo", "Acciones"]; 
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
}
