import { Component, HostListener } from '@angular/core';

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

  // Header visible
  lastScrollTop:number = 0;
  headerVisible: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobile = window.innerWidth < 768;
  }
  
}