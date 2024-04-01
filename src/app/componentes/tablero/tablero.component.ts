import { fromEvent, Subscription } from 'rxjs';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CarrerasServicesService } from 'src/app/services/carreras-services.service';
import { Carrera } from 'src/app/interfaces/carrera';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit, OnDestroy, AfterViewInit {
  carreras: Carrera[] = [];
  carrerasNoCargadas: boolean = true;
  // Servicios con guion bajo
  constructor
  (
    private _carrerasService: CarrerasServicesService, private _router: Router,
    private _route: ActivatedRoute,
    private _scrollService: ScrollService
  ){}
  
  ngOnInit(): void{
    this.getCarreras();   
  }
  
  ngAfterViewInit(): void {
    this._scrollService.trigerScrollTo$.subscribe((fragment: string | null) => {
      if(fragment) {
        setTimeout(() => this.desplazarAFragmento(fragment), 100)
      }
    })
    this._scrollService.triggerBackToMainMenu$.subscribe(() => {
      
    })
  }

  ngOnDestroy(): void {
  }

  private desplazarAFragmento(fragment: string) {
    const element = document.querySelector(`#${fragment}`);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Funciones
  getCarreras() {
    this._carrerasService.getCarreras().subscribe(data => {
      console.log(data);
      this.carrerasNoCargadas = false
      this.carreras = data
    }, error => this.carrerasNoCargadas = true);
  }

  verCarrera(id: number): void {
    this._router.navigate([`verCarrera/${id}`], {fragment: 'section1'});
  }
}
