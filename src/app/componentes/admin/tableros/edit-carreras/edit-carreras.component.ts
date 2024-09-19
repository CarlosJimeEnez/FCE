import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AtributosEducacionales, CarreraDto } from 'src/app/interfaces/carrera';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { PostCarrerasService } from 'src/app/services/carreras/post-carreras.service';
import { PutCarrerasServiceService } from 'src/app/services/carreras/put-carreras-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompetenciasEspecificasDto, ObjetivosEducacionalesDto } from 'src/app/interfaces/Dto';
import { DeleteCarrerasService } from 'src/app/services/carreras/delete-carreras.service';
import { GetProfesoresService } from 'src/app/services/profesores/get-profesores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentosDto } from 'src/app/interfaces/documento';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfesorDTO } from 'src/app/interfaces/profesores';

@Component({
  selector: 'app-edit-carreras',
  templateUrl: './edit-carreras.component.html',
  styleUrls: ['./edit-carreras.component.css']
})

export class EditCarrerasComponent implements OnInit {
 
  id!: number;
  atributosEducacionales: AtributosEducacionales[] = [];
  objetivosEducacionales: ObjetivosEducacionalesDto[] = [];
  competenciasEspecíficas: CompetenciasEspecificasDto[] = [];
  profesores: ProfesorDTO[] = [];

  dataSource = new MatTableDataSource(this.atributosEducacionales)
  dataSourceObejtivosEduc = new MatTableDataSource(this.objetivosEducacionales)
  dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas)
  dataSourceProfesores = new MatTableDataSource(this.profesores)

  displayedColumns: string[] = ["atributos", "Acciones"]; 
  displayedColumnsProfesores: string[] = ["nombre", "rol", "acciones"]

  carrera: CarreraDto = {
    carreraNombre: "", 
    mision: "",
    vision: "",
    objetivos: "" 
  }
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

  // Forms
  nombreForm!: FormGroup
  pdfForm!: FormGroup

  ////////////////////////////////  
  catalogoAsignatura: DocumentosDto = {
    carreraId: 0, 
    nombreArchivo: "Catalogo Asignatura",
    rutaArchivo: null as any
  }
  mapaTutorial: DocumentosDto = {
    carreraId: 0, 
    nombreArchivo: "Mapa Tutorial",
    rutaArchivo: null as any
  }
  listadoMaterias: DocumentosDto = {
    carreraId: 0, 
    nombreArchivo: "Listado materias",
    rutaArchivo: null as any
  }
  listadoMateriasOptativas: DocumentosDto = {
    carreraId: 0, 
    nombreArchivo: "Listado de materias Optativas",
    rutaArchivo: null as any
  }

  animal: string = "panda" 

  constructor(
    private _fb: FormBuilder, 
    private _carreraService: CarrerasServicesService,
    private _route: ActivatedRoute,
    private _carreraPostService: PostCarrerasService,
    private _carreraPutService: PutCarrerasServiceService,
    private _carreraDeleteService: DeleteCarrerasService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _profesoresService: GetProfesoresService,
    )
    {
      this.id = +this._route.snapshot.paramMap.get('id')!;
    }

  @ViewChild(MatTable) table!: MatTable<AtributosEducacionales>;
  
  ngOnInit(): void {
    
    this.atributoNuevo.carreraId = this.id;
    this.competenciasNuevo.carreraId = this.id;

    this.carrera.id = this.id;
    this.carrera.carreraNombre = this._route.snapshot.queryParamMap.get('carreraNombre')!;
    
    this.nombreForm = this._fb.group({
      nombre: [this.carrera.carreraNombre, Validators.required],
      mision: [this.carrera.mision, Validators.required],
      vision: [this.carrera.vision, Validators.required],
      objetivo: [this.carrera.objetivos, Validators.required],
    })

    this.pdfForm = this._fb.group({
      catalogoAsignaturas: [this.catalogoAsignatura.rutaArchivo, Validators.required],
      mapaTutorial: [this.mapaTutorial.rutaArchivo, Validators.required],
      listadoMaterias: [this.listadoMaterias.rutaArchivo, Validators.required],
      listadoMateriasOp: [this.listadoMateriasOptativas.rutaArchivo, Validators.required],
    })

    this.getAtributos(this.id);
    this.getObjetivosEducacionalesByCarreraId(this.id);
    this.getCompetenciasEspecificasByCarreraId(this.id);
    this.getProfesoresDeCarrera(this.id);
  }

  onSubmitNombreForm(){
    console.log("onSubmitNombreForm");
    this.carrera.carreraNombre = this.nombreForm.get("nombre")?.value;
    this.carrera.mision = this.nombreForm.get("mision")?.value;
    this.carrera.vision = this.nombreForm.get("vision")?.value;
    this.carrera.objetivos = this.nombreForm.get("objetivo")?.value;
    this._carreraPutService.putCarreraMetadata(this.carrera).subscribe({
      next: (data: any) => {},
      error: (err: any) => {
        console.log(err);
        this.alerta("Error al editar")
      },
      complete: () => {
        console.log("complete");
        this.alerta("Editado correcatamente")
      },
    })

  }

  onFileSelected(event: any, fieldType: string): void {
    const rutaArchivo: File = event.target.files[0];

    const actions: {[key: string]: () => void} = {
      catalogoAsignaturas: () => {
        this.catalogoAsignatura.rutaArchivo = rutaArchivo
      }, 
      mapaTutorial: () => {this.mapaTutorial.rutaArchivo = rutaArchivo},
      listadoMaterias: () => {this.listadoMaterias.rutaArchivo = rutaArchivo},
      listadoMateriasOp: () => {this.listadoMateriasOptativas.rutaArchivo = rutaArchivo}
    }

    if(actions[fieldType]) {
      actions[fieldType]()
    }
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.pdfForm.get(fieldName)!;
    return control && control.value !== null && control.value !== ""; 
  }
  
  cambiarCatalogoAsigUrl(){
    console.log("Cambiar Catalogo de Asignatura...")

    const formData = new FormData(); 
    this.catalogoAsignatura.carreraId = this.id

    formData.append("carreraId", this.catalogoAsignatura.carreraId.toString()); 
    formData.append("nombreArchivo", this.catalogoAsignatura.nombreArchivo); 
    formData.append("rutaArchivo", this.catalogoAsignatura.rutaArchivo);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
    this._carreraPutService.putCatalogosAsignaturas(formData, this.id).subscribe({
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
        console.log("Complete put");
        this.alerta("Documento cargado correctamente");
      }
    })
  }

  cambiarMapaTutorialUrl(){
    console.log("Cambiar mapa Tutorial ...") 
    const formData = new FormData(); 
    this.mapaTutorial.carreraId = this.id

    formData.append("carreraId", this.mapaTutorial.carreraId.toString()); 
    formData.append("nombreArchivo", this.mapaTutorial.nombreArchivo); 
    formData.append("rutaArchivo", this.mapaTutorial.rutaArchivo);

    this._carreraPutService.putMapaTutorialAsignaturas(formData, this.id).subscribe({
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
        console.log("Complete put");
        this.alerta("Documento cargado correctamente");
      }
    })
  }

  cambiarListadoMaterias(){
    console.log("Cambiar Listado Materias ...") 
    const formData = new FormData(); 
    this.listadoMaterias.carreraId = this.id

    formData.append("carreraId", this.listadoMaterias.carreraId.toString()); 
    formData.append("nombreArchivo", this.listadoMaterias.nombreArchivo); 
    formData.append("rutaArchivo", this.listadoMaterias.rutaArchivo);

    this._carreraPutService.putListadoMaterias(formData, this.id).subscribe({
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
        console.log("Complete put");
        this.alerta("Documento cargado correctamente");
      }
    })
  }

  cambiarListadoMateriasOp(){
    console.log("Cambiar Listado Materias ...") 
    const formData = new FormData(); 
    this.listadoMateriasOptativas.carreraId = this.id

    formData.append("carreraId", this.listadoMateriasOptativas.carreraId.toString()); 
    formData.append("nombreArchivo", this.listadoMateriasOptativas.nombreArchivo); 
    formData.append("rutaArchivo", this.listadoMateriasOptativas.rutaArchivo);

    this._carreraPutService.putListadoMaterias(formData, this.id).subscribe({
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
        console.log("Complete put");
        this.alerta("Documento cargado correctamente");
      }
    })
  }

  getAtributos(carreraId: number):void{
    this._carreraService.getAtributosEgresoByCarreraId(carreraId).subscribe(data => {
      console.log(data);
      this.atributosEducacionales = data
      this.dataSource = new MatTableDataSource(this.atributosEducacionales);
    }, error => console.log(error))
  }

  getProfesoresDeCarrera(id: number){
    this._profesoresService.getProfesorPorCarreraId(id).subscribe({
      next: (data: ProfesorDTO[]) => {
        this.profesores = data
        console.log(this.profesores)
        this.dataSourceProfesores = new MatTableDataSource(this.profesores)
      },
      error: (error: any) => console.log(error),
      complete: () => {
        console.log("Profesores por carrera cargado completamente");
      }
    })
  }

  getObjetivosEducacionalesByCarreraId(carreraId: number){
    this._carreraService.getObjetivosEducacionalesByCarreraId(carreraId).subscribe(data => {
      console.log(data);
      this.objetivosEducacionales = data
      this.dataSourceObejtivosEduc = new MatTableDataSource(this.objetivosEducacionales);
    }, err => {
      console.log(err);
    })
  }

  getCompetenciasEspecificasByCarreraId(carreraId: number){
    this._carreraService.getCompetenciasEspecificasByCarreraId(carreraId).subscribe(data => {
      console.log(data);
      this.competenciasEspecíficas = data
      this.dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas);
    }, err => {
      console.log(err);
    })
  }

  addData() {
    if(this.atributoNuevo.descripcion != ""){
      this._carreraPostService.postAtributosEgreso(this.atributoNuevo).subscribe(data =>
        {
          this.alerta("Petición Exitosa")
          this.getAtributos(this.id)
          this.table.renderRows();
        }, 
        err => {
          console.log(err);
          this.alerta("Error en la petición")
        })
    }
    else
    {
      this.alerta("Lista vacia")
    }
  }

  addObjetivoEduc(){
    if(this.objetivoEducacionalNuevo.descripcion != "")
    {
      this._carreraPostService.postObjetivoEducacional(this.objetivoEducacionalNuevo).subscribe(data =>
        {
          console.log(data)
          this.getObjetivosEducacionalesByCarreraId(this.id)
          this.table.renderRows()
        },
        err =>
        {
          console.log(err)
        })
    }
    else{
      this.alerta("Lista vacia")
    }
  }

  addCompetencias() {
    if(this.competenciasNuevo.descripcion != ""){
      this._carreraPostService.postCompetenciasEspecificas(this.competenciasNuevo).subscribe(data =>
        {
          console.log(data)
          this.alerta("Petición Exitosa")
          this.getCompetenciasEspecificasByCarreraId(this.id)
          this.table.renderRows();
        }, 
        err => {
          console.log(err);
          this.alerta("Error en la petición")
        })
    }
    else
    {
      this.alerta("Lista vacia")
    }
  }

  removeData(atributo: AtributosEducacionales){
    console.log(atributo)
    this._carreraDeleteService.deleteAtributosEgreso(atributo).subscribe(data =>
      {
        console.log(data);
        this.alerta("Petición exitosa")
        this.getAtributos(this.id);
        this.table.renderRows();
      }, error =>
      {
        console.log(error)
        this.alerta("Error en la petición")        
      } 
    )
  }

  removeObjetivoEducacional(objetivo: ObjetivosEducacionalesDto){
    this._carreraDeleteService.deleteObejtivoEducacionales(objetivo).subscribe(data =>
      {
        console.log(data);
        this.alerta("Petición exitosa")
        this.getObjetivosEducacionalesByCarreraId(this.id);
        this.table.renderRows();
      }, error =>
      {
        console.log(error)
        this.alerta("Error en la petición")        
      } 
    )
  }

  removeCompetenciasEspecificas(competencia: CompetenciasEspecificasDto){
    this._carreraDeleteService.deleteCompetenciaEspecifica(competencia).subscribe(data =>
      {
        console.log(data);
        this.alerta("Petición exitosa")
        this.getCompetenciasEspecificasByCarreraId(this.id);
        this.table.renderRows();
      }, error =>
      {
        console.log(error)
        this.alerta("Error en la petición")        
      } 
    )
  }
  
  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    });
  }

  editarRolProfesor(profesor: ProfesorDTO, index: number): void {
    const profesorSelected = this.profesores[index]
    console.log("ProfesorSelected: " + profesorSelected.profesorId)
    console.log(profesorSelected) 

    this._router.navigate(['admin/carrera/editarRolProfesor'], { queryParams: {profesor: JSON.stringify(profesorSelected), carreraId: JSON.stringify(this.id)}});
  }

  addProfesor():void{
    this._router.navigate(['admin/add-profesor/carrera'], {queryParams: {carreraId: JSON.stringify(this.carrera.id)}});
  }

  back(){
    this._router.navigate(['admin/inicio']);
  }
}
