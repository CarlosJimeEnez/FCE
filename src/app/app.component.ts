import { Component, OnInit} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CarrerasServicesService } from './services/carreras/carreras-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'FCE';
  carrerasCargadas: boolean = false;

  constructor(
    private _carrerasService: CarrerasServicesService
  ){}

  ngOnInit(): void {
    initFlowbite();
    this.getCarreras();
  }

  getCarreras() {
    this._carrerasService.getCarreras().subscribe(data => {
      this.carrerasCargadas = true
    }, error => {
      this.carrerasCargadas = false
    });
  }

}
