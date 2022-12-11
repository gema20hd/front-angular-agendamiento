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



  autocompleteControlCedula = new FormControl();
  autocompleteControlApellido = new FormControl();

  
  bancosAsignar: Banco[] = [];
  inputTest="0";

  autocompleteControlApellidoCedula = new FormControl();

  


  profesionalesFiltrados: Observable<Profesional[]> = new Observable();

  cedulaProfesionalesFiltrados: Observable<Profesional[]> = new Observable();
 
  //generoFiltrados: Observable<Genero[]> = new Observable();


  titulo: string = 'Nuevo Profesional';
  profesional: Profesional = new Profesional();
  auxProfesionales: AuxProfesional[] =[];
  banco: Banco = new Banco();
  genero: Genero = new Genero();



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
      flatMap(value => value ? this._filterApellidoCedula(value) : []));
	  
	
	

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
   editarInformacionProfesional(profesional:Profesional)
   {}

   crearProfesional(){ 
    this.dialog.open(CrearProfesionalModalComponent
      ).afterClosed().subscribe(profesional=>{
      console.log(" data: ", profesional)
      }
      );
   }

   
 

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

