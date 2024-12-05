import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CarreraPostDto } from 'src/app/interfaces/carrera';
import { PostCarrerasService } from 'src/app/services/carreras/post-carreras.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AtributoEgresoDto,
  CarreraCatAsignaturasDto,
  CarreraListadoMateriasDto,
  CarreraListadoOpURLDto,
  CarreraMapaTutorialDto,
  CarreraMisionDto,
  CarreraObjetivosDto,
  CarreranombreDto,
  CompetenciasEspecificasDto,
  CoordinadorDto,
  ObjetivosEducacionalesDto,
} from 'src/app/interfaces/Dto';
import { GetProfesoresService } from 'src/app/services/profesores/get-profesores.service';
import { ProfesorDto } from 'src/app/interfaces/profesores';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-carreras',
  templateUrl: './post-carreras.component.html',
  styleUrls: ['./post-carreras.component.css'],
})
export class PostCarrerasComponent implements OnInit {
  id: number = 0;
  carreraForm!: FormGroup;
  atributosForm!: FormGroup;
  objetivosForm!: FormGroup;
  competenciasForm!: FormGroup;
  pdfForm!: FormGroup;

  nuevaCarrera: CarreraPostDto = {
    carreraNombre: '',
    mision: '',
    vision: '',
    objetivos: '',
    atributosEducacionales: [{ carreraId: 0, descripcion: 'Descripcion' }],
    objetivosEducacionales: [{ carreraId: 0, descripcion: 'Descripcion' }],
    competenciasEspecificas: [{ carreraId: 0, descripcion: 'Descripcion' }],
    catalogoAsignatura: {
      carreraId: this.id,
      nombreArchivo: 'Catalogo Asignatura',
      file: null as any,
      rutaArchivo: '...',
    },
    mapaTutorial: {
      carreraId: this.id,
      nombreArchivo: 'Mapa Tutorial',
      file: null as any,
      rutaArchivo: '...',
    },
    listadoMaterias: {
      carreraId: this.id,
      nombreArchivo: 'Listado Materias',
      file: null as any,
      rutaArchivo: '...',
    },
    listadoMateriasOptativas: {
      carreraId: this.id,
      nombreArchivo: 'Listado de materias Optativas',
      file: null as any,
      rutaArchivo: '...',
    },
  };

  // Indicadores booleanos para verificar si los datos específicos han sido cargados desde la base de datos
  nuevaCarreraCreada: boolean = false;
  atributosCargados: boolean = false;
  competenciasCargados: boolean = false;
  objetivosCargados: boolean = false;
  documentosCargados: boolean = false;
  catalogoAsignaturaCargado: boolean = false;
  mapaTutorialCargado: boolean = false;
  listaMateriasCargadas: boolean = false;
  listaMateriasOpCargado: boolean = false;

  catalogoAsignaturaBadExtension: boolean = false;
  mapaTutorialBadExtension: boolean = false;
  listadoMateriasBadExtension: boolean = false;
  listadoMateriasOpBadExtension: boolean = false;

  catalogoAsignaturaErrorText: boolean = false;
  mapaTutorialErrorText: boolean = false;
  listadoMateriasErrorText: boolean = false;
  listadoMateriasOpErrorText: boolean = false;

  //Nuevos elementos para agregar en la lista de la tabla:
  atributoNuevo: AtributoEgresoDto = {
    carreraId: this.id,
    descripcion: '',
  };
  objetivoEducacionalNuevo: ObjetivosEducacionalesDto = {
    descripcion: '',
    carreraId: this.id,
  };
  competenciasEspecíficasNuevo: CompetenciasEspecificasDto = {
    descripcion: '',
    carreraId: this.id,
  };

  // ** Tabla ** //
  dataSource = new MatTableDataSource(this.nuevaCarrera.atributosEducacionales);
  dataSourceObejtivosEduc = new MatTableDataSource(
    this.nuevaCarrera.objetivosEducacionales
  );
  dataSourceCompetencias = new MatTableDataSource(
    this.nuevaCarrera.competenciasEspecificas
  );
  displayedColumns: string[] = ['atributos', 'Acciones'];

  profesores: ProfesorDto[] = [];
  profesorSeleccionado: number = 1;

  catalogosAsignaturasURL: CarreraCatAsignaturasDto = {
    carreraId: this.id,
    catalogoAsignaturaUrl: '',
  };
  mapaTutorial: CarreraMapaTutorialDto = {
    carreraId: this.id,
    mapaTutorialUrl: '',
  };
  listadoMaterias: CarreraListadoMateriasDto = {
    carreraId: this.id,
    listadoMateriasUrl: '',
  };
  listadoMateriasOptativas: CarreraListadoOpURLDto = {
    carreraId: this.id,
    listadoMateriasOpURL: '',
  };

  constructor(
    private _fb: FormBuilder,
    private _carreraPostService: PostCarrerasService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _profesoresService: GetProfesoresService
  ) {}

  @ViewChild(MatTable) table!: MatTable<AtributoEgresoDto>;

  ngOnInit(): void {
    this.initializeForms();
    this.getProfesores();
  }

  private initializeForms(): void {
    const textValidators = Validators.compose([
      Validators.required,
      Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9,;/. ]*$/),
    ]);

    this.carreraForm = this._fb.group({
      nombre: [this.nuevaCarrera.carreraNombre, textValidators],
      mision: [this.nuevaCarrera.mision, textValidators],
      vision: [this.nuevaCarrera.vision, textValidators],
      objetivos: [this.nuevaCarrera.objetivos, textValidators],
    });

    this.atributosForm = this._fb.group({
      atributoNuevo: [
        this.nuevaCarrera.atributosEducacionales[0].descripcion,
        textValidators,
      ],
    });

    this.objetivosForm = this._fb.group({
      objetivoEducacionalNuevo: [
        this.nuevaCarrera.objetivosEducacionales[0].descripcion,
        textValidators,
      ],
    });

    this.competenciasForm = this._fb.group({
      competenciasNuevo: [
        this.nuevaCarrera.competenciasEspecificas[0].descripcion,
        textValidators,
      ],
    });

    this.pdfForm = this._fb.group({
      catalogoAsignaturas: [
        this.nuevaCarrera.catalogoAsignatura.file,
        Validators.required,
      ],
      mapaTutorial: [this.nuevaCarrera.mapaTutorial.file, Validators.required],
      listadoMaterias: [
        this.nuevaCarrera.listadoMaterias.file,
        Validators.required,
      ],
      listadoMateriasOp: [
        this.nuevaCarrera.listadoMateriasOptativas.file,
        Validators.required,
      ],
    });
  }

  postLicenciatura(form: FormGroupDirective) {
    const formData = new FormData();

    const files = [] as any[];
    files.push(this.nuevaCarrera.catalogoAsignatura);
    files.push(this.nuevaCarrera.mapaTutorial);
    files.push(this.nuevaCarrera.listadoMaterias);
    files.push(this.nuevaCarrera.listadoMateriasOptativas);

    formData.append('CarreraNombre', this.carreraForm.get('nombre')?.value);
    formData.append('Mision', this.carreraForm.get('mision')?.value);
    formData.append('Vision', this.carreraForm.get('vision')?.value);
    formData.append('Objetivos', this.carreraForm.get('objetivos')?.value);

    // Atributos, Objetivos, Competencias:
    this.nuevaCarrera.atributosEducacionales.forEach((atributo, index) => {
      formData.append(
        `AtributosEducacionales[${index}].CarreraId`,
        atributo.carreraId.toString()
      );
      formData.append(
        `AtributosEducacionales[${index}].Descripcion`,
        atributo.descripcion
      );
    });
    this.nuevaCarrera.objetivosEducacionales.forEach((objetivo, index) => {
      formData.append(
        `ObjetivosEducacionales[${index}].CarreraId`,
        objetivo.carreraId.toString()
      );
      formData.append(
        `ObjetivosEducacionales[${index}].Descripcion`,
        objetivo.descripcion
      );
    });
    this.nuevaCarrera.competenciasEspecificas.forEach((competencia, index) => {
      formData.append(
        `CompetenciasEspecificas[${index}].CarreraId`,
        competencia.carreraId.toString()
      );
      formData.append(
        `CompetenciasEspecificas[${index}].Descripcion`,
        competencia.descripcion
      );
    });

    formData.append(
      'CatalogoAsignatura.CarreraId',
      this.nuevaCarrera.catalogoAsignatura.carreraId.toString()
    );
    formData.append(
      'CatalogoAsignatura.NombreArchivo',
      this.nuevaCarrera.catalogoAsignatura.nombreArchivo
    );
    formData.append(
      'CatalogoAsignatura.File',
      this.nuevaCarrera.catalogoAsignatura.file
    );
    formData.append(
      'CatalogoAsignatura.RutaArchivo',
      this.nuevaCarrera.catalogoAsignatura.rutaArchivo
    );

    formData.append(
      'MapaTutorial.CarreraId',
      this.nuevaCarrera.mapaTutorial.carreraId.toString()
    );
    formData.append(
      'MapaTutorial.NombreArchivo',
      this.nuevaCarrera.mapaTutorial.nombreArchivo
    );
    formData.append('MapaTutorial.File', this.nuevaCarrera.mapaTutorial.file);
    formData.append(
      'MapaTutorial.RutaArchivo',
      this.nuevaCarrera.mapaTutorial.rutaArchivo
    );

    formData.append(
      'ListadoMaterias.CarreraId',
      this.nuevaCarrera.listadoMaterias.carreraId.toString()
    );
    formData.append(
      'ListadoMaterias.NombreArchivo',
      this.nuevaCarrera.listadoMaterias.nombreArchivo
    );
    formData.append(
      'ListadoMaterias.File',
      this.nuevaCarrera.listadoMaterias.file
    );
    formData.append(
      'ListadoMaterias.RutaArchivo',
      this.nuevaCarrera.listadoMaterias.rutaArchivo
    );

    formData.append(
      'ListadoMateriasOptativas.CarreraId',
      this.nuevaCarrera.listadoMateriasOptativas.carreraId.toString()
    );
    formData.append(
      'ListadoMateriasOptativas.NombreArchivo',
      this.nuevaCarrera.listadoMateriasOptativas.nombreArchivo
    );
    formData.append(
      'ListadoMateriasOptativas.File',
      this.nuevaCarrera.listadoMateriasOptativas.file
    );
    formData.append(
      'ListadoMateriasOptativas.RutaArchivo',
      this.nuevaCarrera.listadoMateriasOptativas.rutaArchivo
    );

    // Formateo de datos del form data:
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this._carreraPostService.postLicenciatura(formData).subscribe({
      next: (data) => {
        this.nuevaCarreraCreada = true;
      },
      error: (err: HttpErrorResponse) => {
        // this.alerta('Error al crear la carrera');
        console.error('Error al crear la carrera:', err.message);
        console.error('Status code:', err.status);
        console.error('Error details:', err.error);

        if (err.error.errors) {
          for (const key in err.error.errors) {
            if (err.error.errors.hasOwnProperty(key)) {
              const errorMessage = err.error.errors[key];
              console.error(`${key}: ${errorMessage}`);
            }
          }
        }
      },
      complete: () => {
        form.resetForm();
        this.alerta('Carrera creada con éxito');
        this.initializeForms();
        this._router.navigate(['admin/inicio']);
      },
    });
  }

  getProfesores() {
    this._profesoresService.getProfesores().subscribe({
      next: (profesores) => {
        this.profesores = profesores;
      },
      error: (err) => {
        this.alerta('Error al obtener los profesores');
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      },
      complete: () => {},
    });
  }

  addAtributos() {
    if (this.atributosForm.get('atributoNuevo')?.value != '') {
      this.atributoNuevo.descripcion =
        this.atributosForm.get('atributoNuevo')?.value;

      const nuevoAtributo = { ...this.atributoNuevo };
      this.nuevaCarrera.atributosEducacionales.push(nuevoAtributo);
      console.log(this.nuevaCarrera.atributosEducacionales);

      this.dataSource = new MatTableDataSource(
        this.nuevaCarrera.atributosEducacionales
      );
      this.table.renderRows();
      this.alerta('Nuevo atributo añadido');
    } else {
      this.alerta('Campo vacio');
    }
  }

  addObjetivos() {
    if (this.objetivosForm.get('objetivoEducacionalNuevo')?.value != '') {
      this.objetivoEducacionalNuevo.descripcion = this.objetivosForm.get(
        'objetivoEducacionalNuevo'
      )?.value;
      const nuevoObjetivo = { ...this.objetivoEducacionalNuevo };
      this.nuevaCarrera.objetivosEducacionales.push(nuevoObjetivo);
      this.dataSourceObejtivosEduc = new MatTableDataSource(
        this.nuevaCarrera.objetivosEducacionales
      );
      this.table.renderRows();
      this.alerta('Nuevo objetivo añadido');
    } else {
      this.alerta('Campo vacio');
    }
  }

  addCompetencia() {
    if (this.competenciasForm.get('competenciasNuevo')?.value != '') {
      this.competenciasEspecíficasNuevo.descripcion =
        this.competenciasForm.get('competenciasNuevo')?.value;
      const nuevaCompetencia = { ...this.competenciasEspecíficasNuevo };
      this.nuevaCarrera.competenciasEspecificas.push(nuevaCompetencia);
      this.dataSourceCompetencias = new MatTableDataSource(
        this.nuevaCarrera.competenciasEspecificas
      );
      this.table.renderRows();
      this.alerta('Nueva competencia añadida');
    } else {
      this.alerta('Campo vacio');
    }
  }

  removeData(i: number): void {
    this.nuevaCarrera.atributosEducacionales.splice(i, 1);
    this.dataSource = new MatTableDataSource(
      this.nuevaCarrera.atributosEducacionales
    );
    this.table.renderRows();
    this.alerta('Atributo eliminado');
  }

  removeCompetenciasEspecificas(i: number) {
    this.nuevaCarrera.competenciasEspecificas.splice(i, 1);
    this.dataSourceCompetencias = new MatTableDataSource(
      this.nuevaCarrera.competenciasEspecificas
    );
    this.table.renderRows();
    this.alerta('Cometencia elimindada');
  }

  removeObjetivos(i: number): void {
    this.nuevaCarrera.objetivosEducacionales.splice(i, 1);
    this.dataSourceObejtivosEduc = new MatTableDataSource(
      this.nuevaCarrera.objetivosEducacionales
    );
    this.table.renderRows();
    this.alerta('Objetivo eliminado');
  }

  volverInicio() {
    this._router.navigate(['admin/inicio']);
  }

  alerta(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  // Carga los archivos
  onFileSelected(event: any, fieldType: string): void {
    const input = event.target as HTMLInputElement;
    const file: File = event.target.files[0];
    const actions: { [key: string]: () => void } = {
      catalogoAsignaturas: () => {
        this.catalogoAsignaturaBadExtension = this.checkExtension(file, input);        
        this.nuevaCarrera.catalogoAsignatura.file = file;
      },
      mapaTutorial: () => {
        this.checkExtension(file, input);
        this.mapaTutorialBadExtension = this.checkExtension(file, input);
        this.nuevaCarrera.mapaTutorial.file = file;
      },
      listadoMaterias: () => {
        this.checkExtension(file, input);
        this.listadoMateriasBadExtension = this.checkExtension(file, input);
        this.nuevaCarrera.listadoMaterias.file = file;
      },
      listadoMateriasOp: () => {
        this.checkExtension(file, input);
        this.listadoMateriasOpBadExtension = this.checkExtension(file, input);
        this.nuevaCarrera.listadoMateriasOptativas.file = file;
      },
    };

    if (actions[fieldType]) {
      actions[fieldType]();
    }
  }

  checkExtension(file: File, input: HTMLInputElement): boolean {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'pdf') {
      this.alerta('El archivo debe ser un PDF');
      input.value = '';
      return true;
    }
    return false;
  }
}
