import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesional } from './professional/profesional';


@Injectable({
  providedIn: 'root'
})
export class ProfesionalesService {
 private profesional: Profesional;
 private urlEndPoint: string = 'http://localhost:8080/api/profesionales';

  constructor() {
    this.profesional=new Profesional();
   }

   listarProfesionales(usuario: Profesional): Observable<any> {
        const urlEndpoint = 'http://localhost:8080/';
    
    }

}
