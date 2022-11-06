import { Component, OnInit } from '@angular/core';
import { Profesional } from './profesional';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/users/login/auth.service';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ProfesionalesService } from './profesionales.service';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent {
 
  profesionales: Profesional[] = [];
  constructor(private http: HttpClient, private router: Router, 
    private authService: AuthService, 
    public profesionalService: ProfesionalesService) { }



 

  
}
