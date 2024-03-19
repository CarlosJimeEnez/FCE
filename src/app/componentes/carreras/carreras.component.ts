import { Component, Input, OnInit } from '@angular/core';
import { CarrerasServicesService } from 'src/app/services/carreras-services.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  @Input() carrera: any 

  constructor(private _carreraService: CarrerasServicesService){}

  ngOnInit() {

  }

  getCarrera() {
    this._carreraService.getCarrera(this.carrera.id).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
  }
}
