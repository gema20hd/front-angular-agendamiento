import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Banco } from 'src/app/models/banco';
import { Cuenta } from 'src/app/models/cuenta';
import { Discapacidad } from 'src/app/models/discapacidad';
import { EstadoCivil } from 'src/app/models/estadoCivil';
import { Genero } from 'src/app/models/genero';
import { ProfesionProfesional } from 'src/app/models/profesionProfesional';
import { TipoCuenta } from 'src/app/models/tipoCuenta';
import { TipoDiscapacidad } from 'src/app/models/tipoDiscapacidad';
import { TipoSangre } from 'src/app/models/tipoSangre';
import { Profesional } from './profesional';



@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {
 private profesional: Profesional;
 private urlEndPointProfesionales: string = 'http://localhost:8080/api/profesionales';
 private urlEndPointCuentas: string = 'http://localhost:8080/api/cuentas';

  constructor(public http: HttpClient, public router: Router) {
    this.profesional=new Profesional();
   }

  getGenero(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.urlEndPointProfesionales + '/genero');
  }

  getEstadoCivil(): Observable<EstadoCivil[]> {
    return this.http.get<EstadoCivil[]>(this.urlEndPointProfesionales + '/estadoCivil');
  }
  getDiscapacidad(): Observable<Discapacidad[]> {
    return this.http.get<Discapacidad[]>(this.urlEndPointProfesionales + '/discapacidad');
  }

  getTipoDiscapacidad(): Observable<TipoDiscapacidad[]> {
    return this.http.get<TipoDiscapacidad[]>(this.urlEndPointProfesionales + '/tipoDiscapacidad');
  }

  getTipoSangre(): Observable<TipoSangre[]> {
    return this.http.get<TipoSangre[]>(this.urlEndPointProfesionales + '/tipoSangre');
  }
  
  getProfesionProfesional(): Observable<ProfesionProfesional[]> {
    return this.http.get<ProfesionProfesional[]>(this.urlEndPointProfesionales + '/profesionProfesional');
  }

  getCuentas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.urlEndPointCuentas);
  }

  getTipoCuentas(): Observable<TipoCuenta[]> {
    return this.http.get<TipoCuenta[]>(this.urlEndPointCuentas + '/tipoCuentas');
  }

  getBanco(): Observable<Banco[]> {
    return this.http.get<Banco[]>(this.urlEndPointCuentas + '/banco');
  }

  getProfesional(): Observable<Profesional> {
    return this.http.get<Profesional>(`${this.urlEndPointProfesionales}`)
  }
  getProfesionalId(id: number): Observable<Profesional> {
    return this.http.get<Profesional>(`${this.urlEndPointProfesionales}/${id}`)
  }

  getProfesionalDni(dni: String): Observable<Profesional> {
    return this.http.get<Profesional>(`${this.urlEndPointProfesionales}/${dni}`);
  }
  getProfesionalApellidoPaterno(apellidoPaterno: String): Observable<Profesional> {
    return this.http.get<Profesional>(`${this.urlEndPointProfesionales}/${apellidoPaterno}`);
  }

  getProfesionalApellidoMaterno(apellidoMaterno: String): Observable<Profesional> {
    return this.http.get<Profesional>(`${this.urlEndPointProfesionales}/${apellidoMaterno}`);
  }

  create(profesional: Profesional): Observable<Profesional> {
    return this.http.post(this.urlEndPointProfesionales, profesional)
      .pipe(
        map((response: any) => response.profesional as Profesional),
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
  
  update(profesional: Profesional): Observable<any> {
    return this.http.put<any>(`${this.urlEndPointProfesionales}/${profesional.idProfesional}`, Profesional).pipe(
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

  delete(id: number): Observable<Profesional> {
    return this.http.delete<Profesional>(`${this.urlEndPointProfesionales}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      }));
  }

}
