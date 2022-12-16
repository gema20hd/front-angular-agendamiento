import { NgModule } from '@angular/core';
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
import {HttpClientModule} from '@angular/common/http';
//import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './users/login/login.component';
import { PageComponent } from './error_page/page/page.component';
import { ProfessionalComponent } from './professional/professional/professional.component';
import { DetalleComponent } from './professional/professional/detalles/detalle/detalle.component';
import { ProComponent } from './pro/pro/pro.component';

import {MatMenuModule} from '@angular/material/menu';
import { PacientesComponent } from './pacientes/pacientes.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogoCrearComponent } from './pacientes/dialogo-crear/dialogo-crear.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DialogInformacionComponent } from './pacientes/dialog-informacion/dialog-informacion.component';

import {MatAutocompleteModule} from '@angular/material/autocomplete';


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
    DetalleComponent,
    ProfessionalComponent,
    ProComponent,
    PacientesComponent,
    DialogoCrearComponent,
    DialogInformacionComponent,
   
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
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
