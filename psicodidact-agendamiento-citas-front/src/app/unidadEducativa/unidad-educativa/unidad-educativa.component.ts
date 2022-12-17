
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/users/login/auth.service';
import Swal from 'sweetalert2';
import { CrearUnidadEducativaMpdalComponent } from '../crear-unidad-educativa/crear-unidad-educativa-mpdal/crear-unidad-educativa-mpdal.component';
import { UnidadEducativa } from './unidadEducativa';
import { UnidadEducativaService } from './unidadEducativa.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Profesional } from 'src/app/models/profesional';
import { DetallesUnidadEducativaModalComponent } from '../detalles_unidad_educativa/detalles-unidad-educativa-modal/detalles-unidad-educativa-modal.component';
import { EditarUnidadEducativaModalComponent } from '../editar-unidad-educativa/editar-unidad-educativa-modal/editar-unidad-educativa-modal.component';


@Component({
  selector: 'app-unidad-educativa',
  templateUrl: './unidad-educativa.component.html',
  styleUrls: ['./unidad-educativa.component.css']
})

export class UnidadEducativaComponent {
  mostrarColumnas: string[] = ['codigo','nombre', 'direccion','editar','ver'];
  dataSource = new MatTableDataSource<UnidadEducativa>();

  unidadesEducativasAsignar: UnidadEducativa [] = [];
  autocompleteControlNombre = new FormControl();
  unidadEducativa: UnidadEducativa = new UnidadEducativa();
  titulo: string = 'Nueva Unidad Educativa';
  inputTest="0";
  errores: String [] = [];
  unidadesEducativasFiltrados: Observable<UnidadEducativa[]> = new Observable();
  data: UnidadEducativa = new UnidadEducativa();
  
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    public dialog: MatDialog,
    public unidadEducativaService: UnidadEducativaService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    //public modalRef: MatDialogRef<CrearUnidadEducativaMpdalComponent>
  ) {}
  
  ngOnInit() {

      this.unidadesEducativasFiltrados = this.autocompleteControlNombre.valueChanges.pipe(
        map(value => typeof value === 'string' ? value : value.nombreUnidadEducativa), 
        flatMap(value => value ? this._filterNombre(value) : []));

     
  }
  //cedula
    private _filterNombre(value: string): Observable<UnidadEducativa[]> {
    const filterValue = value.toLowerCase();
    
    if(filterValue.match(/^[0-9]+$/)) {
      this.inputTest="0";
      return this.unidadEducativaService.getFiltrarUnidadEducativaCodigo(filterValue);
    } else {
      this.inputTest="1";
      return this.unidadEducativaService.getFiltrarUnidadEducativaNombre(filterValue);
    }
  }

  mostrarNombre(unidadEducativa ? : UnidadEducativa): string | "" {
    if(this.inputTest=="0"){
      return unidadEducativa ? unidadEducativa.codigoInstitucion : "";
    }else{
      return unidadEducativa ? unidadEducativa.nombreUnidadEducativa: "";
    }
    
  }

  seleccionarNombre(event: MatAutocompleteSelectedEvent): void {
    let unidadEducativa = event.option.value as UnidadEducativa;
    console.log(unidadEducativa);
    //this.profesionalesAsignar.push(profesional);
    this.autocompleteControlNombre.setValue('');
    event.option.focus();
    event.option.deselect();

  }


   crearUnidadEducativa(){ 
    this.dialog.open(CrearUnidadEducativaMpdalComponent)
   }

   editarUnidadEducativa(unidadEducativa: UnidadEducativa){ 
    this.dialog.open(EditarUnidadEducativaModalComponent, { 
      data: unidadEducativa
     });
     console.log( "Estoy en el editar",unidadEducativa.idUnidadEducativa);
   }

   verInformacionUnidadEducativa(unidadEducativa: UnidadEducativa){
    this.dialog.open(DetallesUnidadEducativaModalComponent, { 
      data: unidadEducativa
     });
   console.log( "Unidad Educativa",unidadEducativa);
   }

  }