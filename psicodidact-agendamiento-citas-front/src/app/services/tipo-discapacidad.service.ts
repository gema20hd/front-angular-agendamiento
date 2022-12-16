import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TipoDiscapacidad } from '../models/tipoDiscapacidad';
import { AuthService } from '../users/login/auth.service';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class TipoDiscapacidadService {

  private url:string="http://localhost:8080/api/tiposDiscapacidades";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient,public router: Router,
    public authService: AuthService) { }

  private agregarAuthorizationHeader() {
     
    let token = sessionStorage.getItem('token');

   
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

  listarTipoDiscapacidad():Observable<TipoDiscapacidad[]>{

    return this.http.get<TipoDiscapacidad[]>(this.url,{ headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }




   crearTipoDiscapacidad(tipoDiscapacidad: TipoDiscapacidad): Observable<TipoDiscapacidad> {
    return this.http.post(this.url,tipoDiscapacidad,{ headers: this.agregarAuthorizationHeader()})
      .pipe(
        map((response: any) => response.tipoDiscapacidad as TipoDiscapacidad),
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

  
  obtenerTipoDiscapacidadById(id:number): Observable<TipoDiscapacidad> {
    

    return this.http.get<TipoDiscapacidad>(`${this.url}/${id}`,{ headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }
  

  
}
