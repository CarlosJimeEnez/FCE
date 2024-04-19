import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { AtributoEgresoDto, CarreraCatAsignaturasDto, CompetenciasEspecificasDto, ObjetivosEducacionalesDto } from '../../interfaces/Dto';
import { Carrera, CompetenciasEspecificas } from '../../interfaces/carrera';

@Injectable({
  providedIn: 'root'
})
export class PostCarrerasService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/CarrerrasControllerPost/"
  myAtributosEgresoUrl: string = "atributosEgreso"
  myAtributosEgresosUrl: string = "atributosEgresos"
  myObjetivosEducacionalUrl: string = "objetivosEducacional"
  myObjetivosEducacionalesUrl: string = "objetivosEducacionales"
  myCompetenciaEspecificasUrl: string = "competenciaEspecificas"
  myCompetenciaEspecificassUrl: string = "competenciasEspecificas"
  myCatalogosAsignaturasURL: string = "catalogosAsignatura"
  myMapaTutorialUrl: string = "mapaTutorial"
  myListadoMateriasURL: string = "listadoMaterias"
  myListadoMateriasOptativasURL: string = "listadoMateriasOp"

  nuevaLicenciaturaUrl: string = "licenciatura"

  constructor(private _http: HttpClient) { }

  postAtributosEgreso(atributo: AtributoEgresoDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myAtributosEgresoUrl}`, atributo)
  }

  postAtributosEgresos(atributo: AtributoEgresoDto[]): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myAtributosEgresoUrl}`, atributo)
  }

  postObjetivoEducacional(objetivo: ObjetivosEducacionalesDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myObjetivosEducacionalUrl}`, objetivo)
  }

  postObjetivosEducacionales(objetivo: ObjetivosEducacionalesDto[]): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myObjetivosEducacionalesUrl}`, objetivo)
  }

  postCompetenciasEspecificas(competencia: CompetenciasEspecificasDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myCompetenciaEspecificasUrl}`, competencia)
  }

  postCompetenciasEspecificass(competencia: CompetenciasEspecificasDto[]): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myCompetenciaEspecificassUrl}`, competencia)
  }

  // Plan de estudios DOC: 
  postCatalogoAsignatura(catalogosAsignatura: CarreraCatAsignaturasDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myCatalogosAsignaturasURL}`, catalogosAsignatura)
  }
  postMapaTutorial(catalogosAsignatura: CarreraCatAsignaturasDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myCatalogosAsignaturasURL}`, catalogosAsignatura)
  }
  postListadoMaterias(catalogosAsignatura: CarreraCatAsignaturasDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myCatalogosAsignaturasURL}`, catalogosAsignatura)
  }
  postListadoMateriasOp(catalogosAsignatura: CarreraCatAsignaturasDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myCatalogosAsignaturasURL}`, catalogosAsignatura)
  }

  // Post TODO 
  postLicenciatura(licenciatura: Carrera): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.nuevaLicenciaturaUrl}`, licenciatura)
  }
}
