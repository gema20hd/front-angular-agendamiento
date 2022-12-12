import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Especialidad } from '../../especialidad/especialidad';
import { EspecialidadesService } from '../../especialidad/especialidades.service';

@Component({
  selector: 'app-crear-especialidad-modal',
  templateUrl: './crear-especialidad-modal.component.html',
  styleUrls: ['./crear-especialidad-modal.component.css']
})
export class CrearEspecialidadModalComponent {
  mostrarColumnas: string[] = ['nombre'];
  dialogForm!: FormGroup;
  autocompleteControlNombre = new FormControl();
  especialidad: Especialidad;
  titulo: string = 'Nuevo Especialidad';

  errores: String [] = [];
  unidadesEducativasFiltrados: Observable<Especialidad[]> = new Observable();
  
  constructor(
    
  public router: Router,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public modalRef: MatDialogRef<CrearEspecialidadModalComponent>,
  public http: HttpClient,
  public especialidadesService: EspecialidadesService

  ) {this.especialidad = new Especialidad()}

  ngOnInit(): void {


    this.dialogForm = new FormGroup({
      descripcionEspecialidad: new FormControl('',Validators.required)


  });
  
  
  }


  create(): void {
    
    this.especialidadesService.create(this.especialidad)
      .subscribe(
        especialidad => {
          this.router.navigate(['/especialidades']);
          console.log(" hola ....",especialidad);
          Swal.fire('Nueva Especialidad', `La Especialidad ${especialidad.descripcionEspecialidad} ha sido creado con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }
  

  cancelar(): void{
     this.modalRef.close();
   }

}
