import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  usuario: Usuario;
  constructor(public authService: AuthService,
    public router: Router) { this.usuario = new Usuario()}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    let role = next.data['role'] as string;
    console.log( "Role-----",role);
    if (this.authService.hasRole(role)) {
      return true;
    }
    swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
    this.router.navigate(['/home']);
    return false;
  }
}
