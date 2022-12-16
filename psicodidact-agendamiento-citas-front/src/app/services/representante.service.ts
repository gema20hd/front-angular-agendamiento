import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Representante } from '../models/representante';
import { AuthService } from '../users/login/auth.service';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  private url:string="http://localhost:8080/api/representantes";
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



  listarRepresentante():Observable<Representante[]>{

    return this.http.get<Representante[]>(this.url,{ headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }




  
  crearRepresentante(representante: Representante): Observable<Representante> {
    return this.http.post(this.url,representante,{ headers: this.agregarAuthorizationHeader()})
      .pipe(
        map((response: any) => response.representante as Representante),
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




  obtenerRepresentanteById(id:number): Observable<Representante> {
    
    console.log("ingresa obtener");
    return this.http.get<Representante>(`${this.url}/${id}`,{ headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }
  


  actualizarRepresentante(representante: Representante): Observable<Representante> {
    return this.http.put<Representante>(`${this.url}/${representante.idRepresentante}`,representante,{ headers: this.agregarAuthorizationHeader()})
      .pipe(
        map((response: any) => response.representante as Representante),
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
  
  
  eliminarRepresentante(id:number):Observable<Representante>{
    return this.http.delete<Representante>(`${this.url}/${id}`);
  
  }
  

  obtenerRepresentanteByCedula(cedula:string):Observable<Representante>{
   
    return this.http.get<Representante>(`${this.url}/cedula/${cedula}`, { headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }
}
