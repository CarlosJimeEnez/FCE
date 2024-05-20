import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsDto } from 'src/app/interfaces/Dto';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  adNoCargadas: boolean = true;
  navNombre!: string 
  ad: AdsDto[] = [];
  dataSource = new MatTableDataSource(this.ad)
  @ViewChild(MatTable) table!: MatTable<AdsDto>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router, 
    private _snackBar: MatSnackBar
  ){
    this.navNombre = this._route.snapshot.queryParamMap.get('nombre')!;
  }

  ngOnInit(): void {
    this.getAds()
  }

  // Funciones
  getAds() {

  }

  displayedColumns: string[] = ["Nombre", "Acciones"]; 
  // dataSource = new MatTableDataSource(this.carreras)

  applyFilter(event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = inputValue.trim().toLowerCase();
  }

  // editarCarrera(id: number, carreraNombre: string): void{
  //   this._router.navigate([`admin/editar-carrera/${id}`], { queryParams: { carreraNombre:  carreraNombre} })
  // }

  nuevoAds(){
    this._router.navigate(['admin/post-carrera']);
  }

  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    })
  };
}
