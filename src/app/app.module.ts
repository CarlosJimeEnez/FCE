import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { TableroComponent } from './componentes/home/tablero.component';
import { HeaderComponent } from './componentes/header/header.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MapasComponent } from './componentes/PDF/pdf.component';
import { AdminAuthComponent } from './componentes/admin-auth/admin-auth.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './componentes/admin/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedesSocialesComponent } from './componentes/redes-sociales/redes-sociales.component';
import { TableroAdminComponent } from './componentes/admin/tableros/home-admin/tablero-admin.component';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { EditCarrerasComponent } from './componentes/admin/tableros/edit-carreras/edit-carreras.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TableroProfesoresComponent } from './componentes/admin/tableros/tablero-profesores/tablero-profesores.component';
import { OffCanvasComponent } from './componentes/admin/off-canvas/off-canvas.component';
import { PostCarrerasComponent } from './componentes/admin/tableros/edit-carreras/post-carreras/post-carreras.component';
import { AdsComponent } from './componentes/admin/tableros/ads/ads.component';
import { EditAdsComponent } from './componentes/admin/tableros/ads/edit-ads/edit-ads.component';
import { PostAdsComponent } from './componentes/admin/tableros/ads/post-ads/post-ads.component';
import { PostProfesoresComponent } from './componentes/admin/tableros/tablero-profesores/post-profesores/post-profesores.component';
import { CommonModule } from '@angular/common';
import { EditRolComponent } from './componentes/admin/tableros/edit-carreras/edit-rol/edit-rol.component';
import { AddProfesorComponent } from './componentes/admin/tableros/edit-carreras/add-profesor/add-profesor.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    HeaderComponent,
    CarrerasComponent,
    FooterComponent,
    MapasComponent,
    AdminAuthComponent,
    LoginComponent,
    RedesSocialesComponent,
    TableroAdminComponent,
    EditCarrerasComponent,
    TableroProfesoresComponent,
    OffCanvasComponent,
    PostCarrerasComponent,
    AdsComponent,
    EditAdsComponent,
    PostAdsComponent,
    PostProfesoresComponent,
    EditRolComponent,
    AddProfesorComponent,
  ],
  imports: [    
    MatCheckboxModule, 
    CommonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    OAuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
