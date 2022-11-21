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
    ProfessionalComponent
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
