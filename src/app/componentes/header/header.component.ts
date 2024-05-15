import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  openAcademia = false; // Controla si se abre los dropdown 
  openOfertaAcademica = false; 
  openDifusion  = false;
  openNosotros = false;
  isMobile = window.innerWidth < 768; 

  constructor(private _router: Router) {}

  // Header visible
  lastScrollTop:number = 0;
  headerVisible: boolean = false;
  fragment: string = "licenciaturas"

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth < 768;
  }
  
  desplazarAInicio() {
    this._router.navigate([`/`], {fragment: 'inicio'});
  }

  desplazarALicenciaturas(): void {
    this._router.navigate([`/`], {fragment: 'licenciaturas'});
    console.log('licenciaturas')

  }
  
}