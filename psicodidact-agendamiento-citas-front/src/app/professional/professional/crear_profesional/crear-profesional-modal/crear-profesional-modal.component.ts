import { Component, Inject } from '@angular/core';
import { Profesional } from '../../profesional';
import { ProfesionalesService } from '../../profesionales.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { TipoDiscapacidad } from 'src/app/models/tipoDiscapacidad';
import { Genero } from 'src/app/models/genero';

@Component({
  selector: 'app-crear-profesional-modal',
  templateUrl: './crear-profesional-modal.component.html',
  styleUrls: ['./crear-profesional-modal.component.css']
})
export class CrearProfesionalModalComponent {
  profesional?: Profesional;
  profesionales: Profesional[] = [];
  error: any;
  dialogForm!: FormGroup;
  discapacidadRadio:number=-1;
  tipoDiscapacidades:TipoDiscapacidad[]=[];
  selectTipoDiscapacidad?:number;
  generos:Genero[]=[];
  selectedGenero?:number;

  constructor(
    private profesionalService:ProfesionalesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<CrearProfesionalModalComponent>) { 
    
  }

  ngOnInit(): void {


 
  
  }


  cancelar(): void{
    this.modalRef.close();
  }
  creaeProfesional(){

  }
}
