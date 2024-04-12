import { fromEvent, Subscription } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { Carrera } from 'src/app/interfaces/carrera';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit, AfterViewInit {
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
    this._route.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        setTimeout(() => this.desplazarAFragmento(fragment), 100);
      }
    });
  }

  private desplazarAFragmento(fragment: string): void {
    const elemento = document.querySelector(`#${fragment}`);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: "center" });
      console.log(elemento)
    }
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
