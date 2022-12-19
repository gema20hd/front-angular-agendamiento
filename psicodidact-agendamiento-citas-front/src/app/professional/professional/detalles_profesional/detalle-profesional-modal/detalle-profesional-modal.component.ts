import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profesional } from '../../../../models/profesional';
import { ProfesionalesService } from '../../../../services/profesionales.service';

@Component({
  selector: 'app-detalle-profesional-modal',
  templateUrl: './detalle-profesional-modal.component.html',
  styleUrls: ['./detalle-profesional-modal.component.css']
})
export class DetalleProfesionalModalComponent {
  profesional?: Profesional;
  profesionales: Profesional[] = [];


  constructor(
    private profesionalService:ProfesionalesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<DetalleProfesionalModalComponent>) { 
    
  }

  ngOnInit(): void {

    //this.profesionales = this.data.idProfesional ;
    this.verInformacionProfesional(this.data.idProfesional);
   // console.log(" detalle p sin objet ",this.profesional)
    //console.log(" detalle p ",this.data as Profesional)
  }

  cerrar(): void {
    this.modalRef.close();
  }

  verInformacionProfesional(id: number) {
    this.profesionalService.getProfesionalId(id) .subscribe(rs => { this.profesional =rs });
    }
      
  

}
