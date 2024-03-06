import { Component } from '@angular/core';

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
}