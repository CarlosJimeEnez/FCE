import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { MapasComponent } from './componentes/mapas/mapas.component';
import { AdminAuthComponent } from './componentes/admin-auth/admin-auth.component';
import { LoginComponent } from './componentes/admin/login/login.component';
import { TableroAdminComponent } from './componentes/admin/tablero-admin/tablero-admin.component';
import { EditCarrerasComponent } from './componentes/admin/edit-carreras/edit-carreras.component';

const routes: Routes = [
  {path: '', component: TableroComponent, pathMatch: 'full'},
  {path: 'verCarrera/:id', component: CarrerasComponent},
  {path: 'verMapa/:id', component: MapasComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/inicio', component: TableroAdminComponent},
  {path: 'admin/editar-carrera/:id', component: EditCarrerasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
