import { Component } from '@angular/core';

@Component({
  selector: 'app-flecha-atras',
  standalone: true,
  imports: [],
  template: `
  <button
            type="button"
            (click)="desplazarAFragmento()"
            class="btn btn-outline-primary"
          >
            <i class="fas fa-arrow-left fa-2x "></i>
          </button>
  `,
  styleUrl: './flecha-atras.component.css'
})
export class FlechaAtrasComponent {
  desplazarAFragmento(){
    console.log("Desplazando")
  }
}
