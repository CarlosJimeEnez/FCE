import { Injectable } from '@angular/core';
import { Carrera } from '../interfaces/carrera';

@Injectable({
  providedIn: 'root',
})
export class ImagenCarrerasService {
  constructor() {}

  getImagenUrl(carrera: Carrera): string {
    switch (carrera.carreraNombre) {
      case 'Ingeniería Mecatrónica':
        return 'assets/images/Mecatronica.jpg';

      case 'Lic en Gestión de Ciudades Inteligente y Trans. Tecno.':
        return 'assets/images/CiudadesInteligentes.jpg';

      case 'Lic Energías Renovables':
        return 'assets/images/renovables.jpg';

      case 'Lic en Ingenieria Electrónica':
        return 'assets/images/electronica.jpg';

      case 'Ingeniería en Sistemas Automotrices':
        return 'assets/images/Automotriz.jpg';
      
      default:
        return 'assets/images/electronica.jpg';
    }
  }
}
