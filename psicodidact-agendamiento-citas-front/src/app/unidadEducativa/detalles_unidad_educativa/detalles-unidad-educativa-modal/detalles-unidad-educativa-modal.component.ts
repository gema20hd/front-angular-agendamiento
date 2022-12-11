import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleProfesionalModalComponent } from 'src/app/professional/professional/detalles_profesional/detalle-profesional-modal/detalle-profesional-modal.component';
import { UnidadEducativa } from '../../unidad-educativa/unidadEducativa';
import { UnidadEducativaService } from '../../unidad-educativa/unidadEducativa.service';

@Component({
  selector: 'app-detalles-unidad-educativa-modal',
  templateUrl: './detalles-unidad-educativa-modal.component.html',
  styleUrls: ['./detalles-unidad-educativa-modal.component.css']
})
export class DetallesUnidadEducativaModalComponent {

  unidadEducativa?: UnidadEducativa;
  unidadEducativas: UnidadEducativa[]= [];

  constructor(
    private unidadEducativaService:UnidadEducativaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<DetallesUnidadEducativaModalComponent>) { 
    
  }

  ngOnInit(): void {

    this.verInformacionUnidadEducativa(this.data.idUnidadEducativa);
  }


  verInformacionUnidadEducativa(id:number){
    this.unidadEducativaService.getUnidadEducativaId(id) .subscribe(rs => 
      { this.unidadEducativa =rs 
      console.log(rs)});
  }
  
  cerrar(): void {
    this.modalRef.close();
  }

}
