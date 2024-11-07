import { fromEvent, Subscription } from 'rxjs';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CarrerasServicesService } from 'src/app/services/carreras/carreras-services.service';
import { Carrera } from 'src/app/interfaces/carrera';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';
import { AdsService } from 'src/app/services/ads/ads.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdsDto } from 'src/app/interfaces/Dto';
import { environment } from 'src/app/environments/environment';
import { NoticiasService } from 'src/app/services/noticias.service';
import { NoticiasDto } from 'src/app/interfaces/noticias';
('src/app/environments/enviroments');

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
})
export class TableroComponent implements OnInit, AfterViewInit {
  carreras: Carrera[] = [];
  carrerasNoCargadas: boolean = true;
  urlSegura!: SafeResourceUrl;
  Ads: { ad: AdsDto; safeUrl: SafeResourceUrl }[] = [];
  adNoCargadas: boolean = true;
  api = environment.apiUrl;
  noticiasCargadas: boolean = false;
  noticiasApi: any = 'https://boletin.buap.mx/?q=node/';
  noticias: NoticiasDto[] = [];
  // Servicios con guion bajo
  constructor(
    private _carrerasService: CarrerasServicesService,
    private _router: Router,
    private _adsService: AdsService,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer,
    private _noticiasService: NoticiasService
  ) {
    console.log(this.api);
  }

  ngOnInit(): void {
    this.getAds();
    this.getCarreras();
    this.getNoticias();
  }

  ngAfterViewInit(): void {
    this._route.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        setTimeout(() => this.desplazarAFragmento(fragment), 100);
      }
    });
  }

  getNoticias() {
    this._noticiasService.getNoticias().subscribe({
      next: (data: any) => {
        this.noticias = data;
        this.noticias.forEach((noticia) => {
          noticia.url = `${this.noticiasApi}${noticia.nid}`;
        });
        console.log(this.noticias);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.noticiasCargadas = true;
      },
    });
  }

  private desplazarAFragmento(fragment: string): void {
    const elemento = document.querySelector(`#${fragment}`);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.log(elemento);
    }
  }

  // Funciones
  getAds() {
    console.log('Getting ads...');

    this._adsService.getAds().subscribe({
      next: (data: AdsDto[]) => {
        console.log(data);
        this.Ads = data.map((ad) => ({
          ad,
          safeUrl: this._sanitizer.bypassSecurityTrustResourceUrl(ad.url),
        }));

        this.adNoCargadas = false;
        console.log(`Ad No Cargadas: ${this.adNoCargadas}`);
        console.log(this.Ads);
      },
      error: (error) => {
        console.log('Error al cargar Ads: ', error);
      },
      complete: () => {
        console.log('Ads cargadas completamente');
      },
    });
  }

  verLink(url: string): void {
    console.log('url: ', url);
    window.location.href = url;
  }

  getCarreras() {
    this._carrerasService.getCarreras().subscribe(
      (data) => {
        console.log(data);
        this.carrerasNoCargadas = false;
        this.carreras = data;
      },
      (error) => (this.carrerasNoCargadas = true)
    );
  }

  verCarrera(id: number): void {
    this._router.navigate([`verCarrera/${id}`], { fragment: 'section1' });
  }
}
