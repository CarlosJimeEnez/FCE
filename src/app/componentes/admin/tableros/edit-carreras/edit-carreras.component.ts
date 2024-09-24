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
import { Observable } from 'rxjs';

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

  atributoNuevo: AtributosEducacionales = { descripcion: "", carreraId: 0 }
  objetivoEducacionalNuevo: ObjetivosEducacionalesDto = { descripcion: "", carreraId: 0 }
  competenciasNuevo: CompetenciasEspecificasDto = { descripcion: "", carreraId: 0 }

  // ---------------------------------- Forms ----------------------------------
  nombreForm!: FormGroup
  pdfForm!: FormGroup

  catalogoAsignatura: DocumentosDto = {
    carreraId: 0,
    nombreArchivo: "Catalogo Asignatura",
    file: null as any,
    rutaArchivo: "",
  }
  mapaTutorial: DocumentosDto = {
    carreraId: 0,
    nombreArchivo: "Mapa Tutorial",
    file: null as any,
    rutaArchivo: "",
  }
  listadoMaterias: DocumentosDto = {
    carreraId: 0,
    nombreArchivo: "Listado materias",
    file: null as any,
    rutaArchivo: "",
  }
  listadoMateriasOptativas: DocumentosDto = {
    carreraId: 0,
    nombreArchivo: "Listado de materias Optativas",
    file: null as any,
    rutaArchivo: "",
  }
  animal: string = "panda"
  carreraCargada: boolean = false


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
  ) {
    this.id = +this._route.snapshot.paramMap.get('id')!;
  }

  @ViewChild(MatTable) table!: MatTable<AtributosEducacionales>;

  ngOnInit(): void {
    this.atributoNuevo.carreraId = this.id;
    this.carrera.id = this.id;
    this.carrera.carreraNombre = this._route.snapshot.queryParamMap.get('carreraNombre')!;

    this.atributoNuevo = {
      descripcion: "",
      carreraId: this.id
    };
    this.objetivoEducacionalNuevo = {
      descripcion: "",
      carreraId: this.id
    };
    this.competenciasNuevo = {
      descripcion: "",
      carreraId: this.id
    };

    // Inicializa los formularios reactivos para la edición de la carrera y la carga de archivos PDF
    // Formulario para los datos de la carrera (nombre, misión, visión, objetivos)
    this.nombreForm = this._fb.group({
      nombre: [this.carrera.carreraNombre, Validators.required],
      mision: [this.carrera.mision, Validators.required],
      vision: [this.carrera.vision, Validators.required],
      objetivo: [this.carrera.objetivos, Validators.required],
    })

    // Formulario para la carga de archivos PDF relacionados con la carrera
    this.pdfForm = this._fb.group({
      catalogoAsignaturas: [this.catalogoAsignatura.file, Validators.required],
      mapaTutorial: [this.mapaTutorial.file, Validators.required],
      listadoMaterias: [this.listadoMaterias.file, Validators.required],
      listadoMateriasOp: [this.listadoMateriasOptativas.file, Validators.required],
    })

    this.getCarreraById(this.id);
    this.getAtributos(this.id);
    this.getObjetivosEducacionalesByCarreraId(this.id);
    this.getCompetenciasEspecificasByCarreraId(this.id);
    this.getProfesoresDeCarrera(this.id);
  }

  onSubmitNombreForm() {
    this.carrera.carreraNombre = this.nombreForm.get("nombre")?.value;
    this.carrera.mision = this.nombreForm.get("mision")?.value;
    this.carrera.vision = this.nombreForm.get("vision")?.value;
    this.carrera.objetivos = this.nombreForm.get("objetivo")?.value;

    this._carreraPutService.putCarreraMetadata(this.carrera).subscribe({
      next: (data: any) => { },
      error: (err: any) => {
        console.log(err);
        this.alerta("Error al editar")
      },
      complete: () => {
        this.alerta("Editado correcatamente")
      },
    })
  }

  onFileSelected(event: any, fieldType: string): void {
    const file: File = event.target.files[0];

    const actions: { [key: string]: () => void } = {
      catalogoAsignaturas: () => {
        this.catalogoAsignatura.file = file
      },
      mapaTutorial: () => { this.mapaTutorial.file = file },
      listadoMaterias: () => { this.listadoMaterias.file = file },
      listadoMateriasOp: () => { this.listadoMateriasOptativas.file = file }
    }

    if (actions[fieldType]) {
      actions[fieldType]()
    }
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.pdfForm.get(fieldName)!;
    return control && control.value !== null && control.value !== "";
  }

  /**
 * Sube un archivo al servidor y maneja la respuesta.
 * 
 * @param serviceMethod - Método del servicio que realiza la solicitud HTTP.
 * @param fileData - Datos del archivo que se va a subir.
 * @param id - El ID asociado al archivo.
 * @param successMessage - Mensaje de éxito que se muestra al completar la solicitud.
 */
  private uploadFile(serviceMethod: (formData: FormData, id: number) => Observable<any>, fileData: any, id: number, successMessage: string): void {
    const formData = new FormData();
    fileData.carreraId = id;

    formData.append("carreraId", fileData.carreraId.toString());
    formData.append("nombreArchivo", fileData.nombreArchivo);
    formData.append("file", fileData.file);
    formData.append("rutaArchivo", "ruta"); // Añadir el campo RutaArchivo

    serviceMethod(formData, id).subscribe({
      next: (data: any) => {

      },
      error: (err: HttpErrorResponse) => {
        this.alerta("Error al enviar el documento");
        console.log(err.error);
        if (err.error.errors) {
          for (const key in err.error.errors) {
            if (err.error.errors.hasOwnProperty(key)) {
              console.error(`${key}: ${err.error.errors[key]}`);
            }
          }
        }
      },
      complete: () => {
        this.alerta(successMessage);
      }
    });
  }

  cambiarMapaTutorialUrl(): void {
    this.uploadFile(this._carreraPutService.putMapaTutorialAsignaturas.bind(this._carreraPutService), this.mapaTutorial, this.id, "Mapa tutorial cargado correctamente");
  }

  cambiarListadoMaterias(): void {
    this.uploadFile(this._carreraPutService.putListadoMaterias.bind(this._carreraPutService), this.listadoMaterias, this.id, "Listado de materias cargado correctamente");
  }

  cambiarCatalogoAsigUrl(): void {
    this.uploadFile(this._carreraPutService.putCatalogosAsignaturas.bind(this._carreraPutService), this.catalogoAsignatura, this.id, "Catálogo de asignaturas cargado correctamente");
  }


  cambiarListadoMateriasOp(): void {
    this.uploadFile(this._carreraPutService.putListadoMateriasOptativas.bind(this._carreraPutService), this.listadoMateriasOptativas, this.id, "Listado de materias optativas cargado correctamente");
  }

  getAtributos(carreraId: number): void {
    this._carreraService.getAtributosEgresoByCarreraId(carreraId).subscribe(data => {
      console.log(data);
      this.atributosEducacionales = data
      this.dataSource = new MatTableDataSource(this.atributosEducacionales);
    }, error => console.log(error))
  }

  getProfesoresDeCarrera(id: number) {
    this._profesoresService.getProfesorPorCarreraId(id).subscribe({
      next: (data: ProfesorDTO[]) => {
        this.profesores = data
        this.dataSourceProfesores = new MatTableDataSource(this.profesores)
      },
      error: (error: any) => console.log(error),
      complete: () => {
      }
    })
  }

  getCarreraById(id: number) {
    this._carreraService.getCarrera(id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.carrera.carreraNombre = data.carreraNombre
        this.carrera.mision = data.mision
        this.carrera.objetivos = data.objetivos
        this.carrera.vision = data.vision

      },
      error: (error: any) => console.log(error),
      complete: () => {
        console.log("Carrera cargada completamente");
        this.carreraCargada = true
      }
    })
  }

  getObjetivosEducacionalesByCarreraId(carreraId: number) {
    this._carreraService.getObjetivosEducacionalesByCarreraId(carreraId).subscribe(data => {
      console.log(data);
      this.objetivosEducacionales = data
      this.dataSourceObejtivosEduc = new MatTableDataSource(this.objetivosEducacionales);
    }, err => {
      console.log(err);
    })
  }

  getCompetenciasEspecificasByCarreraId(carreraId: number) {
    this._carreraService.getCompetenciasEspecificasByCarreraId(carreraId).subscribe(data => {
      console.log(data);
      this.competenciasEspecíficas = data
      this.dataSourceCompetencias = new MatTableDataSource(this.competenciasEspecíficas);
    }, err => {
      console.log(err);
    })
  }

  addAtributo() {
    if (this.atributoNuevo.descripcion != "") {
      this._carreraPostService.postAtributoEgreso(this.atributoNuevo).subscribe({
        next: (data) => {
          this.getAtributos(this.id);
          this.table.renderRows();
        },
        error: (err) => {
          console.log(err.error);
          if (err.error.errors) {
            for (const key in err.error.errors) {
              if (err.error.errors.hasOwnProperty(key)) {
                console.error(`${key}: ${err.error.errors[key]}`);
              }
            }
          }
        },
        complete: () => {
          this.alerta("Petición exitosa")
        }
      });
    } else {
      this.alerta("Lista vacia")
    }
  }

  addObjetivoEduc() {
    if (this.objetivoEducacionalNuevo.descripcion != "") {
      console.log(this.objetivoEducacionalNuevo)
      this._carreraPostService.postObjetivoEducacional(this.objetivoEducacionalNuevo).subscribe({
        next: (data) => {
          this.getObjetivosEducacionalesByCarreraId(this.id);
          this.table.renderRows();
        },
        error: (err) => {
          console.log(err.error);
          if (err.error.errors) {
            for (const key in err.error.errors) {
              if (err.error.errors.hasOwnProperty(key)) {
                console.error(`${key}: ${err.error.errors[key]}`);
              }
            }
          }
        },
        complete: () => {
          console.log("Request completed");
        }
      });
    }
    else {
      this.alerta("Lista vacia")
    }
  }

  addCompetencias() {
    if (this.competenciasNuevo.descripcion != "") {
      this._carreraPostService.postCompetenciasEspecificas(this.competenciasNuevo).subscribe(data => {
        this.alerta("Petición Exitosa")
        this.getCompetenciasEspecificasByCarreraId(this.id)
        this.table.renderRows();
      },
        err => {
          console.log(err);
          this.alerta("Error en la petición")
        })
    }
    else {
      this.alerta("Lista vacia")
    }
  }

  removeData(atributo: AtributosEducacionales) {
    console.log(atributo)
    this._carreraDeleteService.deleteAtributosEgreso(atributo).subscribe(data => {
      console.log(data);
      this.alerta("Petición exitosa")
      this.getAtributos(this.id);
      this.table.renderRows();
    }, error => {
      console.log(error)
      this.alerta("Error en la petición")
    }
    )
  }

  removeObjetivoEducacional(objetivo: ObjetivosEducacionalesDto) {
    this._carreraDeleteService.deleteObejtivoEducacionales(objetivo).subscribe(data => {
      console.log(data);
      this.alerta("Petición exitosa")
      this.getObjetivosEducacionalesByCarreraId(this.id);
      this.table.renderRows();
    }, error => {
      console.log(error)
      this.alerta("Error en la petición")
    }
    )
  }

  removeCompetenciasEspecificas(competencia: CompetenciasEspecificasDto) {
    this._carreraDeleteService.deleteCompetenciaEspecifica(competencia).subscribe(data => {
      console.log(data);
      this.alerta("Petición exitosa")
      this.getCompetenciasEspecificasByCarreraId(this.id);
      this.table.renderRows();
    }, error => {
      console.log(error)
      this.alerta("Error en la petición")
    }
    )
  }

  alerta(message: string) {
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

    this._router.navigate(['admin/carrera/editarRolProfesor'], { queryParams: { profesor: JSON.stringify(profesorSelected), carreraId: JSON.stringify(this.id) } });
  }

  addProfesor(): void {
    this._router.navigate(['admin/add-profesor/carrera'], { queryParams: { carreraId: JSON.stringify(this.carrera.id) } });
  }

  back() {
    this._router.navigate(['admin/inicio']);
  }

  cancelFile(data: string): void {
    this.clearFileInput(data);
  }

  clearFileInput(fieldType: string): void {
    this.pdfForm.get(fieldType)?.reset();
  }
}
