import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Especialidad } from 'src/app/models/especialidad';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/users/login/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
 private especialidad: Especialidad;
 private urlEndPointEspecialidades: string = 'http://localhost:8080/api/especialidades';

 private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(public http: HttpClient, public router: Router, public authService: AuthService) {
    this.especialidad=new Especialidad();
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

  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(`${this.urlEndPointEspecialidades}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
 }

getEspecialidadId(id: number): Observable<Especialidad> {
  return this.http.get<Especialidad>(`${this.urlEndPointEspecialidades}/${id}`, 
  { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      if (this.isNoAutorizado(e)) {
        return throwError(e);
      }
      return throwError(e);
    })
  );
} 

getFiltrarNombreEspecialidad(nombre : String): Observable<Especialidad[]> {
  return this.http.get<Especialidad[]>(`${this.urlEndPointEspecialidades+'/descripcion'}/${nombre}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
 }

  create(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post(this.urlEndPointEspecialidades, especialidad)
      .pipe(
        map((response: any) => response.especialidad as Especialidad),
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
  
 

  update(especialidad: Especialidad): Observable<any> {
    return this.http.put<any>(`${this.urlEndPointEspecialidades}/${especialidad.idEspecialidad}`, Especialidad).pipe(
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

  delete(id: number): Observable<Especialidad> {
    return this.http.delete<Especialidad>(`${this.urlEndPointEspecialidades}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

}