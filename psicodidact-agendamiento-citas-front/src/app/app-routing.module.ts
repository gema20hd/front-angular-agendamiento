import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageComponent } from './error_page/page/page.component';
import { HomeComponent } from './home/home/home.component';
import { ProfessionalComponent } from './professional/professional/professional.component';
import { AuthGuard } from './users/login/guards/auth.guard';
import { DesactiveGuard } from './users/login/guards/desactive.guard';
import { LoginComponent } from './users/login/login.component';

const routes: Routes = [
  {path: '',component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  {path: 'home',component: HomeComponent,pathMatch: 'full',canActivate: [DesactiveGuard] },
  { path: 'profesionales', component: ProfessionalComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
