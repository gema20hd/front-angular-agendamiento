
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/users/login/auth.service';
import { UnidadEducativa } from './unidadEducativa';
import { UnidadEducativaService } from './unidadEducativa.service';

@Component({
  selector: 'app-unidad-educativa',
  templateUrl: './unidad-educativa.component.html',
  styleUrls: ['./unidad-educativa.component.css']
})

export class UnidadEducativaComponent {
  mostrarColumnas: string[] = ['nombre', 'direccion','codigo'];
  //mostrarColumnasAlumnos: string[] = ['id', 'nombre', 'apellido', 'email', 'eliminar'];

  unidadesEducativasAsignar: UnidadEducativa [] = [];
  autocompleteControlNombre = new FormControl();
  unidadEducativa: UnidadEducativa = new UnidadEducativa();
  titulo: string = 'Nuevo Unidad Educativa';
  inputTest="0";
  unidadesEducativasFiltrados: Observable<UnidadEducativa[]> = new Observable();
  constructor(
    public http: HttpClient,
    public authService: AuthService,
    public unidadEducativaService: UnidadEducativaService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}
  
  ngOnInit() {

      this.unidadesEducativasFiltrados = this.autocompleteControlNombre.valueChanges.pipe(
        map(value => typeof value === 'string' ? value : value.codigoInstitucion), 
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

}