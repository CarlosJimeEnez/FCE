import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from '../componentes/admin/login/login.component';
import { TableroAdminComponent } from '../componentes/admin/tableros/home-admin/tablero-admin.component';
import { EditCarrerasComponent } from '../componentes/admin/tableros/edit-carreras/edit-carreras.component';
import { TableroProfesoresComponent } from '../componentes/admin/tableros/tablero-profesores/tablero-profesores.component';
import { PostCarrerasComponent } from '../componentes/admin/tableros/edit-carreras/post-carreras/post-carreras.component';
import { AdsComponent } from '../componentes/admin/tableros/ads/ads.component';
import { EditAdsComponent } from '../componentes/admin/tableros/ads/edit-ads/edit-ads.component';
import { PostAdsComponent } from '../componentes/admin/tableros/ads/post-ads/post-ads.component';
import { PostProfesoresComponent } from '../componentes/admin/tableros/tablero-profesores/post-profesores/post-profesores.component';
import { EditRolComponent } from '../componentes/admin/tableros/edit-carreras/edit-rol/edit-rol.component';
import { AddProfesorComponent } from '../componentes/admin/tableros/edit-carreras/add-profesor/add-profesor.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'inicio', component: TableroAdminComponent, canActivate: [AuthGuard] },
    { path: 'editar-carrera/:id', component: EditCarrerasComponent, canActivate: [AuthGuard] },
    { path: 'tablero-profesores', component: TableroProfesoresComponent, canActivate: [AuthGuard] },
    { path: 'post-profesores/:id', component: PostProfesoresComponent, canActivate: [AuthGuard] },
    { path: 'post-profesores', component: PostProfesoresComponent, canActivate: [AuthGuard] },
    { path: 'post-carrera', component: PostCarrerasComponent, canActivate: [AuthGuard] },
    { path: 'anuncios', component: AdsComponent, canActivate: [AuthGuard] },
    { path: 'editar-ads/:id', component: EditAdsComponent, canActivate: [AuthGuard] },
    { path: 'post-ads', component: PostAdsComponent, canActivate: [AuthGuard] },
    { path: 'carrera/editarRolProfesor', component: EditRolComponent, canActivate: [AuthGuard] },
    { path: 'add-profesor/carrera', component: AddProfesorComponent, canActivate: [AuthGuard] },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }