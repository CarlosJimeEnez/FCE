import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Carrera } from 'src/app/interfaces/carrera';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';

@Component({
  selector: 'app-tablero-admin',
  templateUrl: './tablero-admin.component.html',
  styleUrls: ['./tablero-admin.component.css']
})
export class TableroAdminComponent implements OnInit {
  carrerasNoCargadas: boolean = true;
  carreras: Carrera[] = [];
  dataSource = new MatTableDataSource(this.carreras)

  constructor(
    private _router: Router, 
    private _carrerasService: CarrerasServicesService){}

  ngOnInit(): void {
    this.getCarreras()
  }

  // Funciones
  getCarreras() {
    this._carrerasService.getCarreras().subscribe(data => {
      this.carrerasNoCargadas = false
      this.carreras = data
      this.dataSource = new MatTableDataSource(this.carreras)
      console.log(this.carreras)
    }, error => this.carrerasNoCargadas = true);
  }

  displayedColumns: string[] = ["No", "Nombre", "Acciones"]; 
  // dataSource = new MatTableDataSource(this.carreras)

  applyFilter(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = inputValue.trim().toLowerCase();
  }

  editarCarrera(id: number, carreraNombre: string): void{
    this._router.navigate([`admin/editar-carrera/${id}`], { queryParams: { carreraNombre:  carreraNombre} })
  }

  nuevaCarrera(){
    this._router.navigate(['admin/post-carrera']);
  }
}
