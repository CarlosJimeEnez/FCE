import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AtributosEducacionales, Carrera } from 'src/app/interfaces/carrera';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { PostCarrerasService } from 'src/app/services/carreras/post-carreras.service';
import { PutCarrerasServiceService } from 'src/app/services/carreras/put-carreras-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarreraCatAsignaturasDto, CarreraListadoMateriasDto, CarreraListadoOpURLDto, CarreraMapaTutorialDto, CarreraMisionDto, CarreraObjetivosDto, CarreranombreDto, CompetenciasEspecificasDto, CoordinadorDto, ObjetivosEducacionalesDto } from 'src/app/interfaces/Dto';
import { DeleteCarrerasService } from 'src/app/services/carreras/delete-carreras.service';
import { GetProfesoresService } from 'src/app/services/profesores/get-profesores.service';
import { Profesor } from 'src/app/interfaces/profesores';

@Component({
  selector: 'app-post-carreras',
  templateUrl: './post-carreras.component.html',
  styleUrls: ['./post-carreras.component.css']
})
export class PostCarrerasComponent implements OnInit {
  id!: number;
  nuevaCarrera!: Carrera;

  atributosEducacionales: AtributosEducacionales[] = [];
  objetivosEducacionales: ObjetivosEducacionalesDto[] = [];
  competenciasEspecíficas: CompetenciasEspecificasDto[] = [];

  dataSource = new MatTableDataSource(this.atributosEducacionales)
  dataSourceObejtivosEduc = new MatTableDataSource(this.objetivosEducacionales)
  dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas)
  displayedColumns: string[] = ["atributos", "Acciones"]; 
  
  //Dto
  atributoNuevo: AtributosEducacionales = {
    descripcion: "",
    carreraId: this.id
  }
  objetivoEducacionalNuevo: ObjetivosEducacionalesDto = {
    descripcion: "",
    carreraId: this.id
  }
  competenciasNuevo: CompetenciasEspecificasDto = {
    descripcion: "",
    carreraId: this.id
  }

  constructor(private _carreraService: CarrerasServicesService,
    private _route: ActivatedRoute,
    private _carreraPostService: PostCarrerasService,
    private _carreraPutService: PutCarrerasServiceService,
    private _carreraDeleteService: DeleteCarrerasService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _profesoresService: GetProfesoresService
    )
    {
      this.id = +this._route.snapshot.paramMap.get('id')!;
      this.nuevaCarrera = {
        carreraNombre: "",
        mision: "",
        vision: "",
        objetivos: "",
        descripcion: "",
        coordinadorID: 0
      }
    }
  
    @ViewChild(MatTable) table!: MatTable<AtributosEducacionales>;
    ngOnInit(): void {
      this.objetivoEducacionalNuevo.carreraId = this.id;
      this.atributoNuevo.carreraId = this.id;
      this.competenciasNuevo.carreraId = this.id;
    }

    postLicenciatura(){
      console.log(this.nuevaCarrera)
    }

    addAtributos(){
      const atributoNuevo: AtributosEducacionales = {
        carreraId: this.id,
        descripcion: this.atributoNuevo.descripcion
      } 
      this.atributosEducacionales.push(atributoNuevo)
      this.dataSource = new MatTableDataSource(this.atributosEducacionales)
      this.table.renderRows();
    }

    addObjetivos(){
      const objetivoNuevo: ObjetivosEducacionalesDto = {
        carreraId: this.id,
        descripcion: this.objetivoEducacionalNuevo.descripcion
      }
      this.objetivosEducacionales.push(objetivoNuevo);
      this.dataSourceObejtivosEduc = new MatTableDataSource(this.objetivosEducacionales);
      this.table.renderRows(); 
    }
    
    addCompetencia(){
      const competenciaNueva: CompetenciasEspecificasDto = {
        carreraId: this.id,
        descripcion: this.competenciasNuevo.descripcion
      }
      this.competenciasEspecíficas.push(competenciaNueva);
      this.dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas)
      this.table.renderRows();
    }

    removeCompetenciasEspecificas(i: number){
      this.competenciasEspecíficas.splice(i, 1);
      this.dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas)
      this.table.renderRows();
    }

    removeObjetivos(i: number): void{
      this.objetivosEducacionales.splice(i, 1);
      this.dataSourceObejtivosEduc = new MatTableDataSource(this.objetivosEducacionales)
      this.table.renderRows();
    }

    removeData(i: number): void {
      this.atributosEducacionales.splice(i, 1)
      this.dataSource = new MatTableDataSource(this.atributosEducacionales)
      this.table.renderRows();
    }
}
