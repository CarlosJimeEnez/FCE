import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { AtributoEgresoDto, CarreraCatAsignaturasDto, CarreraDto, CarreraListadoMateriasDto, CarreraListadoOpURLDto, CarreraMapaTutorialDto, CompetenciasEspecificasDto, CoordinadorDto, ObjetivosEducacionalesDto } from '../../interfaces/Dto';
import { Carrera, CompetenciasEspecificas } from '../../interfaces/carrera';

@Injectable({
  providedIn: 'root'
})
export class PostCarrerasService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/CarrerrasControllerPost/"

  myApiProfesoresCarreraUrl: string = "api/ProfesoresCarrerasPost/"

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
  myCoordinadorUrl: string = "coordinador"
  nuevaLicenciaturaUrl: string = "licenciatura"

  constructor(private _http: HttpClient) { }

  postAtributosEgreso(atributo: AtributoEgresoDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myAtributosEgresoUrl}`, atributo)
  }

  postAtributosEgresos(atributo: AtributoEgresoDto[]): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myAtributosEgresosUrl}`, atributo)
  }

  postObjetivoEducacional(objetivo: ObjetivosEducacionalesDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myObjetivosEducacionalesUrl}`, objetivo)
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

  // Plan de estudios Documentos: 
  postCatalogoAsignatura(catalogosAsignatura: CarreraCatAsignaturasDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myCatalogosAsignaturasURL}`, catalogosAsignatura)
  }
  
  postMapaTutorial(mapaTutorial: CarreraMapaTutorialDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myMapaTutorialUrl}`, mapaTutorial)
  }
  
  postListadoMaterias(listado: CarreraListadoMateriasDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myListadoMateriasURL}`, listado)
  }
  
  postListadoMateriasOp(listadoMateriasOp: CarreraListadoOpURLDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myListadoMateriasOptativasURL}`, listadoMateriasOp)
  }
 
  postLicenciatura(licenciatura: CarreraDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.nuevaLicenciaturaUrl}`, licenciatura)
  }

  postProfesoresCarreras(carreraId: number, profesoresIds: number[]): Observable<any> {
    let params = new HttpParams(); 
    profesoresIds.forEach(id => {
      params = params.append("profesoresIds", id.toString()); 
    })

    return this._http.post<any>(`${this.myAppUrl}${this.myApiProfesoresCarreraUrl}${carreraId}`, profesoresIds)
  }
}
