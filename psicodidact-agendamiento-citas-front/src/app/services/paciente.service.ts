import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Paciente } from '../models/paciente';
import { AuthService } from '../users/login/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlEndPointPaciente:string='http://localhost:8080/api/pacientes';
 //  httpHeaders= new HttpHeaders( );
 private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http:HttpClient,public router: Router,
    public authService: AuthService
) { 

 // this.httpHeaders.append('Authorization', 'Bearer '+sessionStorage.getItem('token'));

//  console.log("el token es"+sessionStorage.getItem('token'));
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


  listarPaciente():Observable<Paciente[]>{

    return this.http.get<Paciente[]>(this.urlEndPointPaciente,{ headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }


   crearPaciente(paciente:Paciente):Observable<Paciente>{
    return this.http.post<Paciente>(this.urlEndPointPaciente,paciente ,{ headers: this.agregarAuthorizationHeader()})
    .pipe(
      map((response: any) => response.paciente as Paciente),
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




  obtenerPacienteById(id:number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.urlEndPointPaciente}/${id}`, { headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      }));
  }
  



  actualizarPaciente(paciente: Paciente): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.urlEndPointPaciente}/${paciente.idPaciente}`,paciente,
    { headers: this.agregarAuthorizationHeader()})
      .pipe(
        map((response: any) => response.paciente as Paciente),
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



  obtenerPacienteByCedula(cedula:string):Observable<Paciente[]>{
   
    return this.http.get<Paciente[]>(`${this.urlEndPointPaciente}/cedula/${cedula}`,{ headers: this.agregarAuthorizationHeader()}).pipe(
    
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  obtenerPacienteByApellido(apellido:string):Observable<Paciente[]>{
   
    return this.http.get<Paciente[]>(`${this.urlEndPointPaciente}/apellido/${apellido}`,{ headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  
  getFiltrarPacienteDni(dni: String): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.urlEndPointPaciente+'/identificacion'}/${dni}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
 }

  getFiltrarPacienteApellidoPaterno(apellidoPaterno: String): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.urlEndPointPaciente+'/apellido/paterno'}/${apellidoPaterno}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
 }

/*
  getFiltrarPacienteApellidoPaterno(apellidoPaterno: String): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.urlEndPointPaciente+'/apellido/paterno'}/${apellidoPaterno}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
 }


  getFiltrarPacienteDni(dni: String): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.urlEndPointPaciente+'/identificacion'}/${dni}`,
    { headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
       this.isNoAutorizado(e);
       return throwError(e);
     })
   );
 }
  
*/
}
