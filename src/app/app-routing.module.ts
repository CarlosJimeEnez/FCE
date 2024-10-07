import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { TableroComponent } from './componentes/home/tablero.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { MapasComponent } from './componentes/PDF/pdf.component';
import { LoginComponent } from './componentes/admin/login/login.component';
import { TableroAdminComponent } from './componentes/admin/tableros/home-admin/tablero-admin.component';
import { EditCarrerasComponent } from './componentes/admin/tableros/edit-carreras/edit-carreras.component';
import { TableroProfesoresComponent } from './componentes/admin/tableros/tablero-profesores/tablero-profesores.component';
import { PostCarrerasComponent } from './componentes/admin/tableros/edit-carreras/post-carreras/post-carreras.component';
import { AdsComponent } from './componentes/admin/tableros/ads/ads.component';
import { EditAdsComponent } from './componentes/admin/tableros/ads/edit-ads/edit-ads.component';
import { PostAdsComponent } from './componentes/admin/tableros/ads/post-ads/post-ads.component';
import { PostProfesoresComponent } from './componentes/admin/tableros/tablero-profesores/post-profesores/post-profesores.component';
import { EditRolComponent } from './componentes/admin/tableros/edit-carreras/edit-rol/edit-rol.component';
import { AddProfesorComponent } from './componentes/admin/tableros/edit-carreras/add-profesor/add-profesor.component';

const routes: Routes = [
  {path: '', component: TableroComponent, pathMatch: 'full'},
  {path: 'verCarrera/:id', component: CarrerasComponent},
  {path: 'verMapa/:id', component: MapasComponent},
  
  {path: 'admin/login', component: LoginComponent},
  {path: 'admin/inicio', component: TableroAdminComponent, canActivate: [AuthGuard]},
  {path: 'admin/editar-carrera/:id', component: EditCarrerasComponent, canActivate: [AuthGuard]},
  {path: "admin/tablero-profesores", component: TableroProfesoresComponent, canActivate: [AuthGuard]},
  {path: 'admin/post-profesores/:id', component: PostProfesoresComponent, canActivate: [AuthGuard]},
  {path: 'admin/post-profesores', component: PostProfesoresComponent, canActivate: [AuthGuard]},
  {path: 'admin/post-carrera', component: PostCarrerasComponent, canActivate: [AuthGuard]},
  {path: 'admin/anuncios', component: AdsComponent, canActivate: [AuthGuard]},
  {path: 'admin/editar-ads/:id', component: EditAdsComponent, canActivate: [AuthGuard]},
  {path: 'admin/post-ads', component: PostAdsComponent, canActivate: [AuthGuard]},
  {path: 'admin/carrera/editarRolProfesor', component: EditRolComponent, canActivate: [AuthGuard]},
  {path: 'admin/add-profesor/carrera', component: AddProfesorComponent, canActivate: [AuthGuard]},
  // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
