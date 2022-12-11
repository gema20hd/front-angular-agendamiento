
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
  errores: String [] = [];
  unidadesEducativasFiltrados: Observable<UnidadEducativa[]> = new Observable();
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

  create(): void {
    console.log(this.unidadEducativa);
    this.unidadEducativaService.create(this.unidadEducativa)
      .subscribe(
        unidadEducativa => {
          this.router.navigate(['/unidadEducativa']);
          Swal.fire('Nueva unidad educativa', `La unidad educativa ${unidadEducativa.nombreUnidadEducativa} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }
  

  update(): void {
    console.log(this.unidadEducativa);
    this.unidadEducativaService.update(this.unidadEducativa)
      .subscribe(
        json => {
          this.router.navigate(['/unidadEducativa']);
          Swal.fire('Unidad educativa Actualizado', `${json.mensaje}: ${json.unidadEducativa.nombreUnidadEducativa}`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

 

   crearUnidadEducativa(){ 
    this.dialog.open(CrearUnidadEducativaMpdalComponent
      ).afterClosed().subscribe(unidadEducativa=>{
      console.log(" data: ", unidadEducativa)
      }
      );
   }

  cancelar(): void{
   // this.modalRef.close();
  }
  
}