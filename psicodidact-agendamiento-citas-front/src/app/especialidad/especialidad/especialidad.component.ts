import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/users/login/auth.service';
import { CrearEspecialidadModalComponent } from '../crear_especialidad/crear-especialidad-modal/crear-especialidad-modal.component';
import { DetallesEspecialidadModalComponent } from '../detalles_especialidad/detalles-especialidad-modal/detalles-especialidad-modal.component';
import { EditarEspecialidadModalComponent } from '../editar_especialidad/editar-especialidad-modal/editar-especialidad-modal.component';
import { Especialidad } from './especialidad';
import { EspecialidadesService } from '../../services/especialidades.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent {
  mostrarColumnas: string[] = ['nombre','editar','ver'];


  inputTest="0";
  errores: String [] = [];


  especialidadesAsignar: Especialidad [] = [];
  autocompleteControlNombre = new FormControl();
  especialidad: Especialidad = new Especialidad();
  titulo: string = 'Nuevo Especialidad';
  especialidadesFiltrados: Observable<Especialidad[]> = new Observable();
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    public especialidadService: EspecialidadesService,
    public router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit() {

      this.especialidadesFiltrados = this.autocompleteControlNombre.valueChanges.pipe(
        map(value => typeof value === 'string' ? value : value.descripcionEspecialidad), 
        flatMap(value => value ? this._filterNombre(value) : []));

  }
  

  private _filterNombre(value: string): Observable<Especialidad[]> {
    const filterValue = value.toLowerCase();
    return this.especialidadService.getFiltrarNombreEspecialidad(filterValue);
  }

  mostrarNombre(especialidad ? : Especialidad): string | "" {
    return especialidad ? especialidad.descripcionEspecialidad : "";
  }

  seleccionarNombre(event: MatAutocompleteSelectedEvent): void {
    let especialidad = event.option.value as Especialidad;
    console.log(especialidad);
    //this.profesionalesAsignar.push(profesional);
    this.autocompleteControlNombre.setValue('');
    event.option.focus();
    event.option.deselect();

  }


  crearEspecialidad(){ 
    this.dialog.open(CrearEspecialidadModalComponent)
   }

   editarEspecialidad(especialidad: Especialidad){ 
    this.dialog.open(EditarEspecialidadModalComponent, { 
      data: especialidad
     });
     console.log( "Estoy en el editar",especialidad.idEspecialidad);
   }

   verInformacionEspecialidad(especialidad: Especialidad){
    this.dialog.open(DetallesEspecialidadModalComponent, { 
      data: especialidad
     });
   console.log( "Especialidad",especialidad);
   }

}


