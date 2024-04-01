import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AtributosEducacionales, Carrera, CompetenciasEspecificas, Documentos, ObjetivosEducacionales, Profesor } from 'src/app/interfaces/carrera';
import { CarrerasServicesService } from 'src/app/services/carreras-services.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit, AfterViewInit {
  id: number;
  carrera!: Carrera;
  profesor!: Profesor;
  documentos: Documentos[] = [];
  documentosNoCargados: boolean = true;
  atributosEducacionales!: AtributosEducacionales[];
  objetivosEducacionales!: ObjetivosEducacionales[]; 
  competenciasEspecificas!: CompetenciasEspecificas[];
  
  constructor(private _carreraService: CarrerasServicesService,
    private _route: ActivatedRoute,  private _router: Router,){
      this.id = +this._route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    console.log("Id:" + this.id);    
    this.getCarrera()
    this.getDocumentos();
    this.getAtributosdeEgresoByCarreraId(this.id);
    this.getObjetivosEducacionalesByCarreraId(this.id);
    this.getCompetenciasEspecificasByCarreraId(this.id); 
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
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getCarrera() {
    this._carreraService.getCarrera(this.id).subscribe(data => {
      this.carrera = data;
      const carreraId = this.carrera.coordinadorID
      this._carreraService.getProfesor(carreraId).subscribe(data => {
      this.profesor = data    
      console.log(this.profesor);
    });
    }, error => console.log(error));
  }

  getCoordinador(id: number) {
    this._carreraService.getProfesor(id).subscribe(data => {
      this.profesor = data    
      console.log("Coordinador" + this.profesor);
    });
  }

  getAtributosdeEgresoByCarreraId(carreraId: number){
    this._carreraService.getAtributosEgresoByCarreraId(carreraId).subscribe(data => {
      this.atributosEducacionales = data
    })
  }  

  getObjetivosEducacionalesByCarreraId(carreraId: number){
    this._carreraService.getObjetivosEducacionalesByCarreraId(carreraId).subscribe(data => {
      this.objetivosEducacionales = data
    })
  }

  getCompetenciasEspecificasByCarreraId(carreraId: number){
    this._carreraService.getCompetenciasEspecificasByCarreraId(carreraId).subscribe(data => {
      this.competenciasEspecificas = data 
      console.log(this.competenciasEspecificas)
    });
  }

  verDocumento(id: number) {
    this._router.navigate([`verMapa/${id}`]);
  }

  getDocumentos(){
    this._carreraService.getDocumentosByCarreraId(this.id).subscribe(res =>{
      console.log(res);
      this.documentos = res
      this.documentosNoCargados = false;
    }, err => console.log(err));
  }
}
