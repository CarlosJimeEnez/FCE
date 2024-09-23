import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { AtributoEgresoDto, CarreraCatAsignaturasDto, CarreraListadoMateriasDto, CarreraListadoOpURLDto, CarreraMapaTutorialDto, CompetenciasEspecificasDto, CoordinadorDto, ObjetivosEducacionalesDto } from '../../interfaces/Dto';
import { Carrera, CarreraDto, CompetenciasEspecificas } from '../../interfaces/carrera';

@Injectable({
  providedIn: 'root'
})
export class PostCarrerasService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/CarrerrasControllerPost/"

  myApiProfesoresCarreraUrl: string = "api/ProfesoresCarrerasPost/"
  myApiRelatedData: string = "api/addRelatedCollectionsAndDocuments"

  myAtributoEgresoUrl: string = "atributoEgreso"
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
  nuevaLicenciaturaUrl: string = "nuevaLicenciatura"

  constructor(private _http: HttpClient) { }

  // ** ATRIBUTO Egreso ** // 
  postAtributoEgreso(atributo: AtributoEgresoDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myAtributoEgresoUrl}`, atributo)
  }
  
  // ** ATRIBUTOS Egresos ** // 
  postAtributosEgresos(atributo: AtributoEgresoDto[]): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myAtributosEgresosUrl}`, atributo)
  }

  // ** OBJETIVO educacionales: 
  postObjetivoEducacional(objetivo: ObjetivosEducacionalesDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myObjetivosEducacionalUrl}`, objetivo)
  }

  // ** OBJETIVOS Educacionales:
  postObjetivosEducacionales(objetivo: ObjetivosEducacionalesDto[]): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myObjetivosEducacionalesUrl}`, objetivo)
  }


  //Post Competencias especificas 
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
  
  // ** POST LICENCIATURA ** //
  postLicenciatura(licenciatura: FormData): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.nuevaLicenciaturaUrl}`, licenciatura)
  }

  // ** Related Data LICENCIATURA ** //
  addRelatedCollectionsAndDocuments(licenciatura: FormData): Observable<any>{
      return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myApiRelatedData}`, licenciatura)
  }

  postProfesoresCarreras(carreraId: number, profesoresIds: number[]): Observable<any> {
    let params = new HttpParams(); 
    profesoresIds.forEach(id => {
      params = params.append("profesoresIds", id.toString()); 
    })

    return this._http.post<any>(`${this.myAppUrl}${this.myApiProfesoresCarreraUrl}${carreraId}`, profesoresIds)
  }
}
