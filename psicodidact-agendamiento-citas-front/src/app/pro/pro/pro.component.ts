import { Component } from '@angular/core';
import { Genero } from 'src/app/models/genero';
import { Paciente } from 'src/app/models/paciente';
import { Representante } from 'src/app/models/representante';
import { TipoTrabajo } from 'src/app/models/tipo-trabajo';
import { Trabajo } from 'src/app/models/trabajo';
import { ProfesionalesService } from 'src/app/professional/professional/profesionales.service';
import { GeneroService } from 'src/app/services/genero.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { RepresentanteService } from 'src/app/services/representante.service';
import { TipoTrabajoService } from 'src/app/services/tipo-trabajo.service';
import { TrabajoService } from 'src/app/services/trabajo.service';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./pro.component.css']
})
export class ProComponent {
  generos: Genero[] = [];
  paciente: Paciente[] = [];
  tipoTrabajo: TipoTrabajo[] = [];
  trabajo: Trabajo[] = [];
  representante: Representante[] = [];

  
constructor(public profesionalService: ProfesionalesService,
 private  generoService:GeneroService,
 private pacienteService:PacienteService,
 private tipoTrabajoService:TipoTrabajoService,
 private trabajoService:TrabajoService,
 private representanteService:RepresentanteService) {
  
  }


  ngOnInit() {

    console.log("QUE ONDA");
    this.obetenerGenero();
    this.obtenerPacientes();
    this.obtenerTipoTrabajo();
    this.obtenerTrabajo();
    this.obtenerRepresentante();

    console.log("QUE ONDA LENGTH"+this.generos.length);
  //  
  //console.log(this.generos.descripcionGenero);
  for (let i of this.generos){
    
    console.log(i);
  }
  }


  private obetenerGenero(){
    this.generoService.listarGenero().subscribe((genero) =>
     {
      console.log(genero);
      this.generos = genero
   
    })
  }


  private obtenerPacientes(){
    this.pacienteService.listarPaciente().subscribe((paciente) =>
     {
      console.log(paciente);
      this.paciente = paciente
   
    })
  }

  private obtenerTipoTrabajo(){
    this.tipoTrabajoService.listarTipoTrabajo().subscribe((t) =>
     {
      console.log(t);
      this.tipoTrabajo = t
   
    })
  }

  private obtenerTrabajo(){
    this.trabajoService.listarTrabajo().subscribe((t) =>
     {
      console.log(t);
      this.trabajo = t
   
    })
  }
  private obtenerRepresentante(){
    this.representanteService.listarRepresentante().subscribe((t) =>
     {
      console.log(t);
      this.representante = t
   
    })
  }
}
