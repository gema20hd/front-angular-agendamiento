import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/users/login/auth.service';
import { Especialidad } from './especialidad';
import { EspecialidadesService } from './especialidades.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent {
  mostrarColumnas: string[] = ['nombre', 'fechaIngreso','editar'];
  //mostrarColumnasAlumnos: string[] = ['id', 'nombre', 'apellido', 'email', 'eliminar'];

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
    public activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit() {

      this.especialidadesFiltrados = this.autocompleteControlNombre.valueChanges.pipe(
        map(value => typeof value === 'string' ? value : value.descripcionEspecialidad), 
        flatMap(value => value ? this._filterNombre(value) : []));

  }
  //cedula
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

}
