import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { DtoTablaPacientes } from '../dto-tabla-pacientes';



@Component({
  selector: 'app-dialog-informacion',
  templateUrl: './dialog-informacion.component.html',
  styleUrls: ['./dialog-informacion.component.css']
})
export class DialogInformacionComponent implements OnInit {


  dialogForm!: FormGroup;


  pacientes: Paciente[]=[];
  pacienteSelect?: Paciente;



  constructor(private pacienteService:PacienteService,
    @Inject(MAT_DIALOG_DATA) public infoData:any,
    private dialogRefInfo:MatDialogRef<DialogInformacionComponent>) { }


   // dtoTablaPacientes?:DtoTablaPacientes;

   paciente?:Paciente;
  ngOnInit(): void {

    this.obtenerPacientes();
    this.buscarByIdpaciente(this.infoData.idPaciente);
    console.log('hay algo con Id'+this.infoData.idPaciente);
    console.log('hay algo sin id'+this.infoData);
   // this.dtoTablaPacientes=this.infoData;
   this.paciente=this.infoData;
  }

  private obtenerPacientes(){
 
    this.pacienteService.listarPaciente().subscribe(data =>{
      this.pacientes=data;

     });

   }


   public buscarByIdpaciente(id:number){
   this.pacienteService.obtenerPacienteById(id).subscribe(data =>{
      this.pacienteSelect=data;
     
   });
   }


   

}
