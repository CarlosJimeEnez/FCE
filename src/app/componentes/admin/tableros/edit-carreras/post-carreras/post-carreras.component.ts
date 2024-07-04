import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrera, CarreraAtributosDto, CarreraDto } from 'src/app/interfaces/carrera';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { PostCarrerasService } from 'src/app/services/carreras/post-carreras.service';
import { PutCarrerasServiceService } from 'src/app/services/carreras/put-carreras-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AtributoEgresoDto, CarreraCatAsignaturasDto, CarreraListadoMateriasDto, CarreraListadoOpURLDto, CarreraMapaTutorialDto, CarreraMisionDto, CarreraObjetivosDto, CarreranombreDto, CompetenciasEspecificasDto, CoordinadorDto, ObjetivosEducacionalesDto } from 'src/app/interfaces/Dto';
import { DeleteCarrerasService } from 'src/app/services/carreras/delete-carreras.service';
import { GetProfesoresService } from 'src/app/services/profesores/get-profesores.service';
import { Profesor, ProfesorDto } from 'src/app/interfaces/profesores';
import { concat, concatMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-carreras',
  templateUrl: './post-carreras.component.html',
  styleUrls: ['./post-carreras.component.css']
})
export class PostCarrerasComponent implements OnInit {
  id: number = 0;
  carreraForm!: FormGroup;
  atributosForm!: FormGroup;
  objetivosForm!: FormGroup; 
  competenciasForm!: FormGroup; 

  nuevaCarrera: CarreraAtributosDto = {
    carreraNombre: "", 
    mision: "",
    vision: "",
    objetivos: "",
    atributosEducacionales: [
      {carreraId: 0, descripcion: ""}
    ],  
    objetivosEducacionales: [
      {carreraId: 0, descripcion: ""}
    ],
  };



  // Datos cargados de la Db
  nuevaCarreraCreada: boolean = false;
  atributosCargados: boolean = false;
  competenciasCargados: boolean = false;
  objetivosCargados: boolean = false;
  documentosCargados: boolean = false;
  catalogoAsignaturaCargado: boolean = false;
  mapaTutorialCargado: boolean = false;
  listaMateriasCargadas: boolean = false;
  listaMateriasOpCargado: boolean = false;

  //Atributos educacionales
  atributoNuevo: AtributoEgresoDto = {
    carreraId: this.id,
    descripcion: "",
  }
  objetivoEducacionalNuevo: ObjetivosEducacionalesDto = {
    descripcion: "",
    carreraId: this.id
  }

  competenciasEspecíficas: CompetenciasEspecificasDto[] = [];

  dataSource = new MatTableDataSource(this.nuevaCarrera.atributosEducacionales)
  dataSourceObejtivosEduc = new MatTableDataSource(this.nuevaCarrera.objetivosEducacionales)
  dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas)
  displayedColumns: string[] = ["atributos", "Acciones"]; 
  
  profesores: ProfesorDto[] = []
  profesorSeleccionado: number = 1;

  competenciasNuevo: CompetenciasEspecificasDto = {
    descripcion: "",
    carreraId: this.id
  }
  // Documentos cargados
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

  constructor(
    private _carreraService: CarrerasServicesService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _carreraPostService: PostCarrerasService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _profesoresService: GetProfesoresService
  ){}
  
    @ViewChild(MatTable) table!: MatTable<AtributoEgresoDto>;
    
    ngOnInit(): void {
      this.carreraForm = this._fb.group({
        nombre: [this.nuevaCarrera.carreraNombre, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/)]) ],
        mision: [this.nuevaCarrera.mision,  Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/)] )],
        vision: [this.nuevaCarrera.vision, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/)] )],
        objetivos: [this.nuevaCarrera.objetivos, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/)]) ],
      })    

      this.atributosForm = this._fb.group({
        atributoNuevo: [this.atributoNuevo.descripcion, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/)])],
      });
      
      this.objetivosForm = this._fb.group({
        objetivoEducacionalNuevo: [this.objetivoEducacionalNuevo.descripcion, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/)])]
      })
      
      this.competenciasForm = this._fb.group({
        competenciasNuevo: [this.competenciasNuevo.descripcion, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/)])]
      });

      this.getProfesores();
    }

    postLicenciatura(){
      this.nuevaCarrera.carreraNombre = this.carreraForm.get("nombre")?.value;
      this.nuevaCarrera.mision = this.carreraForm.get("mision")?.value;
      this.nuevaCarrera.vision = this.carreraForm.get("vision")?.value;
      this.nuevaCarrera.objetivos = this.carreraForm.get("objetivos")?.value
      this.nuevaCarreraCreada = true
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
      if(this.atributosForm.get("atributoNuevo")?.value != ""){
        this.atributoNuevo.descripcion = this.atributosForm.get("atributoNuevo")?.value
        
        const nuevoAtributo = {...this.atributoNuevo}

        this.nuevaCarrera.atributosEducacionales.push(nuevoAtributo)
        this.dataSource = new MatTableDataSource(this.nuevaCarrera.atributosEducacionales)
        this.table.renderRows();
        this.alerta("Nuevo atributo añadido")
      }
      else {
        this.alerta("Campo vacio")
      }
    }

    addObjetivos(){
      if(this.objetivosForm.get("objetivoEducacionalNuevo")?.value != ""){
        this.objetivoEducacionalNuevo.descripcion = this.objetivosForm.get("objetivoEducacionalNuevo")?.value

        const nuevoObjetivo = {...this.objetivoEducacionalNuevo}

        this.nuevaCarrera.objetivosEducacionales.push(nuevoObjetivo)
        this.dataSourceObejtivosEduc = new MatTableDataSource(this.nuevaCarrera.objetivosEducacionales)
        this.table.renderRows(); 
        this.alerta("Nuevo objetivo añadido")
      }
      else {
        this.alerta("Campo vacio")
      }
    }

    addCompetencia(){
      // if(this.competenciasForm.get("competenciasNuevo")?.value != ""){
        
      //   this.competenciasEspecíficas.push(competenciaNueva);
      //   this.dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas)
      //   this.table.renderRows();
      // }
      // else{
      //   this.alerta("Campo vacio")
      // }      
    }

    addCompetencias(){}

    removeData(i: number): void {
      this.nuevaCarrera.atributosEducacionales.splice(i, 1)
      this.dataSource = new MatTableDataSource(this.nuevaCarrera.atributosEducacionales)
      this.table.renderRows();
      this.alerta("Atributo eliminado")
    }

    removeCompetenciasEspecificas(i: number){
      this.competenciasEspecíficas.splice(i, 1);
      this.dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas)
      this.table.renderRows();
    }

    removeObjetivos(i: number): void{
      this.nuevaCarrera.objetivosEducacionales.splice(i, 1)
      this.dataSourceObejtivosEduc = new MatTableDataSource(this.nuevaCarrera.objetivosEducacionales)
      this.table.renderRows();
      this.alerta("Objetivo eliminado")
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
