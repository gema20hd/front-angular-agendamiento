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


  autocompleteControlCedula = new FormControl();
  autocompleteControlApellido = new FormControl();
  autocompleteControlBanco = new FormControl();


  profesionalesFiltrados: Observable<Profesional[]> = new Observable();
  cedulaProfesionalesFiltrados: Observable<Profesional[]> = new Observable();
  bancosFiltrados: Observable<Banco[]> = new Observable();
  //generoFiltrados: Observable<Genero[]> = new Observable();


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

		
    this.profesionalesFiltrados = this.autocompleteControlApellido.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.apellidoPaternoProfesional), 
      flatMap(value => value ? this._filterApellido(value) : []));
	  
	  
      this.cedulaProfesionalesFiltrados = this.autocompleteControlCedula.valueChanges.pipe(
        map(value => typeof value === 'string' ? value : value.identificacionProfesional), 
        flatMap(value => value ? this._filterCedula(value) : []));

        


  }

  
  //cedula
  private _filterCedula(value: string): Observable<Profesional[]> {
    const filterValue = value;
    return this.profesionalService.getFiltrarProfesionalDni(filterValue);
  }

  mostrarCedula(profesional ? : Profesional): string | "" {
    return profesional ? profesional.identificacionProfesional : "";
  }

  seleccionarCedula(event: MatAutocompleteSelectedEvent): void {
    let profesional = event.option.value as Profesional;
    console.log(profesional);
    //this.profesionalesAsignar.push(profesional);
    this.autocompleteControlCedula.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  //apellido
  private _filterApellido(value: string): Observable<Profesional[]> {
    const filterValue = value;
    return this.profesionalService.getFiltrarProfesionalApellidoPaterno(filterValue);
  }

  
  mostrarApellido(profesional ? : Profesional): string | "" {
    return profesional ? profesional.apellidoPaternoProfesional : "";
    console.log("mostrar apellido",profesional)
  }

  seleccionarApellido(event: MatAutocompleteSelectedEvent): void {
    let profesional = event.option.value as Profesional;
    console.log(profesional);
    this.profesionalesAsignar.push(profesional);
    this.autocompleteControlApellido.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  //banco
  private _filterBanco(value: string): Observable<Banco[]> {
    const filterValue = value;
    return this.profesionalService.getFiltrarBanco(filterValue);
  }

  
  mostrarBanco(banco ? : Banco): string | "" {
    return banco ? banco.descripcionBanco : "";
  }

  seleccionarBanco(event: MatAutocompleteSelectedEvent): void {
    let banco = event.option.value as Banco;
    console.log(banco);
    this.bancosAsignar.push(banco);
    this.autocompleteControlBanco.setValue('');
    event.option.focus();
    event.option.deselect();

  }
  
}

