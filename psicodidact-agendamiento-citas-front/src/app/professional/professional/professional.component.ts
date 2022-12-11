import { Component, OnInit } from '@angular/core';
import { Profesional } from './profesional';
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
import { flatMap, Observable, startWith } from 'rxjs';
import { ModalService } from './modal.service';
import { map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css'],
})
export class ProfessionalComponent {


  mostrarColumnas: string[] = ['identificacionProfesional', 'nombresProfesional', 'apellidoPaternoProfesional', 'celularProfesional' , 'estado','editar','ver'];
  //mostrarColumnasAlumnos: string[] = ['id', 'nombre', 'apellido', 'email', 'eliminar'];

  profesionalesAsignar: Profesional[] = [];
  bancosAsignar: Banco[] = [];
  inputTest="0";

  autocompleteControlApellidoCedula = new FormControl();
  


  profesionalesFiltrados: Observable<Profesional[]> = new Observable();
  
  titulo: string = 'Nuevo Profesional';
  profesional: Profesional = new Profesional();
  banco: Banco = new Banco();
  genero: Genero = new Genero();


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

  constructor(
    public http: HttpClient,
    public modalService: ModalService,
    public authService: AuthService,
    public profesionalService: ProfesionalesService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}



  ngOnInit() {

		
    this.profesionalesFiltrados = this.autocompleteControlApellidoCedula.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.identificacionProfesional), 
      flatMap(value => value ? this._filterApellidoCedula(value) : []));
	
  }

  
  //cedula
  private _filterApellidoCedula(value: string): Observable<Profesional[]> {
    const filterValue = value.toLowerCase();
    
    if(filterValue.match(/^[0-9]+$/)) {
      this.inputTest="0";
      return this.profesionalService.getFiltrarProfesionalDni(filterValue);
    } else {
      this.inputTest="1";
      return this.profesionalService.getFiltrarProfesionalApellidoPaterno(filterValue);
    }
    
  }

  mostrarApellidoCedula(profesional ? : Profesional): string | "" {
    if(this.inputTest=="0"){
      return profesional ? profesional.identificacionProfesional : "";
    }else{
      return profesional ? profesional.apellidoPaternoProfesional: "";
    }  
  
  }

  seleccionarApellidoCedula(event: MatAutocompleteSelectedEvent): void {
    let profesional = event.option.value as Profesional;
    console.log(profesional);
    //this.profesionalesAsignar.push(profesional);
    this.autocompleteControlApellidoCedula.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  
  
  
}

