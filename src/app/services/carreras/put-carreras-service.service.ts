import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { AtributosEducacionales, Carrera, CarreraDto } from '../../interfaces/carrera';
import { Observable } from 'rxjs';
import { CarreraCatAsignaturasDto, CarreraListadoMateriasDto, CarreraListadoOpURLDto, CarreraMapaTutorialDto, CarreraMisionDto, CarreraObjetivosDto, CarreranombreDto, CoordinadorDto } from '../../interfaces/Dto';
import { DocumentosDto } from 'src/app/interfaces/documento';
import { Profesor, ProfesorDTO } from 'src/app/interfaces/profesores';

@Injectable({
  providedIn: 'root'
})
export class PutCarrerasServiceService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/CarrerasControllerPut/"

  myApiProfesoresCarreraUrl: string = "api/ProfesoresCarrerasPut/"

  carreraMetadata: string = "editarMetadata/"
  uploadUrl: string = "upload/"

  carreraVisionMisionApi: string = "carreraMisonVision/"
  carreraNombreApi: string = "carreraNombre/"
  carreraObjetivo: string = "carreraObjetivo/"
  catalogosAsignaturasURL: string = "carreraCatAsignaturas"
  mapaTutorialURL: string = "carrerasMapaTutorial"
  listadoMateriasURL: string = "listadoDeMaterias"
  listadoDeMateriasOptativas: string = "listadoDeMateriasOptativas"
  coordinadorUrl: string = "profesor/"

  constructor(private _http: HttpClient) { }

  putRolProfesor(profesorId: number, carreraId: number, profesor: ProfesorDTO): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiProfesoresCarreraUrl}${profesorId}/${carreraId}`, profesor)
  }

  putCarreraMetadata(carrera: CarreraDto): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.carreraMetadata}${carrera.id}`, carrera)    
  }

  putCatalogosAsignaturas(catalogo: FormData, catalogoId: number): Observable<any> {
    
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.uploadUrl}${catalogoId}`, catalogo)
  }

  putMapaTutorialAsignaturas(mapaTutorial: FormData, mapaId: number): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.uploadUrl}${mapaId}`, mapaTutorial)
  }

  putListadoMaterias(listadoMaterias: FormData, Id: number): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.uploadUrl}${Id}`, listadoMaterias)
  }

  putCarreraNombre(carreraNombre: CarreranombreDto): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.carreraNombreApi}${carreraNombre.id}`, carreraNombre)
  }
  
  putCarreraMision(carreraMisionVision: CarreraMisionDto): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.carreraVisionMisionApi}${carreraMisionVision.id}`, carreraMisionVision)
  }

  putCarreraObjetivos(carreraObjetivo: CarreraObjetivosDto): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.carreraObjetivo}${carreraObjetivo.id}`, carreraObjetivo) 
  }

  // putCarreraCatAsignaturas(catalogoAsignaturaURL: CarreraCatAsignaturasDto): Observable<any> {
  //   return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.catalogosAsignaturasURL}`, catalogoAsignaturaURL) 
  // }

  // putMapaTutorial(mapaTutorial: CarreraMapaTutorialDto): Observable<any> {
  //   return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.mapaTutorialURL}`, mapaTutorial) 
  // }

  // putListadoMaterias(listadoMaterias: CarreraListadoMateriasDto): Observable<any> {
  //   return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.listadoMateriasURL}`, listadoMaterias)
  // }

  putListadoMateriasOptativas(listadoMateriasOp: CarreraListadoOpURLDto): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.listadoDeMateriasOptativas}`, listadoMateriasOp)
  }

  putAtributosEducacionales(atributo: AtributosEducacionales): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.listadoDeMateriasOptativas}`, atributo)
  }

  putProfesor(coordinador: CoordinadorDto): Observable<any> {
    return this._http.put(`${this.myAppUrl}${this.myApiUrl}${this.coordinadorUrl}${coordinador.carreraId}`, coordinador)
  }
}
