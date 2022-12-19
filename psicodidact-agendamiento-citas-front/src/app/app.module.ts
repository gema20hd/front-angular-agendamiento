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
import { LoginComponent } from './users/login/login.component';
import { PageComponent } from './error_page/page/page.component';
import { ProfessionalComponent } from './professional/professional/professional.component';


import { ProfesionalesService } from './services/profesionales.service';
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
import { CrearUnidadEducativaMpdalComponent } from './unidadEducativa/crear-unidad-educativa/crear-unidad-educativa-mpdal/crear-unidad-educativa-mpdal.component';
import { DetallesUnidadEducativaModalComponent } from './unidadEducativa/detalles_unidad_educativa/detalles-unidad-educativa-modal/detalles-unidad-educativa-modal.component';
import { EditarUnidadEducativaModalComponent } from './unidadEducativa/editar-unidad-educativa/editar-unidad-educativa-modal/editar-unidad-educativa-modal.component';
import { DetallesEspecialidadModalComponent } from './especialidad/detalles_especialidad/detalles-especialidad-modal/detalles-especialidad-modal.component';
import { CrearEspecialidadModalComponent } from './especialidad/crear_especialidad/crear-especialidad-modal/crear-especialidad-modal.component';
import { EditarEspecialidadModalComponent } from './especialidad/editar_especialidad/editar-especialidad-modal/editar-especialidad-modal.component';


import {MatMenuModule} from '@angular/material/menu';
import { PacientesComponent } from './pacientes/pacientes.component';
import {MatCardModule} from '@angular/material/card';

import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

import { DialogoCrearComponent } from './pacientes/dialogo-crear/dialogo-crear.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogInformacionComponent } from './pacientes/dialog-informacion/dialog-informacion.component';



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
    ProfessionalComponent,

    PacientesComponent,
    DialogoCrearComponent,
    DialogInformacionComponent,

    CrearProfesionalModalComponent,
    DetalleProfesionalModalComponent,
    EditarProfesionalModalComponent,
    UnidadEducativaComponent,
    EspecialidadComponent,
    CrearUnidadEducativaMpdalComponent,
    DetallesUnidadEducativaModalComponent,
    EditarUnidadEducativaModalComponent,
    DetallesEspecialidadModalComponent,
    CrearEspecialidadModalComponent,
    EditarEspecialidadModalComponent,
    

    
 

   
  ],
  entryComponents:[
    DetalleProfesionalModalComponent,    
    CrearProfesionalModalComponent,
    EditarProfesionalModalComponent,

    CrearUnidadEducativaMpdalComponent,
    EditarUnidadEducativaModalComponent,
    DetallesUnidadEducativaModalComponent,
    
    EditarEspecialidadModalComponent,
    DetallesEspecialidadModalComponent,
    CrearEspecialidadModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatTooltipModule,
    MatAutocompleteModule,
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
