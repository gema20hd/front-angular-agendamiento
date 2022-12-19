import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnidadEducativa } from 'src/app/models/unidadEducativa';
import { UnidadEducativaService } from '../../../services/unidadEducativa.service';

@Component({
  selector: 'app-detalles-unidad-educativa-modal',
  templateUrl: './detalles-unidad-educativa-modal.component.html',
  styleUrls: ['./detalles-unidad-educativa-modal.component.css']
})
export class DetallesUnidadEducativaModalComponent {

  unidadEducativa?: UnidadEducativa;
  unidadEducativas: UnidadEducativa[]= [];
  titulo: string = 'Detalles de la Unidad Educativa';
  constructor(
    public unidadEducativaService:UnidadEducativaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<DetallesUnidadEducativaModalComponent>) { 
    
  }

  ngOnInit(): void {

    this.verInformacionUnidadEducativa(this.data.idUnidadEducativa);
  }


  verInformacionUnidadEducativa(id:number){
    this.unidadEducativaService.getUnidadEducativaId(id).subscribe(rs => 
      { this.unidadEducativa =rs 
      console.log(rs)});
  }
  
  cerrar(): void {
    this.modalRef.close();
  }

}
