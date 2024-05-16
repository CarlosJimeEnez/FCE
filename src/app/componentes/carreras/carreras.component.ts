import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AtributosEducacionales, Carrera, CompetenciasEspecificas, Documentos, ObjetivosEducacionales, Profesor } from 'src/app/interfaces/carrera';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GetProfesoresService } from 'src/app/services/profesores/get-profesores.service';


@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit, AfterViewInit {
  id: number;
  carrera!: Carrera;
  profesores: Profesor[] = [];
  documentos: Documentos[] = [];
  documentosNoCargados: boolean = true;
  atributosEducacionales!: AtributosEducacionales[];
  objetivosEducacionales!: ObjetivosEducacionales[]; 
  competenciasEspecificas!: CompetenciasEspecificas[];
  
  dataSource = new MatTableDataSource(this.profesores)
  @ViewChild(MatTable) table!: MatTable<Profesor>;

  constructor(
    private _carreraService: CarrerasServicesService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _profesoresService: GetProfesoresService){
      this.id = +this._route.snapshot.paramMap.get('id')!;
  }

  displayedColumns: string[] = ["Nombre", "Correo", "Edificio", "Horario"]; 

  ngOnInit() {
    console.log("Id:" + this.id);    
    this.getCarrera()
    this.getDocumentos();
    this.getAtributosdeEgresoByCarreraId(this.id);
    this.getObjetivosEducacionalesByCarreraId(this.id);
    this.getCompetenciasEspecificasByCarreraId(this.id); 
    this.getProfesores();
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
    }
  }

  getCarrera() {
    this._carreraService.getCarrera(this.id).subscribe(data => {
      this.carrera = data;
      const carreraId = this.carrera.coordinadorID
    //   this._carreraService.getProfesor(carreraId).subscribe(data => {    
    //   console.log(this.profesores);
    // });
    }, error => console.log(error));
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
    this._router.navigate([`verMapa/${id}`], { queryParams: { carreraId: this.id}});
  }

  getDocumentos(){
    this._carreraService.getDocumentosByCarreraId(this.id).subscribe(res =>{
      console.log(res);
      this.documentos = res
      this.documentosNoCargados = false;
    }, err => console.log(err));
  }

  getProfesores():void {
    this._profesoresService.getProfesorPorCarreraId(this.id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.profesores = data
        this.dataSource = new MatTableDataSource(this.profesores)

      },
      error: (err: any) => {
        console.log(err)
        
      },
      complete: ()=> {
        console.log("Profesores cargados complete");
      }
    });
  }
}
