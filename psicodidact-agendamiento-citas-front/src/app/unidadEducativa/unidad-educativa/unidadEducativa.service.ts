import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/users/login/auth.service';
import { UnidadEducativa } from 'src/app/models/unidadEducativa';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UnidadEducativaService {
 private unidadEducativa: UnidadEducativa;
 private urlEndPointUnidadEducativa: string = 'http://localhost:8080/api/unidadesEducativas';

 private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(public http: HttpClient, public router: Router, public authService: AuthService) {
    this.unidadEducativa=new UnidadEducativa();
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

  getUnidadesEducativas(): Observable<UnidadEducativa[]> {
    return this.http.get<UnidadEducativa[]>(`${this.urlEndPointUnidadEducativa}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
   
 }

  getUnidadEducativaId(id: number): Observable<UnidadEducativa> {
    return this.http.get<UnidadEducativa>(`${this.urlEndPointUnidadEducativa}/${id}`, 
    { headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }


  getFiltrarUnidadEducativaCodigo(codigoInstitucion: String): Observable<UnidadEducativa[]> {
    return this.http.get<UnidadEducativa[]>(`${this.urlEndPointUnidadEducativa+'/codigo'}/${codigoInstitucion}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
 }
  
 

  getFiltrarUnidadEducativaNombre(nombreUnidadEducativa: String): Observable<UnidadEducativa[]> {
    return this.http.get<UnidadEducativa[]>(`${this.urlEndPointUnidadEducativa+'/nombre'}/${nombreUnidadEducativa}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
 }

 
  create(unidadEducativa: UnidadEducativa): Observable<UnidadEducativa> {
    return this.http.post(this.urlEndPointUnidadEducativa, unidadEducativa)
      .pipe(
        map((response: any) => response.unidadEducativa as UnidadEducativa),
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
  
  update(unidadEducativa: UnidadEducativa): Observable<any> {
    return this.http.put<any>(`${this.urlEndPointUnidadEducativa}/${unidadEducativa.idUnidadEducativa}`, UnidadEducativa).pipe(
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

  delete(id: number): Observable<UnidadEducativa> {
    return this.http.delete<UnidadEducativa>(`${this.urlEndPointUnidadEducativa}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

}