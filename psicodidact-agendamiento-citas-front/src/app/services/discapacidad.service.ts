import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Discapacidad } from '../models/discapacidad';
import swal from 'sweetalert2';
import { AuthService } from '../users/login/auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DiscapacidadService {

  private urlEndPointDiscapacidad:string="http://localhost:8080/api/discapacidades";
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

  listarDiscapacidad():Observable<Discapacidad[]>{

    return this.http.get<Discapacidad[]>(this.urlEndPointDiscapacidad,
      { headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }



  crearDiscapacidad(discapacidad: Discapacidad): Observable<Discapacidad> {
    return this.http.post(this.urlEndPointDiscapacidad,discapacidad,
      { headers: this.agregarAuthorizationHeader()}).pipe(
          map((response: any) => response.discapacidad as Discapacidad),
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
  
  
  actualizarDiscapacidad(discapacidad: Discapacidad): Observable<Discapacidad> {
    return this.http.put<any>(`${this.urlEndPointDiscapacidad}/${discapacidad.idDiscapacidad}`, discapacidad,{ headers: this.agregarAuthorizationHeader()})
      .pipe(
        map((response: any) => response.discapacidad as Discapacidad),
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

  obtenerDiscapacidadById(id:number): Observable<Discapacidad> {
    

    return this.http.get<Discapacidad>(`${this.urlEndPointDiscapacidad}/${id}`,{ headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }
  

  eliminarDiscapacidad(id: number): Observable<Discapacidad> {
    return this.http.delete<Discapacidad>(`${this.urlEndPointDiscapacidad}/${id}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }


}
