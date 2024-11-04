import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { Documentos, DocumentosDto } from 'src/app/interfaces/documento';

@Component({
  selector: 'app-mapas',
  template: `
    <div class="container ">
      <div class="row justify-content-center mt-5">
        <div class="col-1 text-center align-item-center">
          <button
            type="button"
            (click)="desplazarAFragmento()"
            class="btn btn-outline-primary"
          >
            <i class="fas fa-arrow-left fa-2x "></i>
          </button>
        </div>
        <div class="col-10  text-center align-item-center">
          <h3 *ngIf="!documentoNoCargado">{{ documento.nombreArchivo }}</h3>
        </div>
        <div class="col-1  text-center align-item-center"></div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <div style="position: relative">
            <iframe
              class="mb-5"
              *ngIf="!documentoNoCargado; else noDocumento"
              [src]="urlSegura"
              width="100%"
              height="600px"
              frameborder="0"
              scrolling="no"
            ></iframe>

            <ng-template #noDocumento>
              <h1>El documento no se ha cargado.</h1>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MapasComponent implements OnInit, AfterViewInit {
  constructor(
    private _route: ActivatedRoute,
    private _carreraService: CarrerasServicesService,
    private _sanitizer: DomSanitizer,
    private _router: Router
  ) {}

  documento: DocumentosDto = {
    carreraId: 0,
    nombreArchivo: '',
    rutaArchivo: '',
    file: null as any,
  };

  id: number = 0;
  urlSegura!: SafeResourceUrl;
  documentoNoCargado: boolean = true;
  fragment: string = 'licenciaturas';

  ngOnInit() {
    this._route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this._route.queryParams.subscribe((params) => {
      this.documento.carreraId = +params['carreraId'];
    });
  }

  ngAfterViewInit(): void {
    this.getDocumentoPdf(this.id);
  }

  getDocumentoPdf(id: number) {
    this._carreraService.getDocumentoPDF(id).subscribe({
      next: (data: Blob) => {
        try {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          this.urlSegura = this._sanitizer.bypassSecurityTrustResourceUrl(url);
          this.documentoNoCargado = false;
        } catch (error) {
          console.error('Error loading PDF:', error);
          this.documentoNoCargado = true;
        }
      },
      error: (error) => {
        console.error('Error loading PDF:', error);
        this.documentoNoCargado = true;
      },
    });
  }

  // Se desplaza a donde estaba el estado de la pagina anterior back()
  desplazarAFragmento() {
    this._router.navigate([`verCarrera/${this.documento.carreraId}`], {
      fragment: 'planDeEstudios',
    });
  }
}
