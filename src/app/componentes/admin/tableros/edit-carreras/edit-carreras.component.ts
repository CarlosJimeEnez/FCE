import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AtributosEducacionales, CarreraDto } from 'src/app/interfaces/carrera';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { PostCarrerasService } from 'src/app/services/carreras/post-carreras.service';
import { PutCarrerasServiceService } from 'src/app/services/carreras/put-carreras-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarreraCatAsignaturasDto, CarreraListadoMateriasDto, CarreraListadoOpURLDto, CarreraMapaTutorialDto, CarreraMisionDto, CarreraObjetivosDto, CarreranombreDto, CompetenciasEspecificasDto, CoordinadorDto, ObjetivosEducacionalesDto } from 'src/app/interfaces/Dto';
import { DeleteCarrerasService } from 'src/app/services/carreras/delete-carreras.service';
import { GetProfesoresService } from 'src/app/services/profesores/get-profesores.service';
import { Profesor } from 'src/app/interfaces/profesores';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentosDto } from 'src/app/interfaces/documento';
  
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

  dataSource = new MatTableDataSource(this.atributosEducacionales)
  dataSourceObejtivosEduc = new MatTableDataSource(this.objetivosEducacionales)
  dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas)
  
  displayedColumns: string[] = ["atributos", "Acciones"]; 
  
  // DTO
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
  carreraNombreDto!: CarreranombreDto
  carreraMisionVis!: CarreraMisionDto
  carreraObjetivo!: CarreraObjetivosDto
  
  catalogosAsignaturasURL!: CarreraCatAsignaturasDto

  mapaTutorial: DocumentosDto = {
    nombreArchivo: "",
    file: null as any
  }

  listadoMaterias!: CarreraListadoMateriasDto
  listadoMateriasOptativas!: CarreraListadoOpURLDto
  profesores: Profesor[] = []
  profesorSeleccionado: number | null = null;
  coordinador!: CoordinadorDto

  constructor(private _carreraService: CarrerasServicesService,
    private _fb: FormBuilder, 
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

      console.log(this.id);

      this.carreraNombreDto = {
        id: this.id,
        nombre: ""
      }

      this.carreraMisionVis = {
        id: this.id,
        mision: "",
        vision: "",
      }

      this.carreraObjetivo = {
        id: this.id,
        objetivos: ""
      }

      this.catalogosAsignaturasURL = {
        carreraId: this.id,
        catalogoAsignaturaUrl: "",
      }

      this.listadoMaterias = {
        carreraId: this.id,
        listadoMateriasUrl: "",
      }

      this.listadoMateriasOptativas = {
        carreraId: this.id,
        listadoMateriasOpURL: "",
      }

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
      catalogoAsignaturas: ["", Validators.required],
      mapaTutorial: ["", Validators.required],
      listadoMaterias: ["", Validators.required],
      listadoMateriasOp: ["", Validators.required],
    })

    this.getAtributos(this.id);
    this.getObjetivosEducacionalesByCarreraId(this.id);
    this.getCompetenciasEspecificasByCarreraId(this.id);
    this.getProfesores()
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.mapaTutorial.file = file;
    }
  }

  getProfesores() {
    this._profesoresService.getProfesores().subscribe(profesores =>
      {
        console.log(profesores);
        this.profesores = profesores;
      })
  }

  getAtributos(carreraId: number):void{
    this._carreraService.getAtributosEgresoByCarreraId(carreraId).subscribe(data => {
      console.log(data);
      this.atributosEducacionales = data
      this.dataSource = new MatTableDataSource(this.atributosEducacionales);
    }, error => console.log(error))
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

  cambiarNombre(carreraNombre: CarreranombreDto){
    if(carreraNombre.nombre != ""){
      this._carreraPutService.putCarreraNombre(carreraNombre).subscribe(data => 
        {
          console.log(data);
          this.alerta("Peticion Exitosa")
        }, err => {
          this.alerta("Error peticion")
        }
      )
    } 
    else
    {
      this.alerta("Nombre vacio")
    }
  }

  cambiarMision(carrera: CarreraMisionDto){
    if(carrera.mision != "" && carrera.vision != ""){
      this._carreraPutService.putCarreraMision(carrera).subscribe(data => 
        {
          console.log(data);
          this.alerta("Peticion Exitosa")
        }, err => {
          this.alerta("Error peticion")
        }
      )
    } 
    else
    {
      this.alerta("Misión o visión vacio")
    }
  }

  cambiarObjetivo(carrera: CarreraObjetivosDto){
    if(carrera.objetivos != ""){
      this._carreraPutService.putCarreraObjetivos(carrera).subscribe(data => 
        {
          console.log(data);
          this.alerta("Peticion Exitosa")
        }, err => {
          this.alerta("Error peticion")
        }
      )
    } 
    else
    {
      this.alerta("Objetivos vacio")
    }
  }

  cambiarCatalogoAsigURL(catalogoAsignaturaURL: CarreraCatAsignaturasDto){
    console.log(catalogoAsignaturaURL)
    if(catalogoAsignaturaURL.catalogoAsignaturaUrl != ""){
      this._carreraPutService.putCarreraCatAsignaturas(catalogoAsignaturaURL).subscribe(data => 
        {
          console.log(data);
          this.alerta("Peticion Exitosa")
        }, err => {
          console.log(err);
          this.alerta("Error peticion")
        }
      )
    } 
    else
    {
      this.alerta("Objetivos vacio")
    }
  }

  cambiarMapaTutorialURL(mapaTutorial: CarreraMapaTutorialDto){
    console.log(mapaTutorial)
    if(mapaTutorial.mapaTutorialUrl != ""){
      this._carreraPutService.putMapaTutorial(mapaTutorial).subscribe(data => 
        {
          console.log(data);
          this.alerta("Peticion Exitosa")
        }, err => {
          console.log(err);
          this.alerta("Error peticion")
        }
      )
    } 
    else
    {
      this.alerta("Objetivos vacio")
    }
  }

  cambiarListadoMateriasURL(listadoMaterias: CarreraListadoMateriasDto){
    console.log(listadoMaterias)
    if(listadoMaterias.listadoMateriasUrl != ""){
      this._carreraPutService.putListadoMaterias(listadoMaterias).subscribe(data => 
        {
          console.log(data);
          this.alerta("Peticion Exitosa")
        }, err => {
          console.log(err);
          this.alerta("Error peticion")
        }
      )
    } 
    else
    {
      this.alerta("Objetivos vacio")
    }
  }

  cambiarListadoMateriasOptativasURL(listadoMateriasOptativas: CarreraListadoOpURLDto){
    console.log(listadoMateriasOptativas)
    if(listadoMateriasOptativas.listadoMateriasOpURL != ""){
      this._carreraPutService.putListadoMateriasOptativas(listadoMateriasOptativas).subscribe(data => 
        {
          console.log(data);
          this.alerta("Peticion Exitosa")
        }, err => {
          console.log(err);
          this.alerta("Error peticion")
        }
      )
    } 
    else
    {
      this.alerta("Objetivos vacio")
    }
  }

  cambiarProfesor(){
    if(this.profesores != null){
      const profesor: Profesor = this.profesores[this.profesorSeleccionado!-1]
      
      this.coordinador = {
        carreraId: this.id,
        contactoId: profesor.profesoresId
      }
      console.log(this.coordinador)

      this._carreraPutService.putProfesor(this.coordinador).subscribe(data =>
        {
          console.log(profesor);
          this.alerta("Petición exitosa")
        }, err => 
        {
          console.log(err);
          this.alerta("Error en la petición")
        });
    }
  }
  
  alerta(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 2000,
      verticalPosition: "bottom",
      horizontalPosition: 'right'
    });
  }

  nuevaCarrera(){
    this._router.navigate(['nuevaCarrera']);
  }

  back(){
    this._router.navigate(['admin/inicio']);
  }

}
