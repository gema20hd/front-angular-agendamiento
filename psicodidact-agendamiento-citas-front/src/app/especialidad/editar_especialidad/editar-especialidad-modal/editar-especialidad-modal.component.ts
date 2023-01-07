import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Especialidad } from '../../especialidad/especialidad';
import { EspecialidadesService } from '../../../services/especialidades.service';

@Component({
  selector: 'app-editar-especialidad-modal',
  templateUrl: './editar-especialidad-modal.component.html',
  styleUrls: ['./editar-especialidad-modal.component.css']
})
export class EditarEspecialidadModalComponent {
  dialogForm!: FormGroup;
  especialidad: Especialidad;
 
  errores: String [] = [];
  titulo: string = 'Editar Especialidad';
  
  constructor(
    public router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private especialidadesService:EspecialidadesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<EditarEspecialidadModalComponent>) 
     {this.especialidad = new Especialidad()}

    ngOnInit(): void {
  
      this.especialidad.idEspecialidad =this.data.idEspecialidad;
      this.especialidad.descripcionEspecialidad =this.data.descripcionEspecialidad;

      this.dialogForm = new FormGroup({
        descripcionEspecialidad: new FormControl('',Validators.required),
      
    });
    
    
    }
  
  
    update(): void {
      console.log(" estoy entrando al ac.....",this.especialidad);
      this.especialidadesService.update(this.especialidad)
        .subscribe(especialidad => {
          Swal.fire('Especialidad Actualizado', `La La especialidad ${especialidad.descripcionEspecialidad} ha sido actualizada con éxito`, 'success');
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
  