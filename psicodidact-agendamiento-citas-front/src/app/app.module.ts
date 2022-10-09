import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login/login.component';
import { FooterComponent } from './footer/footer/footer.component';
import { BodyComponent } from './body/body/body.component';
import { HeaderComponent } from './header/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { BarraMenuComponent } from './barra_menu/barra-menu/barra-menu.component';
import { HeaderLoginComponent } from './header_login/header-login/header-login.component';

//const routes: Routes =[
 // {path: '' ,redirectTo:  '/clientes', pathMatch: 'full'}
//  
//]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    BodyComponent,
    HeaderComponent,
    BarraMenuComponent,
    HeaderLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
