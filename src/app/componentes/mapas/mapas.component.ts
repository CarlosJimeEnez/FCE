import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CarrerasServicesService } from 'src/app/services/carreras-services.service';
import { Documentos } from 'src/app/interfaces/carrera';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit, AfterViewInit  {
  constructor(private _route: ActivatedRoute, private _carreraService: CarrerasServicesService, private _sanitizer: DomSanitizer){}
  urlSegura!: any;
  id!: number;
  documento!: Documentos;
  documentoNoCargado: boolean = true;

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.getDocuemntoPdf(this.id);
  }

  ngAfterViewInit(): void {
    this.getDocumento(this.id);      
  }

  getDocuemntoPdf(id: number){
    this._carreraService.getDocumentoPDF(id).subscribe(res => {
      const objectURL = URL.createObjectURL(res)
      this.urlSegura = this._sanitizer.bypassSecurityTrustResourceUrl(objectURL);
      this.documentoNoCargado = false 

    },
    err => console.log(err))
  }

  getDocumento(id: number){
    this._carreraService.getDocumento(id).subscribe(res => {
      this.documento = res
      console.log(this.documento);
    },
    err => console.log(err));
  }
}
