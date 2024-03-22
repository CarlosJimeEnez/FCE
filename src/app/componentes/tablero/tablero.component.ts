import { fromEvent, Subscription } from 'rxjs';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CarrerasServicesService } from 'src/app/services/carreras-services.service';
import { Carrera } from 'src/app/interfaces/carrera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit, OnDestroy, AfterViewInit {
  carreras: Carrera[] = [];
  carrerasNoCargadas: boolean = true;
  // Servicios con guion bajo
  constructor(private _carrerasService: CarrerasServicesService, private _router: Router) {}
  @ViewChild("navbar") navbar!: ElementRef;
  
  ngOnInit(): void{
    this.getCarreras();   
  }
  
  ngAfterViewInit(): void {
    this.desplazarAlInicio()
  }

  ngOnDestroy(): void {
  }

  // Funciones
  getCarreras() {
    this._carrerasService.getCarreras().subscribe(data => {
      console.log(data);
      this.carrerasNoCargadas = false
      this.carreras = data
    }, error => this.carrerasNoCargadas = true);
  }

  desplazarAlInicio(): void {
    this.navbar.nativeElement.scrollTop = 0;
  }

  verCarrera(id: number): void {
    this._router.navigate([`verCarrera/${id}`]);
  }
}
