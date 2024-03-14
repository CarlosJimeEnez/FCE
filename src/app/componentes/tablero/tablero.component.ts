import { fromEvent, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarrerasServicesService } from 'src/app/services/carreras-services.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})

export class TableroComponent implements OnInit, OnDestroy {

  constructor(private _carrerasService: CarrerasServicesService) {}
  
  // Carreras
  carreras = [
    { nombre: "Electronica", descripcion: "descripcion" },
    { nombre: "Mecatronica", descripcion: "descripcion" },
    { nombre: "Energias Renovables", descripcion: "descripcion" },
  ]

  ngOnInit(): void{
    this._carrerasService.getCarreras().subscribe(data => {
      console.log(data); 
    }, error => {
      console.log('Error al obtener carreras: ', error);
    })    
  }
  
  ngOnDestroy(): void {
  }

}
