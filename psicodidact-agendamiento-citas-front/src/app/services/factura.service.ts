import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FacturaCompra } from '../models/facturaCompra';
import { AuthService } from '../users/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private facturaCompra: FacturaCompra;
  private urlEndPointFacturas: string = 'http://localhost:8080/api/facturas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(
    public http: HttpClient, 
    public router: Router, 
    public authService: AuthService
    ) { 
      this.facturaCompra = new FacturaCompra();
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
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }
  


}
