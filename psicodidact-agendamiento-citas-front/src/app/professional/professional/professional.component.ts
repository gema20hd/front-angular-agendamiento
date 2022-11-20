import { Component, OnInit } from '@angular/core';
import { Profesional } from './profesional';;
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/users/login/auth.service';
import { ProfesionalesService } from './profesionales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Genero } from 'src/app/models/genero';
import { EstadoCivil } from 'src/app/models/estadoCivil';
import { Discapacidad } from 'src/app/models/discapacidad';
import { TipoSangre } from 'src/app/models/tipoSangre';
import { TipoCuenta } from 'src/app/models/tipoCuenta';
import { TipoDiscapacidad } from 'src/app/models/tipoDiscapacidad';
import { Banco } from 'src/app/models/banco';
import { ProfesionProfesional } from 'src/app/models/profesionProfesional';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent {
 
  titulo: string = 'Nuevo Profesional';
  profesional: Profesional = new Profesional();
  profesionales: Profesional[] = [];
  generos: Genero[] = [];
  estadoCivil: EstadoCivil[] = [];
  discapacidades: Discapacidad[] = [];
  tiposDiscapacidades: TipoDiscapacidad[] = [];
  tipoSangre: TipoSangre[] = [];
  tiposCuentas: TipoCuenta[] = [];
  bancos: Banco[] = [];
  profesionProfesionales: ProfesionProfesional[] = [];
  errores: string[] = [];

  generoFiltrados: Observable<Genero[]> = new Observable;

  constructor(private http: HttpClient, 
    private authService: AuthService, 
    public profesionalService: ProfesionalesService,    
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      this.activatedRoute.paramMap.subscribe(params => {
        let id = +(params.get('id') != null);
        if (id) {
          this.profesionalService.getProfesionalId(id).subscribe((profesional) => this.profesional = profesional);
        }
      });
  
      this.profesionalService.getGenero().subscribe((generos) => {this.generos = generos})
      this.profesionalService.getEstadoCivil().subscribe((estadoCivil) => {this.estadoCivil = estadoCivil})
      this.profesionalService.getDiscapacidad().subscribe((discapacidades) => {this.discapacidades = discapacidades})
      this.profesionalService.getTipoDiscapacidad().subscribe((tiposDiscapacidades) => {this.tiposDiscapacidades = tiposDiscapacidades})
      this.profesionalService.getTipoCuentas().subscribe((tiposCuentas) => {this.tiposCuentas = tiposCuentas})
      this.profesionalService.getBanco().subscribe((bancos) => {this.bancos= bancos})
      this.profesionalService.getTipoSangre().subscribe((tipoSangre) => {this.tipoSangre = tipoSangre})
      this.profesionalService.getProfesionProfesional().subscribe((profesionProfesionales) => {this.profesionProfesionales = profesionProfesionales})

    }
 

    create(): void {
      console.log(this.profesional);
      this.profesionalService.create(this.profesional).subscribe((profesional)=>  {
            this.router.navigate(['/profesionales']);
            console.log("estoy aqui")
            swal.fire('Nuevo Profesional', `El profesional ${this.profesional.nombresProfesional} ha sido creado con éxito`, 'success');
          },
          err => {
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          }
        );
    }

    update(): void {
      console.log(this.profesional);
      this.profesional.genero;
      this.profesionalService.update(this.profesional)
        .subscribe(
          json => {
            this.router.navigate(['/profesionales']);
            swal.fire('Profesional Actualizado', `${json.mensaje}: ${json.profesional.nombresProfesional}`, 'success');
          },
          err => {
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          }
        )
    }
  
}
