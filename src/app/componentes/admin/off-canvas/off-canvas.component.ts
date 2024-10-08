import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-off-canvas',
  templateUrl: './off-canvas.component.html',
  styleUrls: ['./off-canvas.component.css']
})

export class OffCanvasComponent {
  constructor(private _router: Router){}

  verProfesores(): void{
    this._router.navigate([`admin/tablero-profesores`], {queryParams: {nombre: "Profesores"}})
  }

  verLicenciaturas(): void{
    this._router.navigate([`admin/inicio`], {queryParams: {nombre: "Licenciaturas"}})
  }

  verTableroAnuncios(): void{
    this._router.navigate([`admin/anuncios`], {queryParams: {nombre: "Anuncios"}})
  }
}
