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
    HeaderComponent
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
