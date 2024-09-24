import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Carrera, CarreraDto } from 'src/app/interfaces/carrera';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteCarrerasService } from 'src/app/services/carreras/delete-carreras.service';

@Component({
  selector: 'app-tablero-admin',
  templateUrl: './tablero-admin.component.html',
  styleUrls: ['./tablero-admin.component.css']
})
export class TableroAdminComponent implements OnInit {
  carrerasNoCargadas: boolean = true;
  carreras: Carrera[] = [];
  dataSource = new MatTableDataSource(this.carreras)
  @ViewChild(MatTable) table!: MatTable<Carrera>;
  
  constructor(
    private _router: Router, 
    private _carrerasService: CarrerasServicesService,
    private _carreraDeleteService: DeleteCarrerasService, 
    private _snackBar: MatSnackBar,
  ){}

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

  displayedColumns: string[] = ["Nombre", "Acciones"]; 
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

  eliminarCarrera(carrera: CarreraDto ,id: number, nombre: string): void{
    this._carreraDeleteService.deleteCarrera(carrera).subscribe({
      next: () => {
        this.getCarreras()
        this.table.renderRows();
      },
      error: (err: any) => {console.log(err);},
      complete: () => {
        this.alerta(`Se eliminó la carrera: ${nombre}`)
      }
    })
  }

  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    })
  };
}
