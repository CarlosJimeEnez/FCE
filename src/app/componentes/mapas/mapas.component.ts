import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { Documentos } from 'src/app/interfaces/carrera';
import { environment } from 'src/app/enviroments/enviroments';
import { ScrollService } from 'src/app/services/scroll.service';

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
  
  urlSegura!: SafeResourceUrl;
  carreraID!: number;
  id!: number;
  documento!: Documentos;
  documentoNoCargado: boolean = true;
  fragment: string = "licenciaturas"

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this._route.queryParams.subscribe(params => {
      this.carreraID = +params['carreraId'];
    })
  }

  ngAfterViewInit(): void {
    this.getDocumentoPdf(this.id);
  }

  getDocumentoPdf(id: number){
    this._carreraService.getDocumentoPDF(id).subscribe(res => {
      this.documento =  res;
      console.log(this.documento);
      const urlInsegura = this.documento.rutaArchivo
      this.urlSegura = this._sanitizer.bypassSecurityTrustResourceUrl(urlInsegura);
      this.documentoNoCargado = false
    },
    err => console.log(err))
  }

  desplazarAFragmento() {
    this._router.navigate([`verCarrera/${this.carreraID}`], {fragment: 'planDeEstudios'});
  }
  
}
