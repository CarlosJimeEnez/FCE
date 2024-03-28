import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { MapasComponent } from './componentes/mapas/mapas.component';

const routes: Routes = [
  {path: '', component: TableroComponent, pathMatch: 'full'},
  {path: 'verCarrera/:id', component: CarrerasComponent},
  {path: 'verMapa/:id', component: MapasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
