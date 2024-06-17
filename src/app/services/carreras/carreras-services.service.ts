import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroments';
import { AtributosEducacionales, Carrera, CompetenciasEspecificas, ObjetivosEducacionales } from '../../interfaces/carrera';
import { Profesor } from 'src/app/interfaces/profesores';
import { Documentos } from 'src/app/interfaces/documento';
@Injectable({
  providedIn: 'root'
})
export class CarrerasServicesService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/Carrerras/"
  myApiProfesorUrl: string = "profesores/"
  myApiDocumentosPdfUrl: string = "documentoPDF/"
  myApiDocumentosUrl: string = "documentos/"
  myApiDocumentoPorCarreraUrl: string = "porCarrera/carreraId"
  myApiCarreraIdAtributosEgreso: string = "carreraId/atributosEgreso/"
  myApiCarreraObjetivosEducacionales: string = "carreraId/objetivosEducacionales/"
  myApiCompetenciaEspecificas: string = "carreraId/competenciasEspecificas/"
  
  constructor(private http: HttpClient) {}

  getCarreras(): Observable<Carrera[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokenJWT')}`
    });

    return this.http.get<Carrera[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers})
  }

  getCarrera(id: number): Observable<Carrera> {
    const params = new HttpParams().set('id', id); 
    return this.http.get<Carrera>(`${this.myAppUrl}${this.myApiUrl}id`, {params})
  }

  getProfesor(id: number): Observable<Profesor> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Profesor>(`${this.myAppUrl}${this.myApiUrl}${this.myApiProfesorUrl}id`, {params})
  }

  getAtributosEgresoByCarreraId(carreraId: number):Observable<AtributosEducacionales[]> {
    console.log("Carrera Id: " + carreraId)
    return this.http.get<AtributosEducacionales[]>(`${this.myAppUrl}${this.myApiUrl}${this.myApiCarreraIdAtributosEgreso}${carreraId}`) 
  }

  getObjetivosEducacionalesByCarreraId(carreraId: number): Observable<ObjetivosEducacionales[]> {
    return this.http.get<ObjetivosEducacionales[]>(`${this.myAppUrl}${this.myApiUrl}${this.myApiCarreraObjetivosEducacionales}${carreraId}`)
  }

  getCompetenciasEspecificasByCarreraId(carreraId: number): Observable<CompetenciasEspecificas[]>{
    return this.http.get<CompetenciasEspecificas[]>(`${this.myAppUrl}${this.myApiUrl}${this.myApiCompetenciaEspecificas}${carreraId}`) 
  }

  getDocumentos(): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(`${this.myAppUrl}${this.myApiUrl}${this.myApiDocumentosUrl}`)
  }

  getDocumentoPDF(id: number, carreraId: number): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}${this.myApiDocumentosPdfUrl}${id}/${carreraId}`)
  }

  getDocumentosByCarreraId(carreraId: number): Observable<Documentos[]> {
    const params = new HttpParams().set('careerId', carreraId);
    return this.http.get<Documentos[]>(`
      ${this.myAppUrl}${this.myApiUrl}${this.myApiDocumentosUrl}${this.myApiDocumentoPorCarreraUrl}`
      ,{params}
    )}

}
