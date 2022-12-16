import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Antecedente } from '../models/antecedente';
import { AuthService } from '../users/login/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AntecedenteService {

  private urlEndPointAntecedente:string="http://localhost:8080/api/antecedente";
  private httpHeaders= new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http:HttpClient,  public authService: AuthService,
   public router: Router ) { }



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



 listarAntecedentes():Observable<Antecedente[]>{

  return this.http.get<Antecedente[]>(this.urlEndPointAntecedente,{ headers: this.agregarAuthorizationHeader()}).pipe(
    catchError(e => {
      this.isNoAutorizado(e);
      return throwError(e);
    })
  );
}



crearAntecedentes(antecedente: Antecedente): Observable<Antecedente> {
  return this.http.post(this.urlEndPointAntecedente,antecedente ,{ headers: this.agregarAuthorizationHeader()})
    .pipe(
      map((response: any) => response.antecedente as Antecedente),
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

actualizarAntecedentes(antecedente: Antecedente): Observable<Antecedente> {
  return this.http.put<any>(`${this.urlEndPointAntecedente}/${antecedente.idAntecedente}`, antecedente,{ headers: this.agregarAuthorizationHeader()})
    .pipe(
      map((response: any) => response.antecedente as Antecedente),
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
