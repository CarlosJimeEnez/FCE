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
import { ProfesorDto } from 'src/app/interfaces/profesores';

import { from, of } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';

import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-post-carreras',
  templateUrl: './post-carreras.component.html',
  styleUrls: ['./post-carreras.component.css']
})
export class PostCarrerasComponent implements OnInit {
  id: number = 0;

  // !Forms
  carreraForm!: FormGroup;
  atributosForm!: FormGroup;
  objetivosForm!: FormGroup; 
  competenciasForm!: FormGroup; 
  pdfForm!: FormGroup

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
    competenciasEspecificas: [
      {carreraId: 0, descripcion: ""}
    ],
    
    catalogoAsignatura: {
      carreraId: this.id, 
      nombreArchivo: "Catalogo Asignatura",
      rutaArchivo: null as any, 
    },
    mapaTutorial: {
      carreraId: this.id,
      nombreArchivo: "Mapa Tutorial",
      rutaArchivo: null as any
    },
    listadoMaterias: {
      carreraId: this.id,
      nombreArchivo: "Listado Materias",
      rutaArchivo: null as any
    },
    listadoMateriasOptativas: {
      carreraId: this.id,
      nombreArchivo: "Listado de materias Optativas",
      rutaArchivo: null as any
    }
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
  competenciasEspecíficasNuevo: CompetenciasEspecificasDto = {
    descripcion: "",
    carreraId: this.id,
  };

  dataSource = new MatTableDataSource(this.nuevaCarrera.atributosEducacionales)
  dataSourceObejtivosEduc = new MatTableDataSource(this.nuevaCarrera.objetivosEducacionales)
  dataSourceCompetencias = new MatTableDataSource(this.nuevaCarrera.competenciasEspecificas)
  displayedColumns: string[] = ["atributos", "Acciones"]; 
  
  profesores: ProfesorDto[] = []
  profesorSeleccionado: number = 1;

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
        competenciasNuevo: [this.competenciasEspecíficasNuevo.descripcion, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/)])]
      });

      this.pdfForm = this._fb.group({
        cataogoAsignaturas: [this.nuevaCarrera.catalogoAsignatura.rutaArchivo, Validators.required],
        mapaTutorial: [this.nuevaCarrera.mapaTutorial.rutaArchivo, Validators.required],
        listadoMaterias: [this.nuevaCarrera.listadoMaterias.rutaArchivo, Validators.required],
        listadoMateriasOp: [this.nuevaCarrera.listadoMateriasOptativas.rutaArchivo, Validators.required],
      })

      this.getProfesores();
    }

    postLicenciatura(form: FormGroupDirective){ 
      const formData = new FormData();

      const files = [] as any[];
      files.push(this.nuevaCarrera.catalogoAsignatura)
      files.push(this.nuevaCarrera.mapaTutorial)
      files.push(this.nuevaCarrera.listadoMaterias)
      files.push(this.nuevaCarrera.listadoMateriasOptativas)
      console.log(files)

      this.nuevaCarrera.carreraNombre = this.carreraForm.get("nombre")?.value,
      this.nuevaCarrera.mision = this.carreraForm.get("mision")?.value,
      this.nuevaCarrera.vision = this.carreraForm.get("vision")?.value,
      this.nuevaCarrera.objetivos = this.carreraForm.get("objetivos")?.value

      formData.append("CarreraNombre", this.nuevaCarrera.carreraNombre.toString());
      formData.append("Mision", this.nuevaCarrera.mision.toString());
      formData.append("Vision", this.nuevaCarrera.vision.toString());
      formData.append("Objetivos", this.nuevaCarrera.objetivos.toString());
      
      files.forEach((rutaArchivo, index) => {
        formData.append(`rutaArchivo${index}`, rutaArchivo.rutaArchivo)
        formData.append(`rutaArchivo:${index}`, JSON.stringify({
          carreraId: rutaArchivo.carreraId,  
          nombreArchivo: rutaArchivo.nombreArchivo
        }))
      })

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      })
      
      this._carreraPostService.postLicenciatura(formData).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err: HttpErrorResponse) => {
          this.alerta("Error al enviar el documento");
          console.log(err.error);
          if(err.error.errors){
            for(const key in err.error.errors){
              if (err.error.errors.hasOwnProperty(key)) {
                console.error(`${key}: ${err.error.errors[key]}`);
              }
            }
          }
        },
        complete: () => {
          console.log("Carrera Guardada");
          this.alerta("Documento cargado correctamente");
        }
      })

      this.nuevaCarreraCreada = true
      this.alerta("Nueva carrera creada")
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
      if(this.competenciasForm.get("competenciasNuevo")?.value != ""){
        this.competenciasEspecíficasNuevo.descripcion = this.competenciasForm.get("competenciasNuevo")?.value

        const nuevaCompetencia = {...this.competenciasEspecíficasNuevo}

        this.nuevaCarrera.competenciasEspecificas.push(nuevaCompetencia)
        this.dataSourceCompetencias = new MatTableDataSource(this.nuevaCarrera.competenciasEspecificas)
        this.table.renderRows() 
        this.alerta("Nueva competencia añadida")
      }
      else{
        this.alerta("Campo vacio")
      }      
    }

    removeData(i: number): void {
      this.nuevaCarrera.atributosEducacionales.splice(i, 1)
      this.dataSource = new MatTableDataSource(this.nuevaCarrera.atributosEducacionales)
      this.table.renderRows();
      this.alerta("Atributo eliminado")
    }

    removeCompetenciasEspecificas(i: number){
      this.nuevaCarrera.competenciasEspecificas.splice(i, 1);
      this.dataSourceCompetencias = new MatTableDataSource(this.nuevaCarrera.competenciasEspecificas)
      this.table.renderRows();
      this.alerta("Cometencia elimindada")
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
    
    // Carga los archivos
    onFileSelected(event: any, fieldType: string): void {
      const rutaArchivo: File = event.target.files[0];
  
      const actions: {[key: string]: () => void} = {
        catalogoAsignaturas: () => {this.nuevaCarrera.catalogoAsignatura.rutaArchivo = rutaArchivo},
        mapaTutorial: () => {this.nuevaCarrera.mapaTutorial.rutaArchivo = rutaArchivo},
        listadoMaterias: () => {this.nuevaCarrera.listadoMaterias.rutaArchivo = rutaArchivo},
        listadoMateriasOp: () => {this.nuevaCarrera.listadoMateriasOptativas.rutaArchivo = rutaArchivo}
      }
  
      if(actions[fieldType]) {
        actions[fieldType]()
      }
    }
}
