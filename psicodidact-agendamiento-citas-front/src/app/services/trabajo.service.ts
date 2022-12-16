import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Trabajo } from '../models/trabajo';
import { AuthService } from '../users/login/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TrabajoService {

  private url:string="http://localhost:8080/api/trabajos";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient,public router: Router,
    public authService: AuthService) { }

  listarTrabajo():Observable<Trabajo[]>{

    return this.http.get<Trabajo[]>(this.url);
  
   }


   
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


  crearTrabajo(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.post(this.url,trabajo ,{ headers: this.agregarAuthorizationHeader()})
      .pipe(
        map((response: any) => response.trabajo as Trabajo),
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
  

  actualizarTrabajo(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.put<any>(`${this.url}/${trabajo.idTrabajo}`, trabajo ,{ headers: this.agregarAuthorizationHeader()})
      .pipe(
        map((response: any) => response.trabajo as Trabajo),
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
