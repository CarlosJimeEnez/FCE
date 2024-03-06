import { Component } from '@angular/core';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent {
  carreras = [
    { nombre: "Electronica", descripcion: "descripcion" },
    { nombre: "Mecatronica", descripcion: "descripcion" },
    { nombre: "Energias Renovables", descripcion: "descripcion" },
  ]
}
