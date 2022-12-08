import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleProfesionalModalComponent } from '../../detalles_profesional/detalle-profesional-modal/detalle-profesional-modal.component';
import { Profesional } from '../../profesional';
import { ProfesionalesService } from '../../profesionales.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-profesional-modal',
  templateUrl: './editar-profesional-modal.component.html',
  styleUrls: ['./editar-profesional-modal.component.css']
})
export class EditarProfesionalModalComponent {
  profesional?: Profesional;
  profesionales: Profesional[] = [];
  error: any;

  constructor(
    private profesionalService:ProfesionalesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<EditarProfesionalModalComponent>) { 
    
  }

  ngOnInit(): void {

   // this.profesionales = this.data.idProfesional ;
    this.editarInformacionProfesional(this.data.idProfesional);
    console.log("id:  ",this.data.idProfesional)
  
  }


  cancelar(): void{
    this.modalRef.close();
  }

  verInformacionProfesional(id: number) {
    this.profesionalService.getProfesionalId(id).subscribe(rs => { this.profesional =rs });
    }
      
    editarInformacionProfesional(profesional: Profesional){
      this.profesionalService.update(profesional).subscribe(profesional=> {
        console.log(profesional);
        swal.fire('Modificado:', `Profesional ${profesional.nombresProfesional} actualizado con éxito`, 'success');
      }, err => {
        if(err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
      });
    }

    editarProfesional(){
      
    }
}
