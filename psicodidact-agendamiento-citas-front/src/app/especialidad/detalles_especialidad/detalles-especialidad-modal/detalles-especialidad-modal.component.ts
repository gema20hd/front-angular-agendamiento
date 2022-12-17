import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Especialidad } from '../../especialidad/especialidad';
import { EspecialidadesService } from '../../especialidad/especialidades.service';

@Component({
  selector: 'app-detalles-especialidad-modal',
  templateUrl: './detalles-especialidad-modal.component.html',
  styleUrls: ['./detalles-especialidad-modal.component.css']
})
export class DetallesEspecialidadModalComponent {


  especialidad: Especialidad;
  especialidades: Especialidad[]= [];
  titulo: string = 'Detalle de la Especialidad';
  constructor(
    private especialidadesService:EspecialidadesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<DetallesEspecialidadModalComponent>) { 
      this.especialidad = new Especialidad();
  }

  ngOnInit(): void {

    this.verInformacionEspecialidad(this.data.idEspecialidad);
  }


  verInformacionEspecialidad(id:number){
    this.especialidadesService.getEspecialidadId(id).subscribe(rs => 
      { this.especialidad =rs 
      console.log(rs.descripcionEspecialidad)});
  }
  
  cerrar(): void {
    this.modalRef.close();
  }

}

