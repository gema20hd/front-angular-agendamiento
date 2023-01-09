import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../users/login/auth.service';
import swal from 'sweetalert2';
import { UnidadEducativa } from '../models/unidadEducativa';

@Injectable({
  providedIn: 'root'
})
export class UnidadEducativaService {

  private url:string="http://localhost:8080/api/unidadesEducativas";
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


  listarUnidadEducativa():Observable<UnidadEducativa[]>{

    return this.http.get<UnidadEducativa[]>(this.url,{ headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getFiltrarUnidadEducativaNombre(nombreUnidadEducativa: String): Observable<UnidadEducativa[]> {
    return this.http.get<UnidadEducativa[]>(`${this.url+'/nombre'}/${nombreUnidadEducativa}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
 }

}
