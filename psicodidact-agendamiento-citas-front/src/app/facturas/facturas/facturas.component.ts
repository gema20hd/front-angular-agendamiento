import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, map, Observable } from 'rxjs';
import { FacturaCompra } from 'src/app/models/facturaCompra';
import { Paciente } from 'src/app/models/paciente';
import { FacturaService } from 'src/app/services/factura.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { AuthService } from 'src/app/users/login/auth.service';
import { CrearFacturaComponent } from '../crear-facturas/crear-factura/crear-factura.component';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  titulo: string = 'Nuevo Factura';
  facturaCompra: FacturaCompra = new FacturaCompra();

  //mostrarColumnas: string[] = ['identificacionProfesional', 'nombresProfesional', 'apellidoPaternoProfesional', 'celularProfesional' , 'estado','editar','ver'];
  //mostrarColumnasAlumnos: string[] = ['id', 'nombre', 'apellido', 'email', 'eliminar'];
  dataSource = new MatTableDataSource<FacturaCompra>();
  autocompleteControlApellidoCedula = new FormControl();
  pacientesFiltrados: Observable<Paciente[]> = new Observable();
  inputTest="0";
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    public facturaService: FacturaService,
    public router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    public pacienteService : PacienteService


  ) {}

  ngOnInit() {
    this.pacientesFiltrados = this.autocompleteControlApellidoCedula.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.identificacionProfesional), 
      flatMap(value => value ? this._filterApellidoCedula(value) : []));
	  
  }


  private _filterApellidoCedula(value: string): Observable<Paciente[]> {
    const filterValue = value.toLowerCase();
    
    if(filterValue.match(/^[0-9]+$/)) {
      this.inputTest="0";
      return this.pacienteService.getFiltrarPacienteDni(filterValue);
    } else {
      this.inputTest="1";
      return this.pacienteService.getFiltrarPacienteApellidoPaterno(filterValue);
    }
    
  }

  mostrarApellidoCedula(paciente ? : Paciente): string | "" {
    if(this.inputTest=="0"){
      return paciente? paciente.identificacionPaciente : "";
    }else{
      return paciente? paciente.apellidoPaternoPaciente: "";
    }  
  
  }

  seleccionarApellidoCedula(event: MatAutocompleteSelectedEvent): void {
    let profesional = event.option.value as Paciente;
    console.log(profesional);
    this.autocompleteControlApellidoCedula.setValue('');
    event.option.focus();
    event.option.deselect();

  }


   crearProfesional(){ 
    this.dialog.open(CrearFacturaComponent)
   }
 /*
   editarProfesional(profesional: Paciente){ 
    this.dialog.open( , { 
      data: profesional
     });
     console.log( "Estoy en el editar",profesional);
   }
   */

}
