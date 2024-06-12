import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrera } from 'src/app/interfaces/carrera';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { PostCarrerasService } from 'src/app/services/carreras/post-carreras.service';
import { PutCarrerasServiceService } from 'src/app/services/carreras/put-carreras-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtributoEgresoDto, CarreraCatAsignaturasDto, CarreraDto, CarreraListadoMateriasDto, CarreraListadoOpURLDto, CarreraMapaTutorialDto, CarreraMisionDto, CarreraObjetivosDto, CarreranombreDto, CompetenciasEspecificasDto, CoordinadorDto, ObjetivosEducacionalesDto } from 'src/app/interfaces/Dto';
import { DeleteCarrerasService } from 'src/app/services/carreras/delete-carreras.service';
import { GetProfesoresService } from 'src/app/services/profesores/get-profesores.service';
import { Profesor, ProfesorDto } from 'src/app/interfaces/profesores';
import { concat, concatMap } from 'rxjs';

@Component({
  selector: 'app-post-carreras',
  templateUrl: './post-carreras.component.html',
  styleUrls: ['./post-carreras.component.css']
})
export class PostCarrerasComponent implements OnInit {
  id: number = 0;
  nuevaCarrera!: CarreraDto;

  nuevaCarreraCreada: boolean = false;
  atributosCargados: boolean = false;
  competenciasCargados: boolean = false;
  objetivosCargados: boolean = false;
  documentosCargados: boolean = false;

  catalogoAsignaturaCargado: boolean = false;
  mapaTutorialCargado: boolean = false;
  listaMateriasCargadas: boolean = false;
  listaMateriasOpCargado: boolean = false;

  atributosEducacionales: AtributoEgresoDto[] = [];
  objetivosEducacionales: ObjetivosEducacionalesDto[] = [];
  competenciasEspecíficas: CompetenciasEspecificasDto[] = [];
  dataSource = new MatTableDataSource(this.atributosEducacionales)
  dataSourceObejtivosEduc = new MatTableDataSource(this.objetivosEducacionales)
  dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas)
  displayedColumns: string[] = ["atributos", "Acciones"]; 
  
  profesores: ProfesorDto[] = []
  profesorSeleccionado: number = 1;

  //Dto 
  atributoNuevo: AtributoEgresoDto = {
    carreraId: this.id,
    descripcion: "",
  }
  objetivoEducacionalNuevo: ObjetivosEducacionalesDto = {
    descripcion: "",
    carreraId: this.id
  }
  competenciasNuevo: CompetenciasEspecificasDto = {
    descripcion: "",
    carreraId: this.id
  }

  // Documentos
  catalogosAsignaturasURL: CarreraCatAsignaturasDto = {
    carreraId: this.id,
    catalogoAsignaturaUrl: "",
  }
  mapaTutorial: CarreraMapaTutorialDto = {
    carreraId: this.id,
    mapaTutorialUrl: "",
  }
  listadoMaterias: CarreraListadoMateriasDto = {
    carreraId: this.id,
    listadoMateriasUrl: "",
  }
  listadoMateriasOptativas: CarreraListadoOpURLDto = {
    carreraId: this.id,
    listadoMateriasOpURL: "",
  }

  //Coordinador
  coordinador: CoordinadorDto = {
    carreraId: this.id,
    contactoId: 0
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
      this.nuevaCarrera = {
        carreraNombre: "",
        mision: "",
        vision: "",
        objetivos: "",
        descripcion: "",
        coordinadorID: this.profesorSeleccionado
      }
    }
  
    @ViewChild(MatTable) table!: MatTable<AtributoEgresoDto>;
    ngOnInit(): void {
      this.getProfesores();
    }

    postLicenciatura(){
      if(
        this.nuevaCarrera.carreraNombre != "" &&
        this.nuevaCarrera.mision != "" &&
        this.nuevaCarrera.vision != "" &&
        this.nuevaCarrera.objetivos != "" &&
        this.nuevaCarrera.descripcion != ""
      )
        {
          this.cambiarProfesor();

          this._carreraPostService.postLicenciatura(this.nuevaCarrera).subscribe({
            next: (data) => {
              console.log("Next: ");
              console.log(data);
              this.nuevaCarreraCreada = true;
              this.id = data.id;
            },
            error: (err) => {
              console.log(err)
              this.alerta("Error en la petición")
            },
            complete: () => {
              console.log(`Nueva carrera creada con id: ${this.id}`)
              this.alerta("Datos registrados")
            }
          })
        }
        else{
          this.alerta("Error en la peticion, falta algun campo")
        }
      }

    postAtributos(){
      if(this.atributosEducacionales.length > 0)
      {
        this._carreraPostService.postAtributosEgresos(this.atributosEducacionales).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (err) => {
            console.log(err)
            this.alerta("Error en la petición")
          },
          complete: () => {
            console.log("Los atributos se cargaro")
            this.alerta("Los atributos se cargaron")
            this.atributosCargados = true
          }
        })
      }
      else{
        this.alerta("Error, campos vacios")
      }
    }

    postObjetivos(){
      if(this.objetivosEducacionales.length > 0)
      {
        this._carreraPostService.postObjetivosEducacionales(this.objetivosEducacionales).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (err) => {
            console.log(err)
            this.alerta("Error en la petición")
          },
          complete: () => {
            this.alerta("Los objetivos se cargaron")
            this.objetivosCargados = true
          }
        })
      }
      else{
        this.alerta("Error, campos vacios")
      }
    }

    postCompetencias(){
      if(this.competenciasEspecíficas.length > 0){
        this._carreraPostService.postCompetenciasEspecificass(this.competenciasEspecíficas).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (err) => {
            console.log(err)
            this.alerta("Error en la petición")
          },
          complete: () => {
            this.alerta("Las competencias se cargaron")
            this.competenciasCargados = true
          }
        });
      }
    }
    
    // Documentos
    postCatalogos(){
      if(this.catalogosAsignaturasURL.catalogoAsignaturaUrl != "")
      {
        this.catalogosAsignaturasURL.carreraId = this.id
        this._carreraPostService.postCatalogoAsignatura(this.catalogosAsignaturasURL).subscribe({
          next: () => {},
          error: () => {this.alerta("Error en la petición")},
          complete: () => {
            this.catalogoAsignaturaCargado = true
            
            this.alerta("Documento cargado")
          }
        })
      }
      else 
      {
        this.alerta("Campos vacios")
      }
    }

    postMapaTutorial(){
      // Documentos
      if(this.mapaTutorial.mapaTutorialUrl != "")
      {
        this.mapaTutorial.carreraId = this.id
        this._carreraPostService.postMapaTutorial(this.mapaTutorial).subscribe({
          next: () => {},
          error: () => {this.alerta("Error en la petición")},
          complete: () => {
            this.alerta("Documento cargado")
            this.mapaTutorialCargado = true
          }
        })
      }
      else 
      {
        this.alerta("Campos vacios")
      }
    }

    postListaMaterias(){
      // Documentos
      if(this.listadoMaterias.listadoMateriasUrl != "")
      {
        this.listadoMaterias.carreraId = this.id
        this._carreraPostService.postListadoMaterias(this.listadoMaterias).subscribe({
          next: () => {},
          error: () => {this.alerta("Error en la petición")},
          complete: () => {
            this.alerta("Documento cargado")
            this.listaMateriasCargadas = true
          }
        })
      }
      else 
      {
        this.alerta("Campos vacios")
      }
    }

    postListaMateriasOp(){
      // Documentos
      if(this.listadoMateriasOptativas.listadoMateriasOpURL != "")
      {
        this.listadoMateriasOptativas.carreraId = this.id
        this._carreraPostService.postListadoMateriasOp(this.listadoMateriasOptativas).subscribe({
          next: () => {},
          error: () => {this.alerta("Error en la petición")},
          complete: () => {
            this.alerta("Documento cargado")
            this.listaMateriasOpCargado = true
            this.volverInicio()
          }
        })
      }
      else 
      {
        this.alerta("Campos vacios")
      }
    }

    getProfesores(){
      this._profesoresService.getProfesores().subscribe(profesores =>
        {
          console.log(profesores);
          this.profesores = profesores;
        })
    }

    addAtributos(){
      if(this.atributoNuevo.descripcion != ""){
        const atributoNuevo: AtributoEgresoDto = {
          carreraId: this.id,
          descripcion: this.atributoNuevo.descripcion
        }
        this.atributoNuevo.descripcion = ""
        this.atributosEducacionales.push(atributoNuevo)
        this.dataSource = new MatTableDataSource(this.atributosEducacionales)
        this.table.renderRows();
      }
      else {
        this.alerta("Campo vacio")
      }
    }

    addObjetivos(){
      if(this.objetivoEducacionalNuevo.descripcion != ""){
        const objetivoNuevo: ObjetivosEducacionalesDto = {
          carreraId: this.id,
          descripcion: this.objetivoEducacionalNuevo.descripcion
        }
        this.objetivoEducacionalNuevo.descripcion = ""
        this.objetivosEducacionales.push(objetivoNuevo);
        this.dataSourceObejtivosEduc = new MatTableDataSource(this.objetivosEducacionales);
        this.table.renderRows(); 
      }
      else{
        this.alerta("Campo vacio")
      }
    }
    
    addCompetencia(){
      if(this.competenciasNuevo.descripcion){
        const competenciaNueva: CompetenciasEspecificasDto = {
          carreraId: this.id,
          descripcion: this.competenciasNuevo.descripcion
        }
        this.competenciasEspecíficas.push(competenciaNueva);
        this.dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas)
        this.table.renderRows();
      }
      else{
        this.alerta("Campo vacio")
      }      
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

    cambiarProfesor(){
      console.log(this.coordinador)
      console.log("Cambiando de profesor")
      if(this.profesores != null){
        this.nuevaCarrera.coordinadorID = this.profesorSeleccionado
        console.log(this.nuevaCarrera.coordinadorID) 
      }
      else {
        console.log("No hay profesores")
      }
    }

    volverInicio(){
      this._router.navigate(['admin/inicio']);
    }

    alerta(message: string){
      this._snackBar.open(message, "Cerrar", {
        duration: 2000,
        verticalPosition: "bottom",
        horizontalPosition: 'right'
      })
    };
}
