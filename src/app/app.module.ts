import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { HeaderComponent } from './componentes/header/header.component';
import { CarouselMisionVisionComponent } from './componentes/carousel-mision-vision/carousel-mision-vision.component';
import { CarrerasComponent } from './componentes/carreras/carreras.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MapasComponent } from './componentes/mapas/mapas.component';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    HeaderComponent,
    CarouselMisionVisionComponent,
    CarrerasComponent,
    FooterComponent,
    MapasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
