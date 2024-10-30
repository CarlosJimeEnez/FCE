import { Injectable } from '@angular/core';
import { Carrera } from '../interfaces/carrera';

@Injectable({
  providedIn: 'root',
})
export class ImagenCarrerasService {
  constructor() {}

  getImagenUrl(carrera: Carrera): string {
    switch (carrera.carreraNombre) {
      case 'Lic en Ing Mecatrónica':
        return 'assets/images/mecatronica.jpg';

      case 'Gestión de Ciudades Inteligente y Trans. Tecno.':
        return 'assets/images/CiudadesInteligentes.jpg';
      
        case 'Lic Energías Renovables':
          return 'assets/images/renovables.jpg';
        
      default:
        return '';
    }
  }
}
