import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cuenta } from 'src/app/models/cuenta';
import { AuthService } from 'src/app/users/login/auth.service';
import { Profesional } from '../profesional';
import swal from 'sweetalert2';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  cuenta: Cuenta = new Cuenta();
  profesional: Profesional = new Profesional();
 
  //private urlEndPointProfesionales: string = 'http://localhost:8080/api/profesionales';
  private urlEndPointCuentas: string = 'http://localhost:8080/api/cuentas';
 
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(
   public http: HttpClient,
   public router: Router,
   public authService: AuthService) {

  }

  private agregarAuthorizationHeader() {
     
    let token = sessionStorage.getItem('token');
    //console.log("token desde sessionStorage",token)
   
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e: any): boolean {
    if (e.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }
    if (e.status == 403) {
      swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }


  create(cuenta: Cuenta): Observable<Cuenta> {
    return this.http.post(this.urlEndPointCuentas, cuenta,
    { headers: this.agregarAuthorizationHeader()}).pipe(
        map((response: any) => response.cuenta as Cuenta),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));
  }


}
