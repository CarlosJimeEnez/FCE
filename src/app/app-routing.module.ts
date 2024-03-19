import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';

const routes: Routes = [
  {path: '', component: TableroComponent, pathMatch: 'full'},
  {path: 'verCarrera/:id', component: CarrerasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
