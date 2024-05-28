import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { MapasComponent } from './componentes/mapas/mapas.component';
import { AdminAuthComponent } from './componentes/admin-auth/admin-auth.component';
import { LoginComponent } from './componentes/admin/login/login.component';
import { TableroAdminComponent } from './componentes/admin/tableros/tablero-admin/tablero-admin.component';
import { EditCarrerasComponent } from './componentes/admin/tableros/edit-carreras/edit-carreras.component';
import { TableroProfesoresComponent } from './componentes/admin/tableros/tablero-profesores/tablero-profesores.component';
import { PostCarrerasComponent } from './componentes/admin/post-carreras/post-carreras.component';
import { AdsComponent } from './componentes/admin/tableros/ads/ads.component';
import { EditAdsComponent } from './componentes/admin/tableros/ads/edit-ads/edit-ads.component';
import { PostAdsComponent } from './componentes/admin/tableros/ads/post-ads/post-ads.component';
import { PostProfesoresComponent } from './componentes/admin/tableros/tablero-profesores/post-profesores/post-profesores.component';

const routes: Routes = [
  {path: '', component: TableroComponent, pathMatch: 'full'},
  {path: 'verCarrera/:id', component: CarrerasComponent},
  {path: 'verMapa/:id', component: MapasComponent},
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/inicio', component: TableroAdminComponent},
  {path: 'admin/editar-carrera/:id', component: EditCarrerasComponent},
  {path: "admin/tablero-profesores", component: TableroProfesoresComponent},

  {path: 'admin/post-profesores/:id', component: PostProfesoresComponent},
  {path: 'admin/post-profesores', component: PostProfesoresComponent},

  {path: 'admin/post-carrera', component: PostCarrerasComponent},
  {path: 'admin/anuncios', component: AdsComponent},
  {path: 'admin/editar-ads/:id', component: EditAdsComponent},
  {path: 'admin/post-ads', component: PostAdsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
