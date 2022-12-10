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
import { map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DetalleProfesionalModalComponent } from './detalles_profesional/detalle-profesional-modal/detalle-profesional-modal.component';
import { EditarProfesionalModalComponent } from './editar_profesional/editar-profesional-modal/editar-profesional-modal.component';
import { CrearProfesionalModalComponent } from './crear_profesional/crear-profesional-modal/crear-profesional-modal.component';
import { AuxProfesional } from 'src/app/models/auxProfesional';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css'],
})
export class ProfessionalComponent {


  mostrarColumnas: string[] = ['identificacionProfesional', 'nombresProfesional', 'apellidoPaternoProfesional', 'celularProfesional' , 'estado','editar','ver'];
  //mostrarColumnasAlumnos: string[] = ['id', 'nombre', 'apellido', 'email', 'eliminar'];

  dataSource = new MatTableDataSource<Profesional>();

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
  auxProfesionales: AuxProfesional[] =[];
  profesionales: Profesional[] = [];
  errores: string[] = [];

  constructor(
    public http: HttpClient,
    public authService: AuthService,
    public profesionalService: ProfesionalesService,
    public router: Router,
    public dialog: MatDialog,
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

  verInformacionProfesiona(row :any){
    this.dialog.open(DetalleProfesionalModalComponent,{
      data:row
    });
    console.log('el  row '+row);
   }

   /*
   // verInformacionProfesional(profesional: Profesional): void {
     verInformacionProfesional(profesional: any) {
  //  this.profesionalService.getProfesionalId( profesional.idProfesional)
  //  .subscribe(rs => {
    //  const modalRef = this.dialog.open(DetalleProfesionalModalComponent, {
    //    width: '800px',
    //    data: {rs}
      
    //  });
   //   modalRef.afterClosed().subscribe(() => {
   //     console.log('Modal ver detalle cerrado');
   //   })
   //   console.log( " data oficial", profesional)
   // });
   this.dialog.open(DetalleProfesionalModalComponent, { 
       data: profesional
      });

   */
 
   verInformacionProfesional(profesional: Profesional) {
     this.dialog.open(DetalleProfesionalModalComponent, { 
       data: profesional
      });

  }
  

 
 

   /*
 private crearDtoProfesional(profesionales:Profesional[]){
  this.dataSource = new MatTableDataSource<Profesional>();
  let nuevoProfesional:AuxProfesional;

  for (let i = 0; i < this.profesionales.length; i++) {
    nuevoProfesional= new AuxProfesional();
    this.profesional=profesionales[i];
     
    if (this.profesional) {
      nuevoProfesional.id=this.profesional.idProfesional;
      this.profesional.idProfesional ? nuevoProfesional.estado="Activo": nuevoProfesional.estado="Inactivo";
      this.profesional.idProfesional ? nuevoProfesional.posee_carnet="Si":  nuevoProfesional.posee_carnet="No";
      console.log("LO QUE INGRESA");
      console.log(nuevoProfesional);
      this.auxProfesionales.push(nuevoProfesional);
    }

   }
   */

   
 }
}

