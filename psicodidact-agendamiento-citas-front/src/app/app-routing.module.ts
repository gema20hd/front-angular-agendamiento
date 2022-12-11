import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageComponent } from './error_page/page/page.component';
import { EspecialidadComponent } from './especialidad/especialidad/especialidad.component';
import { HomeComponent } from './home/home/home.component';
import { ProfessionalComponent } from './professional/professional/professional.component';
import { UnidadEducativaComponent } from './unidadEducativa/unidad-educativa/unidad-educativa.component';
import { AuthGuard } from './users/login/guards/auth.guard';
import { RoleGuard } from './users/login/guards/role.guard';
import { LoginComponent } from './users/login/login.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';



const routes: Routes = [
  {path: '',component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  {path: 'home',component: HomeComponent,pathMatch: 'full' },
  { path: 'profesionales', component: ProfessionalComponent },
  {path: 'especialidades', component: EspecialidadComponent },
  {path: 'unidadEducativa', component: UnidadEducativaComponent },
  {path: 'unidadEducativa/:id', component: UnidadEducativaComponent },
  { path: 'profesionales/:id', component: ProfessionalComponent },
  { path: 'profesionales/identificacion/:dni', component: ProfessionalComponent },
  { path: 'profesionales/apellidoPaterno/:name', component: ProfessionalComponent },
  { path: 'profesionales/apellidoMaterno/:lastname', component: ProfessionalComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, MatInputModule,MatAutocompleteModule,MatFormFieldModule],

})
export class AppRoutingModule {}
