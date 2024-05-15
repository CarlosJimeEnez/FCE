import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AtributoEgresoDto, CarreraDto, CompetenciasEspecificasDto, ObjetivosEducacionalesDto } from '../../interfaces/Dto';

@Injectable({
  providedIn: 'root'
})
export class DeleteCarrerasService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/CarreraControllerDelete/"
  myAtributosEgresoUrl: string = "atributoEgreso/"
  myObjetivoEducacionalUrl: string = "objetivoEducacional/"
  myCompetenciaEspecificaUrl: string = "competenciaEspecifica/"
  myCarreraUrl: string = "carrera/"
  constructor(private _http: HttpClient) { }
  
  // http://localhost:5000/api/CarreraControllerDelete/atributoEgreso/27

  deleteAtributosEgreso(atributosEgreso: AtributoEgresoDto): Observable<any>{
    return this._http.delete<any>(`${this.myAppUrl}${this.myApiUrl}${this.myAtributosEgresoUrl}${atributosEgreso.id}`)
  }

  deleteObejtivoEducacionales(objetivo: ObjetivosEducacionalesDto): Observable<any>{
    return this._http.delete<any>(`${this.myAppUrl}${this.myApiUrl}${this.myObjetivoEducacionalUrl}${objetivo.id}`)
  }

  deleteCompetenciaEspecifica(competencia: CompetenciasEspecificasDto): Observable<any>{
    return this._http.delete<any>(`${this.myAppUrl}${this.myApiUrl}${this.myCompetenciaEspecificaUrl}${competencia.id}`)
  }
  
  deleteCarrera(carrera: CarreraDto): Observable<any>{
    return this._http.delete<any>(`${this.myAppUrl}${this.myApiUrl}${this.myCarreraUrl}${carrera.id}`)
  }
}
