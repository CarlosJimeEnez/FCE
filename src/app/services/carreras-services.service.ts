import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';
import { Carrera, Documentos, Profesor } from '../interfaces/carrera';
@Injectable({
  providedIn: 'root'
})
export class CarrerasServicesService {
  myAppUrl: string = environment.endpoint
  myApiUrl: string = "api/Carrerras/"
  myApiProfesorUrl: string = "profesores/"
  myApiDocumentosPdfUrl: string = "documentosPDF/"
  myApiDocumentosUrl: string = "documentos/"
  myApiDocumentoPorCarreraUrl: string = "porCarrera/carreraId"
  myApiCarreraIdAtributosEgreso: string = "carreraId/atributosEgreso/"

  constructor(private http: HttpClient) {}

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getCarrera(id: number): Observable<Carrera> {
    const params = new HttpParams().set('id', id); 
    return this.http.get<Carrera>(`${this.myAppUrl}${this.myApiUrl}id`, {params})
  }

  getProfesor(id: number): Observable<Profesor> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Profesor>(`${this.myAppUrl}${this.myApiUrl}${this.myApiProfesorUrl}id`, {params})
  }

  getAtributosEgresoByCarreraId(carreraId: number):Observable<any> {
    console.log("Carrera Id: " + carreraId)
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${this.myApiCarreraIdAtributosEgreso}${carreraId}`) 
  }

  getDocumentos(): Observable<Documentos[]> {
    return this.http.get<Documentos[]>(`${this.myAppUrl}${this.myApiUrl}${this.myApiDocumentosUrl}`)
  }

  getDocumentoPDF(id: number): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${this.myApiDocumentosPdfUrl}id`, {responseType: "blob", params})
  }

  getDocumento(id: number): Observable<Documentos> {
    const params = new HttpParams().set('id', id);
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}${this.myApiDocumentosUrl}id`, {params})
  }

  getDocumentosByCarreraId(carreraId: number): Observable<Documentos[]> {
    const params = new HttpParams().set('careerId', carreraId);
    return this.http.get<Documentos[]>(`
      ${this.myAppUrl}${this.myApiUrl}${this.myApiDocumentosUrl}${this.myApiDocumentoPorCarreraUrl}`
      ,{params}
    )}

}
