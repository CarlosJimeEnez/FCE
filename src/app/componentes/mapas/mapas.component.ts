import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { Documentos, DocumentosDto } from 'src/app/interfaces/documento';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit, AfterViewInit  {
  constructor(private _route: ActivatedRoute,
    private _carreraService: CarrerasServicesService,
    private _sanitizer: DomSanitizer,
    private _router: Router) {
  }
  
  documento: DocumentosDto = {
    carreraId: 0,
    nombreArchivo: "",
    file: ""
  }
  id: number = 0;
  urlSegura!: SafeResourceUrl
  documentoNoCargado: boolean = true;
  fragment: string = "licenciaturas"

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this._route.queryParams.subscribe(params => {
      this.documento.carreraId = +params['carreraId'];
    })
  }

  ngAfterViewInit(): void {
    this.getDocumentoPdf(this.id);
  }

  getDocumentoPdf(id: number){
    this._carreraService.getDocumentoPDF(id, this.documento.carreraId).subscribe(res => {   
      const urlInsegura = res.url
      this.urlSegura = this._sanitizer.bypassSecurityTrustResourceUrl(urlInsegura);
      this.documentoNoCargado = false
    },
    err => console.log(err))
  }

  desplazarAFragmento() {
    this._router.navigate([`verCarrera/${this.documento.carreraId}`], {fragment: 'planDeEstudios'});
  }
  
}
