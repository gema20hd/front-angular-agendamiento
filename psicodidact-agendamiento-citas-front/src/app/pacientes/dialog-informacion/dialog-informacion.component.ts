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

   console.log("====================yyuuy=======================");

  }

  private obtenerPacientes(){
 
    this.pacienteService.listarPaciente().subscribe(data =>{
      this.pacientes=data;

     });

   }


   public buscarByIdpaciente(id:number){
   this.pacienteService.obtenerPacienteById(id).subscribe(data =>{
      this.pacienteSelect=data;

     let edad= this.obtenerEdad(this.pacienteSelect);
     this.pacienteSelect.edadPaciente=edad;
     
     console.log("EDAD=============="+edad);
   });
   }


   public obtenerEdad(paciente:Paciente):number{
    let fechaNacimiento: Date = new Date(paciente?.fechaNacimientoPaciente+"");
    let anioNacimiento=fechaNacimiento.getFullYear();

    console.log("ANIO NACIMIENTO"+anioNacimiento);

    let mesNacimiento=fechaNacimiento.getMonth();
    console.log("MES NACIMIENTO"+mesNacimiento);

    let diaNacimiento=fechaNacimiento.getDate();
    console.log("MES NACIMIENTO"+diaNacimiento);

    let fechaActual: Date = new Date();

    let anioActual=fechaActual.getFullYear();
    console.log("anioActual=========="+anioActual);

    let mesActual=fechaActual.getMonth();
    console.log("mesActual=========="+mesActual);

    let diaActual=fechaActual.getDate();
    console.log("diaActual"+diaActual);

    let edad=anioActual-anioNacimiento;

    if (diaActual>diaNacimiento) {
      if (mesActual>mesNacimiento) {
        edad=edad;
      }else{
        edad=edad-1;
      }

    }else{
      if (mesActual>mesNacimiento) {
        edad=edad;
      }else{
        edad=edad-1;
      }
    }
    
   return edad; 
   }

}
