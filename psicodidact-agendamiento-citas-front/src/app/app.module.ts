import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer/footer.component';
import { HeaderComponent } from './header/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderLoginComponent } from './header_login/header-login/header-login.component';
import { HomeComponent } from './home/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
//import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './users/login/login.component';
import { PageComponent } from './error_page/page/page.component';
import { ProfessionalComponent } from './professional/professional/professional.component';
import { ProfesionalesService } from './professional/professional/profesionales.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { MatTableModule } from '@angular/material/table'

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CrearProfesionalModalComponent } from './professional/professional/crear_profesional/crear-profesional-modal/crear-profesional-modal.component';
import { DetalleProfesionalModalComponent } from './professional/professional/detalles_profesional/detalle-profesional-modal/detalle-profesional-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditarProfesionalModalComponent } from './professional/professional/editar_profesional/editar-profesional-modal/editar-profesional-modal.component';

import { UnidadEducativaComponent } from './unidadEducativa/unidad-educativa/unidad-educativa.component';
import { EspecialidadComponent } from './especialidad/especialidad/especialidad.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HeaderLoginComponent,
    HomeComponent,
    LoginComponent,
    PageComponent,
    ProfessionalComponent,
    CrearProfesionalModalComponent,
    DetalleProfesionalModalComponent,
    EditarProfesionalModalComponent,

    UnidadEducativaComponent,
    EspecialidadComponent,

    
 
   
  ],
  entryComponents:[
    DetalleProfesionalModalComponent,    
    CrearProfesionalModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    MatAutocompleteModule, 
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTableModule,
    MatDialogModule,
    MatTableModule

    
  ],
  providers: [ProfesionalesService,
    { provide: LOCALE_ID, useValue: 'es' },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
