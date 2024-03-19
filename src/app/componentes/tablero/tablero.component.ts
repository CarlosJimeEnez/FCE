import { fromEvent, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarrerasServicesService } from 'src/app/services/carreras-services.service';
import { Carrera } from 'src/app/interfaces/carrera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit, OnDestroy {
  carreras: Carrera[] = [];
  carrerasNoCargadas: boolean = true;
  // Servicios con guion bajo
  constructor(private _carrerasService: CarrerasServicesService, private _router: Router) {}
  

  ngOnInit(): void{
    this.getCarreras();    
  }
  
  ngOnDestroy(): void {
  }

  getCarreras() {
    this._carrerasService.getCarreras().subscribe(data => {
      console.log(data);
      this.carrerasNoCargadas = false
      this.carreras = data
    }, error => this.carrerasNoCargadas = true);
  }

  verCarrera(id: number): void {
    this._router.navigate([`verCarrera/${id}`]);
  }
}
