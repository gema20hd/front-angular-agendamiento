import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UnidadEducativa } from 'src/app/models/unidadEducativa';
import Swal from 'sweetalert2';
import { UnidadEducativaService } from '../../../services/unidadEducativa.service';

@Component({
  selector: 'app-editar-unidad-educativa-modal',
  templateUrl: './editar-unidad-educativa-modal.component.html',
  styleUrls: ['./editar-unidad-educativa-modal.component.css']
})
export class EditarUnidadEducativaModalComponent {


  mostrarColumnas: string[] = ['id','nombre', 'direccion','codigo'];
  //mostrarColumnasAlumnos: string[] = ['id', 'nombre', 'apellido', 'email', 'eliminar'];

  dialogForm!: FormGroup;
  unidadesEducativasAsignar: UnidadEducativa [] = [];
  autocompleteControlNombre = new FormControl();
  unidadEducativa: UnidadEducativa;
  titulo: string = 'Editar Unidad Educativa';
  errores: string [] = [];
  unidadesEducativasFiltrados: Observable<UnidadEducativa[]> = new Observable();
  
  constructor(
    
  public router: Router,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public modalRef: MatDialogRef<EditarUnidadEducativaModalComponent>,
  public http: HttpClient,
  public unidadEducativaService: UnidadEducativaService

  ) {this.unidadEducativa = new UnidadEducativa()}

  ngOnInit(): void {
    console.log(this.data.idUnidadEducativa)
    this.unidadEducativa.idUnidadEducativa =this.data.idUnidadEducativa;
   
    this.unidadEducativa.codigoInstitucion=this.data.codigoInstitucion;
    this.unidadEducativa.nombreUnidadEducativa =this.data.nombreUnidadEducativa;
    this.unidadEducativa.direccionUnidadEducativa =this.data.direccionUnidadEducativa;

    this.dialogForm = new FormGroup({
  
      codigoInstitucion: new FormControl('',Validators.required),
      nombreUnidadEducativa: new FormControl('',Validators.required),
      direccionUnidadEducativa: new FormControl('',Validators.required)

  
  });
  
  
  }


  update(): void {
    console.log(" estoy entrando al ac.....",this.unidadEducativa);
    this.unidadEducativaService.update(this.unidadEducativa)
      .subscribe(unidadEducativa => {
        Swal.fire('Unidad Educativa Actualizado', `La unidad educativa ${unidadEducativa.nombreUnidadEducativa} ha sido actualizada con éxito`, 'success');
        this.cancelar();
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
}

  cancelar(): void{
     this.modalRef.close();
   }

}
