import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageComponent } from './error_page/page/page.component';
import { HomeComponent } from './home/home/home.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ProComponent } from './pro/pro/pro.component';
import { ProfessionalComponent } from './professional/professional/professional.component';
import { AuthGuard } from './users/login/guards/auth.guard';
import { DesactiveGuard } from './users/login/guards/desactive.guard';
import { LoginComponent } from './users/login/login.component';

const routes: Routes = [
  {path: '',component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  {path: 'home',component: HomeComponent,pathMatch: 'full',canActivate: [DesactiveGuard] },
  { path: 'profesionales', component: ProfessionalComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'profesionales/:id', component: ProfessionalComponent },
  { path: 'profesionales/identificacion/:dni', component: ProfessionalComponent },
  { path: 'profesionales/apellidoPaterno/:name', component: ProfessionalComponent },
  { path: 'profesionales/apellidoMaterno/:lastname', component: ProfessionalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
