import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { HeaderComponent } from './componentes/header/header.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MapasComponent } from './componentes/mapas/mapas.component';
import { AdminAuthComponent } from './componentes/admin-auth/admin-auth.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './componentes/admin/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedesSocialesComponent } from './componentes/redes-sociales/redes-sociales.component';
import { TableroAdminComponent } from './componentes/admin/tableros/tablero-admin/tablero-admin.component';

import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { EditCarrerasComponent } from './componentes/admin/edit-carreras/edit-carreras.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TableroProfesoresComponent } from './componentes/admin/tableros/tablero-profesores/tablero-profesores.component';
import { OffCanvasComponent } from './componentes/admin/off-canvas/off-canvas.component';
import { PostCarrerasComponent } from './componentes/admin/post-carreras/post-carreras.component';

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
    
  ],
  imports: [
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
