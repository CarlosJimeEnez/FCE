import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { AtributoEgresoDto, CompetenciasEspecificasDto, ObjetivosEducacionalesDto } from '../../interfaces/Dto';
import { CompetenciasEspecificas } from '../../interfaces/carrera';

@Injectable({
  providedIn: 'root'
})
export class PostCarrerasService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/CarrerrasControllerPost/"
  myAtributosEgresoUrl: string = "atributosEgreso"
  myObjetivosEducacionalUrl: string = "objetivosEducacional"
  myCompetenciaEspecificasUrl: string = "competenciaEspecificas"

  constructor(private _http: HttpClient) { }

  postAtributosEgreso(atributo: AtributoEgresoDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myAtributosEgresoUrl}`, atributo)
  }

  postObjetivoEducacional(objetivo: ObjetivosEducacionalesDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myObjetivosEducacionalUrl}`, objetivo)
  }

  postCompetenciasEspecificas(competencia: CompetenciasEspecificasDto): Observable<any>{
    return this._http.post<any>(`${this.myAppUrl}${this.myApiUrl}${this.myCompetenciaEspecificasUrl}`, competencia)
  }

}
