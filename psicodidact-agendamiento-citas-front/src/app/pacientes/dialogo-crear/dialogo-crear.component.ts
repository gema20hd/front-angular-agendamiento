import { Component, EventEmitter, Inject, OnInit, Optional, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, Observable, startWith } from 'rxjs';
import { Antecedente } from 'src/app/models/antecedente';
import { Genero } from 'src/app/models/genero';
import { NivelEducacionParalelo } from 'src/app/models/nivelEducacionParalelo';
import { Profesion } from 'src/app/models/profesion';

import { Trabajo } from 'src/app/models/trabajo';
import { AntecedenteService } from 'src/app/services/antecedente.service';
import { GeneroService } from 'src/app/services/genero.service';
import { NivelEducacionParaleloService } from 'src/app/services/nivel-educacion-paralelo.service';
import { TipoDiscapacidadService } from 'src/app/services/tipo-discapacidad.service';
import { TipoSangreService } from 'src/app/services/tipo-sangre.service';
import { UnidadEducativaService } from 'src/app/services/unidad-educativa.service';
import { ProfesionService } from 'src/app/services/profesion.service';
import { TrabajoService } from 'src/app/services/trabajo.service';
import { EstadoCivilService } from 'src/app/services/estado-civil.service';
import { Representante } from 'src/app/models/representante';
import { RepresentanteService } from 'src/app/services/representante.service';
import { Paciente } from 'src/app/models/paciente';
import { Discapacidad } from 'src/app/models/discapacidad';
import { DiscapacidadService } from 'src/app/services/discapacidad.service';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoTrabajoService } from 'src/app/services/tipo-trabajo.service';
import { TipoTrabajo } from 'src/app/models/tipoTrabajo';
import { EstadoCivil } from 'src/app/models/estadoCivil';
import { TipoSangre } from 'src/app/models/tipoSangre';
import { TipoDiscapacidad } from 'src/app/models/tipoDiscapacidad';
import { UnidadEducativa } from 'src/app/models/unidadEducativa';

@Component({
  selector: 'app-dialogo-crear',
  templateUrl: './dialogo-crear.component.html',
  styleUrls: ['./dialogo-crear.component.css']
})
export class DialogoCrearComponent implements OnInit {
//OPTENER ENTIDADES "NINGUNO DE LOS SELECT "
estadoCivilNinguno:EstadoCivil=new EstadoCivil();
tipoSangreNinguno:TipoSangre=new TipoSangre();
generoNinguno:Genero=new Genero();
profesionNinguno:Profesion=new Profesion();
tipoDiscapacidadNinguno:TipoDiscapacidad=new TipoDiscapacidad();
nivelEducacionParaleloNinguno:NivelEducacionParalelo=new NivelEducacionParalelo();
unidadEducativaNinguno:UnidadEducativa=new UnidadEducativa();
tipoTrabajoNinguno:TipoTrabajo=new TipoTrabajo();



 //------------ACTUALIZAR CACMPOS EDITAR-------------
 //REPRESENTANTE
  tipoDiscapacidadEditar:TipoDiscapacidad=new TipoDiscapacidad();
  discapacidadEditar:Discapacidad=new Discapacidad();
  trabajoEditar:Trabajo= new Trabajo();
  tipoTrabajoEditar:TipoTrabajo=new TipoTrabajo();
  estadoCivilEditar:EstadoCivil=new EstadoCivil();
  tipoSangreEditar:TipoSangre= new TipoSangre();
  generoEditar:Genero= new Genero();
  profesionEditar:Profesion=new Profesion();
  representanteREditar:Representante=new Representante();
  //PACIENTE
  estadoCivilPacienteEditar:EstadoCivil=new EstadoCivil();
  tipoSangrePacienteEditar:TipoSangre=new TipoSangre();
  tipoDiscapacidadPacienteEditar:TipoDiscapacidad=new TipoDiscapacidad();
  discapacidadPacienteEditar:Discapacidad=new Discapacidad();
  generoPacienteEditar:Genero= new Genero();
  trabajoPacienteEditar:Trabajo=new Trabajo();
  tipoTrabajoPacienteEditar:TipoTrabajo=new TipoTrabajo();
  profesionPacienteEditar:Profesion= new Profesion();
  unidadEducativaPacienteEditar:UnidadEducativa= new UnidadEducativa();
  nivelEducacionParaleloPacienteEditar:NivelEducacionParalelo= new NivelEducacionParalelo();
  antecedentePacienteEditar:Antecedente= new Antecedente();
  pacientePacienteEditar:Paciente = new Paciente();
 //--------------------------

  btn_opcion:string="Guardar";

  representanteEditar:Representante= new Representante() ;
  pacienteEditar: Paciente = new Paciente();

  dialogForm!: FormGroup;

 
  filteredOptions!: Observable<UnidadEducativa['nombreUnidadEducativa'][]>;

  educacionRadio:number= 2; 
  checkPoseeEducacionSi:boolean=false;
  checkPoseeEducacionNo:boolean=true;

  antecedentesRadio:number=2;
  checkPoseeAntecedentesSi:boolean=false;
  checkPoseeAntecedentesNo:boolean=true;

  discapacidadRadio:number=2;
  checkPoseeDiscapacidadSi:boolean=false;
  checkPoseeDiscapacidadNo:boolean=true;

  representanteRadio:number=2;
  checkPoseeRepresentanteSi:boolean=false;
  checkPoseeRepresentanteNo:boolean=true;

  discapacidadRepresentanteRadio:number=2;
  checkPoseeDisRepreSi:boolean=false;
  checkPoseeDisRepreNo:boolean=true;


  pacienteActivoPlantillaRadio:number=2;
  pacienteActivoRadio:number=2;
  checkActivoPaciente:boolean=false;
  checkInactivoPaciente:boolean=false;

 
 representanteCreated:Representante=new Representante();
 representanteEdited:Representante=new Representante();

 pacienteCreated:Paciente=new Paciente();
 pacienteEdited:Paciente=new Paciente();

  errores?: string[];
 //LISTAS
 //TipoSangre
 tipoSangreList:TipoSangre[]=[]; 
 selectedTipo?:number;
 selectedTipoRepre?:number;

 //Antecedentes
 antecedentesList:Antecedente[]=[];
 selectedAntecedentes?:number;

//Genero
 generoList:Genero[]=[];
 selectedGenero?:number;
 selectGeneroRepresentante?:number;

//Unidad Educativa
unidadEducativaList:UnidadEducativa[]=[];
selectUnidadEducativa?:number;

//Nivel Educacion Pralelo
nivelEdicacionList:NivelEducacionParalelo[]=[];
selectNivelEducacion?:number;

//Discapacidad
tipoDiscapacidadList:TipoDiscapacidad[]=[];
selectTipoDiscapacidad?:number;


//Profesion
profesionList:Profesion[]=[];
selectProfesion?:number;
selectProfesionRepresentante?:number;


//Trabajo
trabajoList:Trabajo[]=[];
selectTipoTrabajo?:number;

//Representante


//Estado Civil

estadoCivilList:EstadoCivil[]=[];
selectestadoCivil?:number;
selectestadoCivilRepre?:number;
//Tippo Discapacidad

selecttipoDiscapacidadRepresentante?:number;

//TIPO TRABAJO
tipoTrabajoList:TipoTrabajo[]=[];
selecttipoTrabajodRepresentante?:number;


  constructor(private formBuilder: FormBuilder,
     private tipoSangreService:TipoSangreService,
     private antecedentesService:AntecedenteService,
     private generoServicio:GeneroService,
     private unidadEducativaService:UnidadEducativaService,
     private nivelEducacionService:NivelEducacionParaleloService,
     private tipoDiscapcidadService:TipoDiscapacidadService,
     private profesionService:ProfesionService,
     private trabajoService:TrabajoService,
     private estadoCivilService:EstadoCivilService,
     private representanteService:RepresentanteService,
     private discapacidadService:DiscapacidadService,
     private pacienteService:PacienteService,
     private tipoTrabajoService:TipoTrabajoService,
     @Optional()  private dialogRefCrear:MatDialogRef<DialogoCrearComponent>,
     @Inject(MAT_DIALOG_DATA) public infoEditar:any,
     private dialogRefInfo:MatDialogRef<DialogoCrearComponent>
 
   
     ) { 
   
  }


  ngOnInit(): void {

    
   // console.log('EL RADIO DE POSEE'+this.educacionRadio);
   // this.dialogForm.controls['poseeAntecedentes'].setValue(-1);
  
   // this.formControlUnidad.subcribe()
 

    this.dialogForm=this.formBuilder.group({
      //Paciente
      nombres: new FormControl('',Validators.required),
      apellidoPaterno: new FormControl('',Validators.required),
      apellidoMaterno: new FormControl('',Validators.required),

      estadoCivil: new FormControl('',Validators.required),//list
      poseeAntecedentes: new FormControl('',Validators.required),//radio
     

      identificacion: new FormControl('',Validators.required),

      sintomaAntecedentes:new FormControl(''),
      enfermedadAntecedentes:new FormControl(''),
      enfermedadPeterna:new FormControl(''),
      enfermedadMaterna:new FormControl(''),
      enfermedadRepresenatante:new FormControl(''),
      tratamientoAntecedente:new FormControl(''),
      alergiaAntecedente:new FormControl(''),
      medicamentoAntecedente:new FormControl(''),

      tipoSangre:new FormControl('',Validators.required),//list
      genero:new FormControl('',Validators.required),//list
      fechaNacimiento:new FormControl('',Validators.required),//calendario
      poseeEducacion: new FormControl('',Validators.required),//radio
      unidadEducativa:new FormControl('',Validators.required),//list autocomplete
      nivelEducacion:new FormControl('',Validators.required),//list
      poseeDiscapacidad: new FormControl('',Validators.required),//radio
      tipoDiscapacidad:new FormControl('',Validators.required),//list
      porcentajeDiscapacidad:new FormControl('',Validators.required),//list(1-100)
      descripcionDiscapacidad:new FormControl('',Validators.required),
      poseeRepresentante: new FormControl('',Validators.required),//radio
      
      //PROPIO VALIDADOR---------------------posee paciente==1 NO REQUIRED------------------------------------------------
      profesion:new FormControl('',Validators.required),//list
      tipoEmpleo:new FormControl('',Validators.required),//list(publico privado)
      celular:new FormControl('',Validators.required),
      telefonoEmergencia:new FormControl('',Validators.required),
      direccionTrabajo:new FormControl('',Validators.required),
      direccionDomicilio:new FormControl('',Validators.required),
      correo:new FormControl('',Validators.required),
      descripcionTrabajo:new FormControl('',Validators.required),
      //---------------------------------------------------------------------------------------


      //PROPIO VALIDADOR--------------------posee paciente==2 REQUERED
      //Representante
      nombreRepresentante:new FormControl('',Validators.required),
      apellidoPaternoRepresentante:new FormControl('',Validators.required),
      apellidoMaternoRepresentante:new FormControl('',Validators.required),
      identificacionRepresentante:new FormControl('',Validators.required),
      fechaNacimientoRepresentante:new FormControl('',Validators.required),
      generoRepresentante:new FormControl('',Validators.required),//list
      tipoSangreRepresentante:new FormControl('',Validators.required),//list
      direccionTrabajoRepresentante:new FormControl('',Validators.required),
      descripcionTrabajoRepresentante:new FormControl('',Validators.required),
      correoRepresentante:new FormControl('',Validators.required),
      celularRepresentante:new FormControl('',Validators.required),
      telefonoEmergenciaRepre:new FormControl('',Validators.required),
      profesionRepresentante:new FormControl('',Validators.required),//list
      tipoEmpleoRepre:new FormControl('',Validators.required),//list(publico-privado)
      parentescoRepresentante:new FormControl('',Validators.required),
      direccionDomicilioRepre:new FormControl('',Validators.required),
      estadoCivilRepre:new FormControl('',Validators.required),//list
      poseeDiscapacidadRepre: new FormControl('',Validators.required),//radio
      tipoDiscapacidadRepre:new FormControl('',Validators.required),//list
      porcentajeDiscapacidadRepre:new FormControl('',Validators.required),//list(1-100)
      descripcionDiscapacidadRepre:new FormControl('',Validators.required),
      
     
      //ESTADO PACIENTE
      pacienteActivo: new FormControl('',Validators.required),//radio
    });




   // console.log( this.dialogForm.controls['educacion'].setValue(this.educacion));
   
   this.dialogForm.controls['poseeAntecedentes'].setValue(2);


   //Llamada a las listas
  //Tipo Sangre
   this.obtenerTiposSangres();
  
   //Antecedentes
   this.obtenerAntecedentes();
   //Genero
   this.obtenerGenero();

   //Unidad Educativa
   this.obtenerUnidadEducativa();

   //Nivel Educacion Paralelo
   this.obtenerNivelEducacion();

   //TipoDiscapacidad
   this.obtenertipoDiscapacidad();

   //Profesion
   this.obtenerProfesion();

   //Trabajo
   this.obtenerTrabajo();

   //Estado Civil
   this.obtenerEstadoCivil();

   //Tipo Trabajo
   this.obtenertipoTrabajo();


   
//SI EXISTE SE INICIALIZA TODO
console.log("INFO" +this.infoEditar);

if (this.infoEditar) {

  //SE HABILITA EL ESTADO
  this.pacienteActivoPlantillaRadio = 1

  //-------------------------
  this.checkPoseeEducacionSi=false;
  this.checkPoseeEducacionNo=false;

  this.checkPoseeAntecedentesSi=false;
  this.checkPoseeAntecedentesNo=false;

  this.checkPoseeDiscapacidadSi=false;
  this.checkPoseeDiscapacidadNo=false;

  this.checkPoseeRepresentanteSi=false;
  this.checkPoseeRepresentanteNo=false;

  this.checkPoseeDisRepreSi=false;
  this.checkPoseeDisRepreNo=false;
 
  this.checkActivoPaciente=false;
  this.checkInactivoPaciente=false;
  


this.btn_opcion="Editar";

  this.pacienteService.obtenerPacienteById(this.infoEditar.id).subscribe((paciente) =>{ 
  
  this.pacienteEditar = paciente as Paciente


    this.representanteService.obtenerRepresentanteById(this.pacienteEditar.representante?.idRepresentante!).subscribe((representante) =>{
  
    this.representanteEditar = representante

    
    this.dialogForm.controls['nombres'].setValue(this.pacienteEditar.nombresPaciente);
    this.dialogForm.controls['apellidoPaterno'].setValue(this.pacienteEditar.apellidoPaternoPaciente);
    this.dialogForm.controls['apellidoMaterno'].setValue(this.pacienteEditar.apellidoMaternoPaciente);
    this.dialogForm.controls['estadoCivil'].setValue(this.pacienteEditar.estadoCivil);
    this.selectestadoCivil=this.pacienteEditar.estadoCivil?.idEstadoCivil;
    
    if (this.pacienteEditar.antecedente?.medicamentoAntecedente 
      || this.pacienteEditar.antecedente?.enfermedadAntecedente 
      || this.pacienteEditar.antecedente?.tratamientoAntecedente 
      || this.pacienteEditar.antecedente?.sintomaAntecedente
      || this.pacienteEditar.antecedente?.tratamientoAntecedente
      ||this.pacienteEditar.antecedente?.enfermedadMaterna
      || this.pacienteEditar.antecedente?.enfermedadPaterna 
      || this.pacienteEditar.antecedente?.enfermedadRepresentante ) {

      this.checkPoseeAntecedentesSi=true;
      this.antecedentesRadio=1;
    }else{
      this.checkPoseeAntecedentesNo=true;
    }
    
    
    this.dialogForm.controls['identificacion'].setValue(this.pacienteEditar.identificacionPaciente);
    this.dialogForm.controls['sintomaAntecedentes'].setValue(this.pacienteEditar.antecedente?.sintomaAntecedente);
    this.dialogForm.controls['enfermedadAntecedentes'].setValue(this.pacienteEditar.antecedente?.enfermedadAntecedente);
    this.dialogForm.controls['enfermedadPeterna'].setValue(this.pacienteEditar.antecedente?.enfermedadPaterna);
    this.dialogForm.controls['enfermedadMaterna'].setValue(this.pacienteEditar.antecedente?.enfermedadMaterna);
    this.dialogForm.controls['enfermedadRepresenatante'].setValue(this.pacienteEditar.antecedente?.enfermedadRepresentante);
    this.dialogForm.controls['tratamientoAntecedente'].setValue(this.pacienteEditar.antecedente?.tratamientoAntecedente);
    this.dialogForm.controls['alergiaAntecedente'].setValue(this.pacienteEditar.antecedente?.alergiaAntecedente);
    this.dialogForm.controls['medicamentoAntecedente'].setValue(this.pacienteEditar.antecedente?.medicamentoAntecedente);
    this.dialogForm.controls['tipoSangre'].setValue(this.pacienteEditar.tipoSangre);
    this.selectedTipo=this.pacienteEditar.tipoSangre?.idTipoSangre;
    this.dialogForm.controls['genero'].setValue(this.pacienteEditar.genero);
    this.selectedGenero=this.pacienteEditar.genero?.idGenero;
 


    let fechaPaciente =this.tranformarFecha(this.pacienteEditar.fechaNacimientoPaciente!);
    console.log("LA FECHA TRANSFROMD EN ONONINIT"+fechaPaciente);
    console.log("LA FECHA TRANSFROMD EN ONONINIT real"+this.pacienteEditar.fechaNacimientoPaciente);

    this.dialogForm.controls['fechaNacimiento'].setValue(fechaPaciente);
  //  /new Date("12/15/18 00:00:00")
 

    if (this.pacienteEditar.unidadEducativa?.idUnidadEducativa!=1075) {
      this.checkPoseeEducacionSi=true;
      this.educacionRadio=1;
    }else{
      this.checkPoseeEducacionNo=true;
    }

    
    
    this.dialogForm.controls['unidadEducativa'].setValue(this.pacienteEditar.unidadEducativa);
    this.selectUnidadEducativa=this.pacienteEditar.unidadEducativa?.idUnidadEducativa;
    this.dialogForm.controls['nivelEducacion'].setValue(this.pacienteEditar.nivelEducacionParalelo);
    this.selectNivelEducacion=this.pacienteEditar.nivelEducacionParalelo?.idNivelEducacionParalelo;

    if (this.pacienteEditar.discapacidad?.descripcionDiscapacidad) {
      this.checkPoseeDiscapacidadSi=true;
      this.discapacidadRadio=1;
    }else{
      this.checkPoseeDiscapacidadNo=true;
    }
    
    this.dialogForm.controls['tipoDiscapacidad'].setValue(this.pacienteEditar.discapacidad?.tipoDiscapacidad);
    this.selectTipoDiscapacidad=this.pacienteEditar.discapacidad?.tipoDiscapacidad?.idTipoDiscapacidad;
    
    if (this.pacienteEditar.discapacidad?.porcetajeDiscapacidad!==0) {
      this.dialogForm.controls['porcentajeDiscapacidad'].setValue(this.pacienteEditar.discapacidad?.porcetajeDiscapacidad);
   
    }

    this.dialogForm.controls['descripcionDiscapacidad'].setValue(this.pacienteEditar.discapacidad?.descripcionDiscapacidad);
    
    if (this.pacienteEditar.representante?.celularRepresentante) {
      this.checkPoseeRepresentanteSi=true;
      this.representanteRadio=1;
    }else{
      this.checkPoseeRepresentanteNo=true;
      this.representanteRadio=2;
    }
    
    
    
    //PROPIO VALIDADOR---------------------posee paciente==1 NO REQUIRED------------------------------------------------
    
    this.dialogForm.controls['profesion'].setValue(this.pacienteEditar.profesion);
    this.selectProfesion=this.pacienteEditar.profesion?.idProfesion;

    this.dialogForm.controls['tipoEmpleo'].setValue(this.pacienteEditar.trabajo?.tipoTrabajo);
    this.selectTipoTrabajo=this.pacienteEditar.trabajo?.tipoTrabajo?.idTipoTrabajo;


   // this.dialogForm.controls['tipoEmpleo'].setValue(this.pacienteEditar.trabajo?.tipoTrabajo);

    this.dialogForm.controls['celular'].setValue(this.pacienteEditar.celularPaciente);
    this.dialogForm.controls['telefonoEmergencia'].setValue(this.pacienteEditar.telefonoPaciente);
    this.dialogForm.controls['direccionTrabajo'].setValue(this.pacienteEditar.trabajo?.direccionTrabajo);
    this.dialogForm.controls['direccionDomicilio'].setValue(this.pacienteEditar.direccionDomicilio);
    this.dialogForm.controls['correo'].setValue(this.pacienteEditar.correoElectronicoPaciente);
    this.dialogForm.controls['descripcionTrabajo'].setValue(this.pacienteEditar.trabajo?.descripcionTrabajo);
    
   // if (this.pacienteEditar.estadoPaciente===true) {
      this.checkActivoPaciente=true;
      this.pacienteActivoRadio=1;
    //}else{
      this.checkInactivoPaciente=true;
   
    //}
    
    //---------------------REPRESE
    
    this.dialogForm.controls['nombreRepresentante'].setValue(this.representanteEditar.nombresRepresentante);
    this.dialogForm.controls['apellidoPaternoRepresentante'].setValue(this.representanteEditar.apellidoPaternoRepresentante);
    this.dialogForm.controls['apellidoMaternoRepresentante'].setValue(this.representanteEditar.apellidoMaternoRepresentante);
    this.dialogForm.controls['identificacionRepresentante'].setValue(this.representanteEditar.identificacionRepresentante);
    let fechaRepre =this.tranformarFecha(this.representanteEditar.fechaNacimientoRepresentante!);
   
    if (this.representanteRadio==1) {
    this.dialogForm.controls['fechaNacimientoRepresentante'].setValue(fechaRepre);
   }
    
    
    this.dialogForm.controls['generoRepresentante'].setValue(this.representanteEditar.genero);
    this.selectGeneroRepresentante=this.representanteEditar.genero?.idGenero;

    this.dialogForm.controls['tipoSangreRepresentante'].setValue(this.representanteEditar.tipoSangre);
    this.selectedTipoRepre=this.representanteEditar.tipoSangre?.idTipoSangre;
   
    this.dialogForm.controls['direccionTrabajoRepresentante'].setValue(this.representanteEditar.trabajo?.direccionTrabajo);
    this.dialogForm.controls['descripcionTrabajoRepresentante'].setValue(this.representanteEditar.trabajo?.descripcionTrabajo);
    this.dialogForm.controls['correoRepresentante'].setValue(this.representanteEditar.correoElectronicoRepresentante);
    this.dialogForm.controls['celularRepresentante'].setValue(this.representanteEditar.celularRepresentante);
    
    this.dialogForm.controls['telefonoEmergenciaRepre'].setValue(this.representanteEditar.telefonoEmergenciaRepresentante);
    this.dialogForm.controls['profesionRepresentante'].setValue(this.representanteEditar.profesion);
    this.selectProfesionRepresentante=this.representanteEditar.profesion?.idProfesion;
    
   // this.dialogForm.controls['tipoEmpleoRepre'].setValue(this.representanteEditar.trabajo?.tipoTrabajo);
   
    this.dialogForm.controls['tipoEmpleoRepre'].setValue(this.representanteEditar.trabajo?.tipoTrabajo);
    
    this.selecttipoTrabajodRepresentante=this.representanteEditar.trabajo?.tipoTrabajo?.idTipoTrabajo;

   
    this.dialogForm.controls['parentescoRepresentante'].setValue(this.representanteEditar.parentescoRepresentante);
    this.dialogForm.controls['direccionDomicilioRepre'].setValue(this.representanteEditar.direccionDomicilioRepresentan);
    this.dialogForm.controls['estadoCivilRepre'].setValue(this.representanteEditar.estadoCivil);
    
    this.selectestadoCivilRepre=this.representanteEditar.estadoCivil?.idEstadoCivil;

    if (this.representanteEditar.discapacidad?.descripcionDiscapacidad) {
      this.checkPoseeDisRepreSi=true;
      this.discapacidadRepresentanteRadio=1;
    }else{
      this.checkPoseeDisRepreNo=true;
    
    }
    this.dialogForm.controls['tipoDiscapacidadRepre'].setValue(this.representanteEditar.discapacidad?.tipoDiscapacidad);
    
    this.selecttipoDiscapacidadRepresentante=this.representanteEditar.discapacidad?.tipoDiscapacidad?.idTipoDiscapacidad;

    
    if (this.representanteEditar.discapacidad?.porcetajeDiscapacidad!==0) {
      this.dialogForm.controls['porcentajeDiscapacidadRepre'].setValue(this.representanteEditar.discapacidad?.porcetajeDiscapacidad);
    }
    
    this.dialogForm.controls['descripcionDiscapacidadRepre'].setValue(this.representanteEditar.discapacidad?.descripcionDiscapacidad);
 
    



   //RESETEAR PARA INGRESO EDITAR
 //---------------------------------------REPRESENTANTE------------------------------------------
   //TIPO DISCAPACIDAD
   this.tipoDiscapacidadEditar=this.pacienteEditar.representante?.discapacidad?.tipoDiscapacidad!;
   
   //DISCAPACIDAD
   this.discapacidadEditar.tipoDiscapacidad=this.tipoDiscapacidadEditar;
   this.discapacidadEditar=this.pacienteEditar.representante?.discapacidad!;

  //TRABAJO
  this.trabajoEditar=this.pacienteEditar.representante?.trabajo!;

  //TIPO TRABAJO
  this.tipoTrabajoEditar=this.pacienteEditar.representante?.trabajo?.tipoTrabajo!;

  //ESTADO CIVIL
  this.estadoCivilEditar=this.pacienteEditar.representante?.estadoCivil!;
 
  //TIPO SANGRE

  this.tipoSangreEditar=this.pacienteEditar.representante?.tipoSangre!;

  //GENERO
  this.generoEditar=this.pacienteEditar.representante?.genero!;

  //PREFESION
  this.profesionEditar=this.pacienteEditar.representante?.profesion!;
 

  //REPRESENTANTE
  this.representanteREditar=this.pacienteEditar.representante!;

  //-------------------------------------------------PACIENTE------------------------------
  //ESTADO CIVIL
 this.estadoCivilPacienteEditar=this.pacienteEditar.estadoCivil!;
  //TIPO SANGRE
  this.tipoSangrePacienteEditar=this.pacienteEditar.tipoSangre!;
  //TIPO DISCAPACIDAD
  this.tipoDiscapacidadPacienteEditar=this.pacienteEditar.discapacidad?.tipoDiscapacidad!;

  //DISCAPACIDAD
  this.discapacidadPacienteEditar.tipoDiscapacidad=this.tipoDiscapacidadPacienteEditar;
  this.discapacidadPacienteEditar=this.pacienteEditar.discapacidad!;
  //GENERO
  this.generoPacienteEditar=this.pacienteEditar.genero!;
  //TRABAJO
  this.trabajoPacienteEditar=this.pacienteEditar.trabajo!;

  //TIPO TRABAJO
  this.tipoTrabajoPacienteEditar=this.pacienteEditar.trabajo?.tipoTrabajo!;

  //PROFESION
  this.profesionPacienteEditar=this.pacienteEditar.profesion!;

  //UNIDAD EDUCATIVA
  this.unidadEducativaPacienteEditar=this.pacienteEditar.unidadEducativa!;

  //NIVEL EDUCACION PARALELO
  this.nivelEducacionParaleloPacienteEditar=this.pacienteEditar.nivelEducacionParalelo!;

  //ANTECEDENTE
  this.antecedentePacienteEditar=this.pacienteEditar.antecedente!;

  //REPRESENTANTE
  this.pacientePacienteEditar=this.pacienteEditar;

    });
 
});


}


//CARGAR DATOS NINGUNO----------------------
this.obtenerEstadoCivilNinguno();
this.obtenerTipoSangrelNinguno();
this.obtenerGeneroNinguno();
this.obtenerProfesionNinguno();
this.obtenerTipoDiscapacidadNinguno();
this.obtenernivelEducacionNinguno();
this.obtenerUnidadEducativaNinguno();
this.obtenerTipoTrabajoNinguno();


  }

  //-----------------PARA VALIDAR GETER---------------
  //------------------PACIENTE---------------------------
  get nombres(){
    return  this.dialogForm.controls['nombres'];
  }

  get identificacion(){
    return  this.dialogForm.controls['identificacion'];
  }

  get apellidoPaterno(){
    return  this.dialogForm.controls['apellidoPaterno'];
  }


  get apellidoMaterno(){
    return  this.dialogForm.controls['apellidoMaterno'];
  }

  get sintomaAntecedentes(){
    return  this.dialogForm.controls['sintomaAntecedentes'];
  }

  get enfermedadAntecedentes(){
    return  this.dialogForm.controls['enfermedadAntecedentes'];
  }

  get enfermedadPeterna(){
    return  this.dialogForm.controls['enfermedadPeterna'];
  }

  get enfermedadMaterna(){
    return  this.dialogForm.controls['enfermedadMaterna'];
  }

  get enfermedadRepresenatante(){
    return  this.dialogForm.controls['enfermedadRepresenatante'];
  }

  get tratamientoAntecedente(){
    return  this.dialogForm.controls['tratamientoAntecedente'];
  }


  get medicamentoAntecedente(){
    return  this.dialogForm.controls['medicamentoAntecedente'];
  }

  get alergiaAntecedente(){
    return  this.dialogForm.controls['alergiaAntecedente'];
  }

  get fechaNacimiento(){
    return  this.dialogForm.controls['fechaNacimiento'];
  }

  get descripcionDiscapacidad(){
    return  this.dialogForm.controls['descripcionDiscapacidad'];
  }

  get celular(){
    return  this.dialogForm.controls['celular'];
  }

  get telefonoEmergencia(){
    return  this.dialogForm.controls['telefonoEmergencia'];
  }

  get direccionTrabajo(){
    return  this.dialogForm.controls['direccionTrabajo'];
  }
  get direccionDomicilio(){
    return  this.dialogForm.controls['direccionDomicilio'];
  }

  get correo(){
    return  this.dialogForm.controls['correo'];
  }
  get descripcionTrabajo(){
    return  this.dialogForm.controls['descripcionTrabajo'];
  }
  //---------------------REPRESENTANTE--------------------------

  get nombreRepresentante(){
    return  this.dialogForm.controls['nombreRepresentante'];
  }
  get apellidoPaternoRepresentante(){
    return  this.dialogForm.controls['apellidoPaternoRepresentante'];
  }
  get apellidoMaternoRepresentante(){
    return  this.dialogForm.controls['apellidoMaternoRepresentante'];
  }
  get identificacionRepresentante(){
    return  this.dialogForm.controls['identificacionRepresentante'];
  }
  get fechaNacimientoRepresentante(){
    return  this.dialogForm.controls['fechaNacimientoRepresentante'];
  }
  get correoRepresentante(){
    return  this.dialogForm.controls['correoRepresentante'];
  }
  get celularRepresentante(){
    return  this.dialogForm.controls['celularRepresentante'];
  }
  get telefonoEmergenciaRepre(){
    return  this.dialogForm.controls['telefonoEmergenciaRepre'];
  }
  get parentescoRepresentante(){
    return  this.dialogForm.controls['parentescoRepresentante'];
  }

  get direccionDomicilioRepre(){
    return  this.dialogForm.controls['direccionDomicilioRepre'];
  }
  get direccionTrabajoRepresentante(){
    return  this.dialogForm.controls['direccionTrabajoRepresentante'];
  }

  get descripcionTrabajoRepresentante(){
    return  this.dialogForm.controls['descripcionTrabajoRepresentante'];
  }

  get descripcionDiscapacidadRepre(){
    return  this.dialogForm.controls['descripcionDiscapacidadRepre'];
  }

 
  //---------------------------------------------------



  private obtenerTiposSangres(){

      this.tipoSangreService.listarTipoSangre().subscribe(data=>{
      const filter = data.filter((item) => item.descripcionTipoSangre !== 'NINGUNO');
      this.tipoSangreList=filter;

      } );
  }

  private obtenerAntecedentes(){

    this.antecedentesService.listarAntecedentes().subscribe(data=>{
    this.antecedentesList=data;

    } );
}


private obtenerGenero(){

  this.generoServicio.listarGenero().subscribe(data=>{
    const filter = data.filter((item) => item.descripcionGenero !== 'NINGUNO');
  this.generoList=filter;

  } );
}

private obtenerUnidadEducativa(){

  this.unidadEducativaService.listarUnidadEducativa().subscribe(data=>{
    const filter = data.filter((item) => item.nombreUnidadEducativa !== 'NINGUNO');
  this.unidadEducativaList=filter;

  } );
}

private obtenerNivelEducacion(){

  this.nivelEducacionService.listarNivelEdicacion().subscribe(data=>{
  const filter = data.filter((item) => item.descripcionNivelParalelo !== 'NINGUNO');
  this.nivelEdicacionList=filter;

  } );
}

private obtenertipoDiscapacidad(){

  this.tipoDiscapcidadService.listarTipoDiscapacidad().subscribe(data=>{
  const filter = data.filter((item) => item.descripcionTipoDiscapacidad !== 'NINGUNO');
  this.tipoDiscapacidadList=filter;

  } );
}

private obtenertipoTrabajo(){

  this.tipoTrabajoService.listarTipoTrabajo().subscribe(data=>{
  const filter = data.filter((item) => item.descripcionTipoTrabajo !== 'NINGUNO');
  this.tipoTrabajoList=filter;

  } );
}


private obtenerProfesion (){

  this.profesionService.listarProfesion().subscribe(data=>{
    const filter = data.filter((item) => item.descripcionProfesion !== 'NINGUNO');
  this.profesionList=filter;

  } );
}

private obtenerTrabajo (){

  this.trabajoService.listarTrabajo().subscribe(data=>{
  this.trabajoList=data;

  } );
}


private obtenerEstadoCivil (){

  this.estadoCivilService.listarEstadoCivil().subscribe(data=>{
  const filter = data.filter((item) => item.descripcionEstadoCivil !== 'NINGUNO');

  this.estadoCivilList=filter;

  } );
}


 

//OBTENER "NINGUNO"---------------ESTADO_CIVIL--------------
private obtenerEstadoCivilNinguno (){
  let filter:EstadoCivil[]=[];
  this.estadoCivilService.listarEstadoCivil().subscribe(data=>{
   filter = data.filter((item) => item.descripcionEstadoCivil === 'NINGUNO');
   this.estadoCivilNinguno=filter[0];
  } );
 
}
//TIPO SANGRE
private obtenerTipoSangrelNinguno (){
  let filter:TipoSangre[]=[];
  this.tipoSangreService.listarTipoSangre().subscribe(data=>{
   filter = data.filter((item) => item.descripcionTipoSangre === 'NINGUNO');
   this.tipoSangreNinguno=filter[0];
  } );
 
}

//GENERO
private obtenerGeneroNinguno (){
  let filter:Genero[]=[];
  this.generoServicio.listarGenero().subscribe(data=>{
   filter = data.filter((item) => item.descripcionGenero === 'NINGUNO');
   this.generoNinguno=filter[0];
  } );
 
}

//PROFESION

private obtenerProfesionNinguno (){
  let filter:Profesion[]=[];
  this.profesionService.listarProfesion().subscribe(data=>{
   filter = data.filter((item) => item.descripcionProfesion === 'NINGUNO');
   this.profesionNinguno=filter[0];
  } );
 
}

//TIPO DISCAPACIDAD

private obtenerTipoDiscapacidadNinguno (){
  let filter:TipoDiscapacidad[]=[];
  this.tipoDiscapcidadService.listarTipoDiscapacidad().subscribe(data=>{
   filter = data.filter((item) => item.descripcionTipoDiscapacidad === 'NINGUNO');
   this.tipoDiscapacidadNinguno=filter[0];
  } );
 
}



//TIPO TRABAJO

private obtenerTipoTrabajoNinguno (){
  let filter:TipoTrabajo[]=[];
  this.tipoTrabajoService.listarTipoTrabajo().subscribe(data=>{
   filter = data.filter((item) => item.descripcionTipoTrabajo === 'NINGUNO');
   this.tipoTrabajoNinguno=filter[0];
  } );
 
}

//NIVEL EDUCACION

private obtenernivelEducacionNinguno (){
  let filter:NivelEducacionParalelo[]=[];
  this.nivelEducacionService.listarNivelEdicacion().subscribe(data=>{
   filter = data.filter((item) => item.descripcionNivelParalelo === 'NINGUNO');
   this.nivelEducacionParaleloNinguno=filter[0];
  } );
 
}

//NIVEL EDUCACION

private obtenerUnidadEducativaNinguno (){
  let filter:UnidadEducativa[]=[];
  this.unidadEducativaService.listarUnidadEducativa().subscribe(data=>{
   filter = data.filter((item) => item.nombreUnidadEducativa === 'NINGUNO');
   this.unidadEducativaNinguno=filter[0];
  } );
 
}



crearPacienteGeneral(){

console.log("QUE SE ENVIA"+this.nivelEducacionParaleloNinguno.idNivelEducacionParalelo);
//-----------------------------------------------

 if (this.infoEditar) {
  console.log("INGRESA EDITAR");
  this.editarRepresentante();

 }else{
  console.log("INGRESA CREAR");
 this.crearRepresentante();

 }
  

 }



crearRepresentante(){
   

  let tipoDiscapacidad:TipoDiscapacidad=new TipoDiscapacidad();
  //ingreso
  let discapacidad:Discapacidad=new Discapacidad();
  //ingreso
  let trabajo:Trabajo= new Trabajo();

  let tipoTrabajo:TipoTrabajo= new TipoTrabajo();

  let estadoCivil:EstadoCivil=new EstadoCivil();
  let tipoSangre:TipoSangre= new TipoSangre();
  let genero:Genero= new Genero();
  let profesion:Profesion=new Profesion();

  let representante:Representante=new Representante();


  //POSEE REPRESENTANTE
  if (this.representanteRadio==1) {

    //posee discapacidad
    if (this.discapacidadRepresentanteRadio==1) {


      tipoDiscapacidad.idTipoDiscapacidad=this.dialogForm.controls['tipoDiscapacidadRepre'].value;
      discapacidad.tipoDiscapacidad=tipoDiscapacidad;
      discapacidad.porcetajeDiscapacidad=parseInt(this.dialogForm.controls['porcentajeDiscapacidadRepre'].value);
      discapacidad.descripcionDiscapacidad=this.dialogForm.controls['descripcionDiscapacidadRepre'].value;
      //necesito id discapacidad
     // discapacidad.idDiscapacidad=24;
      console.log('LO QUE ENVIO DE DISCAPACIDAD'+discapacidad.descripcionDiscapacidad);


    }else{
      tipoDiscapacidad.idTipoDiscapacidad=this.tipoDiscapacidadNinguno.idTipoDiscapacidad;
      discapacidad.tipoDiscapacidad=tipoDiscapacidad;
      discapacidad.porcetajeDiscapacidad=0;
      discapacidad.descripcionDiscapacidad="";
      //necesito id discapacidad
     // discapacidad.idDiscapacidad=24;
      console.log('LO QUE ENVIO DE DISCAPACIDAD'+discapacidad.descripcionDiscapacidad);

    }


    this.discapacidadService.crearDiscapacidad(discapacidad)
    .subscribe(
      discapacidadCreada => {
       console.log('DISCAPACIDAD CREADO iuuuuuuuuuu'+discapacidadCreada.porcetajeDiscapacidad);
        if (discapacidadCreada.idDiscapacidad) {
          console.log('DISCAPACIDAD CREADO');
          representante.discapacidad=discapacidadCreada;
  

              //  trabajo.idTrabajo=25;
                tipoTrabajo.idTipoTrabajo=this.dialogForm.controls['tipoEmpleoRepre'].value;
                trabajo.tipoTrabajo=tipoTrabajo;
                trabajo.descripcionTrabajo=this.dialogForm.controls['descripcionTrabajoRepresentante'].value;
                trabajo.direccionTrabajo=this.dialogForm.controls['direccionTrabajoRepresentante'].value;
             
  
                this.trabajoService.crearTrabajo(trabajo)
                .subscribe(
                  trabajoCreado => {
                    console.log('TRABAJO CREADO iuuuuuuuuuu'+trabajoCreado);
                  if (trabajoCreado.idTrabajo) {
          
                    representante.trabajo=trabajoCreado;

                //    representante.idRepresentante=43;

                    representante.identificacionRepresentante=this.dialogForm.controls['identificacionRepresentante'].value;
                    representante.apellidoPaternoRepresentante=this.dialogForm.controls['apellidoPaternoRepresentante'].value;
                    representante.apellidoMaternoRepresentante=this.dialogForm.controls['apellidoMaternoRepresentante'].value;
                    representante.nombresRepresentante=this.dialogForm.controls['nombreRepresentante'].value;
                    representante.fechaNacimientoRepresentante=this.dialogForm.controls['fechaNacimientoRepresentante'].value;
                    representante.correoElectronicoRepresentante=this.dialogForm.controls['correoRepresentante'].value;
                    representante.celularRepresentante=this.dialogForm.controls['celularRepresentante'].value;
                    representante.telefonoEmergenciaRepresentante=this.dialogForm.controls['telefonoEmergenciaRepre'].value;
                    representante.parentescoRepresentante=this.dialogForm.controls['parentescoRepresentante'].value;
                    representante.direccionDomicilioRepresentan=this.dialogForm.controls['direccionDomicilioRepre'].value;
                    //representante.estadoRepresentante=true;
                   
                    estadoCivil.idEstadoCivil=this.dialogForm.controls['estadoCivilRepre'].value;
                    representante.estadoCivil=estadoCivil;
  
                    tipoSangre.idTipoSangre=this.dialogForm.controls['tipoSangreRepresentante'].value;
                    representante.tipoSangre=tipoSangre;
  
                    genero.idGenero=this.dialogForm.controls['generoRepresentante'].value;
                    representante.genero=genero;
                    
                    profesion.idProfesion=this.dialogForm.controls['profesionRepresentante'].value;
                    representante.profesion=profesion;
                   trabajoCreado
  
                   console.log('Va a crear representante');
                    this.representanteService.crearRepresentante(representante)
                    .subscribe(
                      representanteCreado => {
                       
                        if (representanteCreado.idRepresentante) {
                          this.representanteCreated=representanteCreado;
                          console.log('Representante enviado'+this.representanteCreated);
                          console.log('LO QUE SE GUARDA'+ this.representanteCreated);
                          console.log('LO QUE SE GUARDA EL IDE DEL REPRE'+ this.representanteCreated.idRepresentante);
                      
                          this.crearPaciente(representanteCreado);
  
                        }
                        console.log('Representante creado');
  
                      },
                      err => {//error representante
                        console.log('error crear repre');
                        this.errores = err.error.errors as string[];
                        console.error('Código del error desde el backend: ' + err.status);
                        console.error(err.error.errors);
                      }
                    );
  
  
                  }
  
                  },
                  err => {//error repre trabajo
                    console.log('error repre trabajo');
                    this.errores = err.error.errors as string[];
                    console.error('Código del error desde el backend: ' + err.status);
                    console.error(err.error.errors);
                  }
                );
  
        }
      },
  
  
      err => {//error repre discapacidad
        console.log('error repre discapacidad');
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );




   
   }else{

    //no posee discapacidad
 
      tipoDiscapacidad.idTipoDiscapacidad=this.tipoDiscapacidadNinguno.idTipoDiscapacidad;//11
      discapacidad.tipoDiscapacidad=tipoDiscapacidad;
      discapacidad.porcetajeDiscapacidad=0;
      discapacidad.descripcionDiscapacidad="";
      //necesito id discapacidad
   //   discapacidad.idDiscapacidad=24;
      console.log('LO QUE ENVIO DE DISCAPACIDAD'+discapacidad.descripcionDiscapacidad);

    


    this.discapacidadService.crearDiscapacidad(discapacidad)
    .subscribe(
      discapacidadCreada => {
       console.log('DISCAPACIDAD CREADO iuuuuuuuuuu'+discapacidadCreada.porcetajeDiscapacidad);
        if (discapacidadCreada.idDiscapacidad) {
          console.log('DISCAPACIDAD CREADO');
          representante.discapacidad=discapacidadCreada;
  

             //   trabajo.idTrabajo=25;

                tipoTrabajo.idTipoTrabajo=this.tipoTrabajoNinguno.idTipoTrabajo;
                trabajo.tipoTrabajo=tipoTrabajo;
                trabajo.descripcionTrabajo="";
                trabajo.direccionTrabajo="";
              
  
                this.trabajoService.crearTrabajo(trabajo)
                .subscribe(
                  trabajoCreado => {
                    console.log('TRABAJO CREADO iuuuuuuuuuu'+trabajoCreado);
                  if (trabajoCreado.idTrabajo) {
          
                    representante.trabajo=trabajoCreado;
  
                    representante.identificacionRepresentante="";
                    representante.apellidoPaternoRepresentante="";
                    representante.apellidoMaternoRepresentante="";
                    representante.nombresRepresentante="";
                    representante.fechaNacimientoRepresentante=new Date();
                    representante.correoElectronicoRepresentante="";
                    representante.celularRepresentante="";
                    representante.telefonoEmergenciaRepresentante="";
                    representante.parentescoRepresentante="";
                    representante.direccionDomicilioRepresentan="";
                    //representante.estadoRepresentante=false;
                   
                    estadoCivil.idEstadoCivil=this.estadoCivilNinguno.idEstadoCivil//8
                    representante.estadoCivil=estadoCivil;
  
                    tipoSangre.idTipoSangre=this.tipoSangreNinguno.idTipoSangre;
                    representante.tipoSangre=tipoSangre;
  
                    genero.idGenero=this.generoNinguno.idGenero;
                    representante.genero=genero;
                    
                    profesion.idProfesion=this.profesionNinguno.idProfesion;
                    representante.profesion=profesion;
                  
  
                   console.log('Va a crear representante');
                    this.representanteService.crearRepresentante(representante)
                    .subscribe(
                      representanteCreado => {
                       
                        if (representanteCreado.idRepresentante) {
                          this.representanteCreated=representanteCreado;
                          console.log('Representante enviado'+this.representanteCreated);
                          console.log('LO QUE SE GUARDA'+ this.representanteCreated);
                          console.log('LO QUE SE GUARDA EL IDE DEL REPRE'+ this.representanteCreated.idRepresentante);
                      
                          this.crearPaciente(representanteCreado);
  
                        }
                        console.log('Representante creado');
  
                      },
                      err => {//error representante
                        console.log('error crear repre');
                        this.errores = err.error.errors as string[];
                        console.error('Código del error desde el backend: ' + err.status);
                        console.error(err.error.errors);
                      }
                    );
  
  
                  }
  
                  },
                  err => {//error repre trabajo
                    console.log('error repre trabajo');
                    this.errores = err.error.errors as string[];
                    console.error('Código del error desde el backend: ' + err.status);
                    console.error(err.error.errors);
                  }
                );
  
        }
      },
  
  
      err => {//error repre discapacidad
        console.log('error repre discapacidad');
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );








   }


}





 crearPaciente(representante:Representante){
  console.log('Ingresa paciente 2');
  let paciente = new Paciente();
  let estadoCivil=new EstadoCivil();
  let tipoSangre=new TipoSangre();
  let tipoDiscapacidad=new TipoDiscapacidad();
  //ingreso
  let discapacidad=new Discapacidad();
  let genero= new Genero();
  //ingreso
  let trabajo= new Trabajo();

  let tipoTrabajo= new TipoTrabajo();

  let profesion= new Profesion();
  let unidadEducativa= new UnidadEducativa();
  let nivelEducacionParalelo= new NivelEducacionParalelo();
  //ingreso
  let antecedente= new Antecedente();


    let idRepresentante= representante.idRepresentante!;
    console.log('Ingresa paciente 3.1 la idRepresentante'+idRepresentante);

   
    this.representanteService.obtenerRepresentanteById(idRepresentante)
      .subscribe(repreAuxCedula => {
        console.log('Ingresa paciente 3');
      if (repreAuxCedula) {
          
        //representante creado    
        paciente.representante=repreAuxCedula;

      if (this.discapacidadRadio==1) {
      
        
        tipoDiscapacidad.idTipoDiscapacidad=this.dialogForm.controls['tipoDiscapacidad'].value;
        discapacidad.tipoDiscapacidad=tipoDiscapacidad;
        discapacidad.porcetajeDiscapacidad=this.dialogForm.controls['porcentajeDiscapacidad'].value;
        discapacidad.descripcionDiscapacidad=this.dialogForm.controls['descripcionDiscapacidad'].value;
        //necesito id discapacidad
       // discapacidad.idDiscapacidad=25;
        console.log('Ingresa paciente 4');
       }else{

        tipoDiscapacidad.idTipoDiscapacidad=this.tipoDiscapacidadNinguno.idTipoDiscapacidad;
      discapacidad.tipoDiscapacidad=tipoDiscapacidad;
      discapacidad.porcetajeDiscapacidad=0;
      discapacidad.descripcionDiscapacidad="";
      //necesito id discapacidad
     // discapacidad.idDiscapacidad=25;
      console.log('LO QUE ENVIO DE DISCAPACIDAD'+discapacidad.descripcionDiscapacidad);
       }

        //crear discapacidad
        this.discapacidadService.crearDiscapacidad(discapacidad)
        .subscribe(
          discapacidadCreada => {
           
            if (discapacidadCreada) {
              console.log('Ingresa paciente 5');
              //discapacidad creada
              paciente.discapacidad=discapacidadCreada;
              console.log("no INGRESA A RADIO ");


             if (this.educacionRadio==1) {
              
              unidadEducativa.idUnidadEducativa=this.dialogForm.controls['unidadEducativa'].value;
              paciente.unidadEducativa=unidadEducativa;

              nivelEducacionParalelo.idNivelEducacionParalelo=this.dialogForm.controls['nivelEducacion'].value;
              paciente.nivelEducacionParalelo=nivelEducacionParalelo;
             }else{
              unidadEducativa.idUnidadEducativa=this.unidadEducativaNinguno.idUnidadEducativa//1075;
              paciente.unidadEducativa=unidadEducativa;

              nivelEducacionParalelo.idNivelEducacionParalelo=this.nivelEducacionParaleloNinguno.idNivelEducacionParalelo//24;
              paciente.nivelEducacionParalelo=nivelEducacionParalelo;

             }
        //---------------------------------------------------------------------------------
      if (this.antecedentesRadio==1) {
      //  antecedente.idAntecedente=11;
        antecedente.sintomaAntecedente=this.dialogForm.controls['sintomaAntecedentes'].value;
        antecedente.enfermedadAntecedente=this.dialogForm.controls['enfermedadAntecedentes'].value;
        antecedente.enfermedadPaterna=this.dialogForm.controls['enfermedadPeterna'].value;
        antecedente.enfermedadMaterna=this.dialogForm.controls['enfermedadMaterna'].value;
        antecedente.enfermedadRepresentante=this.dialogForm.controls['enfermedadRepresenatante'].value;
        antecedente.tratamientoAntecedente=this.dialogForm.controls['tratamientoAntecedente'].value;
        antecedente.alergiaAntecedente=this.dialogForm.controls['alergiaAntecedente'].value;
        antecedente.medicamentoAntecedente=this.dialogForm.controls['medicamentoAntecedente'].value;
      }else{
       // antecedente.idAntecedente=11;
        antecedente.sintomaAntecedente="";
        antecedente.enfermedadAntecedente="";
        antecedente.enfermedadPaterna="";
        antecedente.enfermedadMaterna="";
        antecedente.enfermedadRepresentante="";
        antecedente.tratamientoAntecedente="";
        antecedente.alergiaAntecedente="";
        antecedente.medicamentoAntecedente="";

      }
        
       
        console.log('Ingresa paciente 8');
        this.antecedentesService.crearAntecedentes(antecedente)
        .subscribe(
          antecedenteCreado => {


            if (antecedenteCreado) {
              
              console.log('Ingresa paciente 9');
              //antecedente creado asignado
             paciente.antecedente= antecedenteCreado;
            //resto de informacion paciente    
            

            if (this.representanteRadio==1) {
              profesion.idProfesion=this.profesionNinguno.idProfesion;
              paciente.profesion=profesion; 
              

              paciente.celularPaciente='';
              paciente.telefonoPaciente='';
              paciente.direccionDomicilio='';
              paciente.correoElectronicoPaciente='';

            //    trabajo.idTrabajo=26;
                tipoTrabajo.idTipoTrabajo=this.tipoTrabajoNinguno.idTipoTrabajo;
                trabajo.tipoTrabajo=tipoTrabajo;
                trabajo.descripcionTrabajo="";
                trabajo.direccionTrabajo="";
               
              
            }else{

              profesion.idProfesion=this.dialogForm.controls['profesion'].value;
              paciente.profesion=profesion; 
              

              paciente.celularPaciente=this.dialogForm.controls['celular'].value;
              paciente.telefonoPaciente=this.dialogForm.controls['telefonoEmergencia'].value;
              paciente.direccionDomicilio=this.dialogForm.controls['direccionDomicilio'].value;
              paciente.correoElectronicoPaciente=this.dialogForm.controls['correo'].value;

              //   trabajo.idTrabajo=26;
                  tipoTrabajo.idTipoTrabajo=this.dialogForm.controls['tipoEmpleo'].value;
                trabajo.tipoTrabajo=tipoTrabajo;
                trabajo.descripcionTrabajo=this.dialogForm.controls['descripcionTrabajo'].value;
                trabajo.direccionTrabajo=this.dialogForm.controls['direccionTrabajo'].value;
              
            }



            this.trabajoService.crearTrabajo(trabajo)
            .subscribe(
              trabajoCreado => {

                if (trabajoCreado.idTrabajo) {
          
            paciente.trabajo=trabajoCreado;
            //RESTO DE CAMPOS
            paciente.identificacionPaciente=this.dialogForm.controls['identificacion'].value;
            paciente.nombresPaciente=this.dialogForm.controls['nombres'].value;
            paciente.apellidoPaternoPaciente=this.dialogForm.controls['apellidoPaterno'].value;
            paciente.fechaNacimientoPaciente=this.dialogForm.controls['fechaNacimiento'].value;
        
         
            paciente.apellidoMaternoPaciente=this.dialogForm.controls['apellidoMaterno'].value;
            
            estadoCivil.idEstadoCivil=this.dialogForm.controls['estadoCivil'].value;
            paciente.estadoCivil=estadoCivil;

           tipoSangre.idTipoSangre=this.dialogForm.controls['tipoSangre'].value;
            paciente.tipoSangre=tipoSangre;
      
            
           genero.idGenero=this.dialogForm.controls['genero'].value;
           paciente.genero=genero;

           //paciente.estadoPaciente=true;

           console.log('Ingresa paciente 10');
           this.pacienteService.crearPaciente(paciente)
           .subscribe(
             pacienteCreado => {
               
               console.log('Ingresa paciente 11');
               if (pacienteCreado) {
                 console.log('EL PACIENTE SE CREO CON EXITO');
                 this.pacienteCreated=pacienteCreado;
                 if (pacienteCreado) {
                  Swal.fire('Registro éxitoso',
                  "Paciente creado con éxito",
                  'success');
                
                  this.dialogForm.reset();
                  this.dialogRefCrear.close("guardar");

                 }
               }
             },
             err => {//error paciente
               console.log('error paciente');
               this.errores = err.error.errors as string[];
               console.error('Código del error desde el backend: ' + err.status);
               console.error(err.error.errors);
             }
           );


                }
               },
                  err => {//error repre trabajo
                    console.log('error repre trabajo');
                    this.errores = err.error.errors as string[];
                    console.error('Código del error desde el backend: ' + err.status);
                    console.error(err.error.errors);
                  }
                );
            }
    
          },//error antecedente
          err => {
            console.log('error antecedente');
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          }
        );
            }

          },//error discapacidad
          err => {
            console.log('error discapaciad');
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          }
        );

   
        }


      },//error obtener representante
      err => {
        console.log('obtener cedula represe');
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      
      );
    
    

 }





//-----------------------------EDITAR------------------
editarRepresentante(){
console.log("INGRESA REPRESENTANTE EDITAR");
  //POSEE REPRESENTANTE
  if (this.representanteRadio==1) {

    //posee discapacidad
    if (this.discapacidadRepresentanteRadio==1) {


      this.tipoDiscapacidadEditar.idTipoDiscapacidad=this.dialogForm.controls['tipoDiscapacidadRepre'].value;
      this.discapacidadEditar.tipoDiscapacidad= this.tipoDiscapacidadEditar;
      this.discapacidadEditar.porcetajeDiscapacidad=parseInt(this.dialogForm.controls['porcentajeDiscapacidadRepre'].value);
      this.discapacidadEditar.descripcionDiscapacidad=this.dialogForm.controls['descripcionDiscapacidadRepre'].value;
      //necesito id discapacidad
     // discapacidad.idDiscapacidad=24;
      console.log('LO QUE ENVIO DE DISCAPACIDAD'+  this.discapacidadEditar.descripcionDiscapacidad);


    }else{
      this.tipoDiscapacidadEditar.idTipoDiscapacidad=this.tipoDiscapacidadNinguno.idTipoDiscapacidad;
      this.discapacidadEditar.tipoDiscapacidad=this.tipoDiscapacidadEditar;
      this.discapacidadEditar.porcetajeDiscapacidad=0;
      this.discapacidadEditar.descripcionDiscapacidad="";
      //necesito id discapacidad
     // discapacidad.idDiscapacidad=24;
     
      console.log('LO QUE ENVIO DE DISCAPACIDAD'+ this.discapacidadEditar.descripcionDiscapacidad);

    }


    this.discapacidadService.actualizarDiscapacidad(this.discapacidadEditar)
    .subscribe(
      discapacidadEditada => {
       console.log('DISCAPACIDAD EDITADO iuuuuuuuuuu'+discapacidadEditada.porcetajeDiscapacidad);
        if (discapacidadEditada.idDiscapacidad) {
          console.log('DISCAPACIDAD EDITADO');
          this.representanteREditar.discapacidad=discapacidadEditada;
  

                //trabajo.idTrabajo=25;
                this.tipoTrabajoEditar.idTipoTrabajo=this.dialogForm.controls['tipoEmpleoRepre'].value;
                this.trabajoEditar.tipoTrabajo=this.tipoTrabajoEditar;
                this.trabajoEditar.descripcionTrabajo=this.dialogForm.controls['descripcionTrabajoRepresentante'].value;
                this.trabajoEditar.direccionTrabajo=this.dialogForm.controls['direccionTrabajoRepresentante'].value;
               
                this.trabajoService.actualizarTrabajo( this.trabajoEditar)
                .subscribe(
                  trabajoEditado => {
                    console.log('TRABAJO EDITARDO iuuuuuuuuuu'+trabajoEditado);
                  if (trabajoEditado.idTrabajo) {
          
                    this.representanteREditar.trabajo=trabajoEditado;

                //    representante.idRepresentante=43;

                this.representanteREditar.identificacionRepresentante=this.dialogForm.controls['identificacionRepresentante'].value;
                this.representanteREditar.apellidoPaternoRepresentante=this.dialogForm.controls['apellidoPaternoRepresentante'].value;
                this.representanteREditar.apellidoMaternoRepresentante=this.dialogForm.controls['apellidoMaternoRepresentante'].value;
                this.representanteREditar.nombresRepresentante=this.dialogForm.controls['nombreRepresentante'].value;
                this.representanteREditar.fechaNacimientoRepresentante=this.dialogForm.controls['fechaNacimientoRepresentante'].value;
                this.representanteREditar.correoElectronicoRepresentante=this.dialogForm.controls['correoRepresentante'].value;
                this.representanteREditar.celularRepresentante=this.dialogForm.controls['celularRepresentante'].value;
                this.representanteREditar.telefonoEmergenciaRepresentante=this.dialogForm.controls['telefonoEmergenciaRepre'].value;
                this.representanteREditar.parentescoRepresentante=this.dialogForm.controls['parentescoRepresentante'].value;
                this.representanteREditar.direccionDomicilioRepresentan=this.dialogForm.controls['direccionDomicilioRepre'].value;
                //this.representanteREditar.estadoRepresentante=true;
                   
                    this.estadoCivilEditar.idEstadoCivil=this.dialogForm.controls['estadoCivilRepre'].value;
                    this.representanteREditar.estadoCivil= this.estadoCivilEditar;
  
                    this.tipoSangreEditar.idTipoSangre=this.dialogForm.controls['tipoSangreRepresentante'].value;
                    this.representanteREditar.tipoSangre=this.tipoSangreEditar;
  
                    this.generoEditar.idGenero=this.dialogForm.controls['generoRepresentante'].value;
                    this.representanteREditar.genero=this.generoEditar;
                    
                    this.profesionEditar.idProfesion=this.dialogForm.controls['profesionRepresentante'].value;
                    this.representanteREditar.profesion=this.profesionEditar;


                  
                   console.log('Va a crear representante');
                    this.representanteService.actualizarRepresentante(this.representanteREditar)
                    .subscribe(
                      representanteEditado => {
                       
                        if (representanteEditado.idRepresentante) {
                          this.representanteEdited=representanteEditado;
                          console.log('Representante enviado'+this.representanteEdited);
                          console.log('LO QUE SE EDIUTA'+ this.representanteEdited);
                          console.log('LO QUE SE EDITA EL IDE DEL REPRE'+ this.representanteEdited.idRepresentante);
                      
                          this.editarPaciente(representanteEditado);
  
                        }
                        console.log('Representante editado');
  
                      },
                      err => {//error representante
                        console.log('error crear repre');
                        this.errores = err.error.errors as string[];
                        console.error('Código del error desde el backend: ' + err.status);
                        console.error(err.error.errors);
                      }
                    );
  
  
                  }
  
                  },
                  err => {//error repre trabajo
                    console.log('error repre trabajo');
                    this.errores = err.error.errors as string[];
                    console.error('Código del error desde el backend: ' + err.status);
                    console.error(err.error.errors);
                  }
                );
  
        }
      },
  
  
      err => {//error repre discapacidad
        console.log('error repre discapacidad');
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );




   
   }else{

    //no posee discapacidad
 
    this.tipoDiscapacidadEditar.idTipoDiscapacidad=this.tipoDiscapacidadNinguno.idTipoDiscapacidad;
    this.discapacidadEditar.tipoDiscapacidad= this.tipoDiscapacidadEditar;
    this.discapacidadEditar.porcetajeDiscapacidad=0;
    this.discapacidadEditar.descripcionDiscapacidad="";
      //necesito id discapacidad
   //   discapacidad.idDiscapacidad=24;
      console.log('LO QUE ENVIO DE DISCAPACIDAD'+ this.discapacidadEditar.descripcionDiscapacidad);

    


    this.discapacidadService.actualizarDiscapacidad(this.discapacidadEditar)
    .subscribe(
      discapacidadCreada => {
       console.log('DISCAPACIDAD CREADO iuuuuuuuuuu'+discapacidadCreada.porcetajeDiscapacidad);
        if (discapacidadCreada.idDiscapacidad) {
          console.log('DISCAPACIDAD CREADO');
          this.representanteREditar.discapacidad=discapacidadCreada;
  

             //   trabajo.idTrabajo=25;
             this.tipoTrabajoEditar.idTipoTrabajo=this.tipoTrabajoNinguno.idTipoTrabajo;
             this.trabajoEditar.tipoTrabajo= this.tipoTrabajoEditar;
             this.trabajoEditar.descripcionTrabajo="";
             this.trabajoEditar.direccionTrabajo="";
           
  
                this.trabajoService.actualizarTrabajo(this.trabajoEditar)
                .subscribe(
                  trabajoCreado => {
                    console.log('TRABAJO CREADO iuuuuuuuuuu'+trabajoCreado);
                  if (trabajoCreado.idTrabajo) {
          
                    this.representanteREditar.trabajo=trabajoCreado;
  
                    this.representanteREditar.identificacionRepresentante="";
                    this.representanteREditar.apellidoPaternoRepresentante="";
                    this.representanteREditar.apellidoMaternoRepresentante="";
                    this.representanteREditar.nombresRepresentante="";
                    this.representanteREditar.fechaNacimientoRepresentante=new Date();
                    this.representanteREditar.correoElectronicoRepresentante="";
                    this.representanteREditar.celularRepresentante="";
                    this.representanteREditar.telefonoEmergenciaRepresentante="";
                    this.representanteREditar.parentescoRepresentante="";
                    this.representanteREditar.direccionDomicilioRepresentan="";
                    ///this.representanteREditar.estadoRepresentante=false;
                   
                    this.estadoCivilEditar.idEstadoCivil=this.estadoCivilNinguno.idEstadoCivil;
                    this.representanteREditar.estadoCivil= this.estadoCivilEditar;
  
                    this.tipoSangreEditar.idTipoSangre=this.tipoSangreNinguno.idTipoSangre;
                    this.representanteREditar.tipoSangre=this.tipoSangreEditar;
  
                    this.generoEditar.idGenero=this.generoNinguno.idGenero;//5;
                    this.representanteREditar.genero=this.generoEditar;
                    
                    this.profesionEditar.idProfesion=this.profesionNinguno.idProfesion//60;
                    this.representanteREditar.profesion=this.profesionEditar;
                  
  
                   console.log('Va a crear representante');
                    this.representanteService.actualizarRepresentante(this.representanteREditar)
                    .subscribe(
                      representanteCreado => {
                       
                        if (representanteCreado.idRepresentante) {
                          this.representanteCreated=representanteCreado;
                          console.log('Representante enviado'+this.representanteCreated);
                          console.log('LO QUE SE GUARDA'+ this.representanteCreated);
                          console.log('LO QUE SE GUARDA EL IDE DEL REPRE'+ this.representanteCreated.idRepresentante);
                      
                          this.editarPaciente(representanteCreado);
  
                        }
                        console.log('Representante creado');
  
                      },
                      err => {//error representante
                        console.log('error crear repre');
                        this.errores = err.error.errors as string[];
                        console.error('Código del error desde el backend: ' + err.status);
                        console.error(err.error.errors);
                      }
                    );
  
  
                  }
  
                  },
                  err => {//error repre trabajo
                    console.log('error repre trabajo');
                    this.errores = err.error.errors as string[];
                    console.error('Código del error desde el backend: ' + err.status);
                    console.error(err.error.errors);
                  }
                );
  
        }
      },
  
  
      err => {//error repre discapacidad
        console.log('error repre discapacidad');
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );








   }


}


//EDITAR-----------------------
editarPaciente(representante:Representante){
  console.log('Ingresa paciente EDITAR');
  console.log(this.pacienteEditar);

    this.representanteService.obtenerRepresentanteById(this.representanteREditar.idRepresentante!)
      .subscribe(repreAuxCedula => {
        console.log('Ingresa paciente 3');
      if (repreAuxCedula) {
          
        //representante creado    
        this.pacientePacienteEditar.representante=repreAuxCedula;

      if (this.discapacidadRadio==1) {
      
        
        this.tipoDiscapacidadPacienteEditar.idTipoDiscapacidad=this.dialogForm.controls['tipoDiscapacidad'].value;
        this.discapacidadPacienteEditar.tipoDiscapacidad=this.tipoDiscapacidadPacienteEditar;
        this.discapacidadPacienteEditar.porcetajeDiscapacidad=this.dialogForm.controls['porcentajeDiscapacidad'].value;
        this.discapacidadPacienteEditar.descripcionDiscapacidad=this.dialogForm.controls['descripcionDiscapacidad'].value;
        //necesito id discapacidad
       // discapacidad.idDiscapacidad=25;
        console.log('Ingresa paciente 4');
       }else{

      this.tipoDiscapacidadPacienteEditar.idTipoDiscapacidad=this.tipoDiscapacidadNinguno.idTipoDiscapacidad;
      this.discapacidadPacienteEditar.tipoDiscapacidad=this.tipoDiscapacidadPacienteEditar;
      this.discapacidadPacienteEditar.porcetajeDiscapacidad=0;
      this.discapacidadPacienteEditar.descripcionDiscapacidad="";
      //necesito id discapacidad
     // discapacidad.idDiscapacidad=25;
      console.log('LO QUE ENVIO DE DISCAPACIDAD'+this.discapacidadPacienteEditar.descripcionDiscapacidad);
       }

        //crear discapacidad
        this.discapacidadService.actualizarDiscapacidad(this.discapacidadPacienteEditar)
        .subscribe(
          discapacidadActualizada => {
           
            if (discapacidadActualizada) {
              console.log('Ingresa paciente 5');
              //discapacidad creada
              this.pacientePacienteEditar.discapacidad=discapacidadActualizada;
              console.log("no INGRESA A RADIO ");


             if (this.educacionRadio==1) {
              
              this.unidadEducativaPacienteEditar.idUnidadEducativa=this.dialogForm.controls['unidadEducativa'].value;
              this.pacientePacienteEditar.unidadEducativa=this.unidadEducativaPacienteEditar;

              this.nivelEducacionParaleloPacienteEditar.idNivelEducacionParalelo=this.dialogForm.controls['nivelEducacion'].value;
              this.pacientePacienteEditar.nivelEducacionParalelo=this.nivelEducacionParaleloPacienteEditar;
              console.log("ENVIO NIEL EDUCACION PARALELO"+ this.nivelEducacionParaleloPacienteEditar.idNivelEducacionParalelo);
            }else{
              this.unidadEducativaPacienteEditar.idUnidadEducativa=this.unidadEducativaNinguno.idUnidadEducativa;
              this.pacientePacienteEditar.unidadEducativa=this.unidadEducativaPacienteEditar;

              this.nivelEducacionParaleloPacienteEditar.idNivelEducacionParalelo=this.nivelEducacionParaleloNinguno.idNivelEducacionParalelo;
              this.pacientePacienteEditar.nivelEducacionParalelo=this.nivelEducacionParaleloPacienteEditar;

             }
        //---------------------------------------------------------------------------------
      if (this.antecedentesRadio==1) {
      //  antecedente.idAntecedente=11;
        this.antecedentePacienteEditar.sintomaAntecedente=this.dialogForm.controls['sintomaAntecedentes'].value;
        this.antecedentePacienteEditar.enfermedadAntecedente=this.dialogForm.controls['enfermedadAntecedentes'].value;
        this.antecedentePacienteEditar.enfermedadPaterna=this.dialogForm.controls['enfermedadPeterna'].value;
        this.antecedentePacienteEditar.enfermedadMaterna=this.dialogForm.controls['enfermedadMaterna'].value;
        this.antecedentePacienteEditar.enfermedadRepresentante=this.dialogForm.controls['enfermedadRepresenatante'].value;
        this.antecedentePacienteEditar.tratamientoAntecedente=this.dialogForm.controls['tratamientoAntecedente'].value;
        this.antecedentePacienteEditar.alergiaAntecedente=this.dialogForm.controls['alergiaAntecedente'].value;
        this.antecedentePacienteEditar.medicamentoAntecedente=this.dialogForm.controls['medicamentoAntecedente'].value;
      }else{
       // antecedente.idAntecedente=11;
        this.antecedentePacienteEditar.sintomaAntecedente="";
        this.antecedentePacienteEditar.enfermedadAntecedente="";
        this.antecedentePacienteEditar.enfermedadPaterna="";
        this.antecedentePacienteEditar.enfermedadMaterna="";
        this.antecedentePacienteEditar.enfermedadRepresentante="";
        this.antecedentePacienteEditar.tratamientoAntecedente="";
        this.antecedentePacienteEditar.alergiaAntecedente="";
        this.antecedentePacienteEditar.medicamentoAntecedente="";

      }
        
       
        console.log('Ingresa paciente 8');
        this.antecedentesService.actualizarAntecedentes(this.antecedentePacienteEditar)
        .subscribe(
          antecedenteEditado => {


            if (antecedenteEditado) {
              
              console.log('Ingresa paciente 9');
              //antecedente creado asignado
              this.pacientePacienteEditar.antecedente= antecedenteEditado;
            //resto de informacion paciente    
            

            if (this.representanteRadio==1) {
              this.profesionPacienteEditar.idProfesion=this.profesionNinguno.idProfesion;
              this.pacientePacienteEditar.profesion=this.profesionPacienteEditar; 
              

              this.pacientePacienteEditar.celularPaciente='';
              this.pacientePacienteEditar.telefonoPaciente='';
              this.pacientePacienteEditar.direccionDomicilio='';
              this.pacientePacienteEditar.correoElectronicoPaciente='';

            //    trabajo.idTrabajo=26;
                this.tipoTrabajoEditar.idTipoTrabajo=this.tipoTrabajoNinguno.idTipoTrabajo;
                this.trabajoEditar.tipoTrabajo= this.tipoTrabajoEditar;
                this.trabajoPacienteEditar.descripcionTrabajo="";
                this.trabajoPacienteEditar.direccionTrabajo="";
            
              
            }else{

              this.profesionPacienteEditar.idProfesion=this.dialogForm.controls['profesion'].value;
              this.pacientePacienteEditar.profesion=this.profesionPacienteEditar; 
              

              this.pacientePacienteEditar.celularPaciente=this.dialogForm.controls['celular'].value;
              this.pacientePacienteEditar.telefonoPaciente=this.dialogForm.controls['telefonoEmergencia'].value;
              this.pacientePacienteEditar.direccionDomicilio=this.dialogForm.controls['direccionDomicilio'].value;
              this.pacientePacienteEditar.correoElectronicoPaciente=this.dialogForm.controls['correo'].value;

             //   trabajo.idTrabajo=26;
              //trabajo.idTrabajo=25;
                this.tipoTrabajoEditar.idTipoTrabajo=this.dialogForm.controls['tipoEmpleo'].value;
                this.trabajoEditar.tipoTrabajo=this.tipoTrabajoEditar;
                this.trabajoPacienteEditar.descripcionTrabajo=this.dialogForm.controls['descripcionTrabajo'].value;
                this.trabajoPacienteEditar.direccionTrabajo=this.dialogForm.controls['direccionTrabajo'].value;
               
            }



            this.trabajoService.actualizarTrabajo(this.trabajoPacienteEditar)
            .subscribe(
              trabajoEditado => {

                if (trabajoEditado.idTrabajo) {
          
                  this.pacientePacienteEditar.trabajo=trabajoEditado;
            //RESTO DE CAMPOS
            this.pacientePacienteEditar.identificacionPaciente=this.dialogForm.controls['identificacion'].value;
            this.pacientePacienteEditar.nombresPaciente=this.dialogForm.controls['nombres'].value;
            this.pacientePacienteEditar.apellidoPaternoPaciente=this.dialogForm.controls['apellidoPaterno'].value;
            this.pacientePacienteEditar.fechaNacimientoPaciente=this.dialogForm.controls['fechaNacimiento'].value;
           console.log("LO QUE SE ENVIA EN FECHA"+this.dialogForm.controls['fechaNacimiento'].value);
         
            this.pacientePacienteEditar.apellidoMaternoPaciente=this.dialogForm.controls['apellidoMaterno'].value;
            
            this.estadoCivilPacienteEditar.idEstadoCivil=this.dialogForm.controls['estadoCivil'].value;
            this.pacientePacienteEditar.estadoCivil=this.estadoCivilPacienteEditar;

           this.tipoSangrePacienteEditar.idTipoSangre=this.dialogForm.controls['tipoSangre'].value;
           this.pacientePacienteEditar.tipoSangre=this.tipoSangrePacienteEditar;
      
            
           this.generoPacienteEditar.idGenero=this.dialogForm.controls['genero'].value;
           this.pacientePacienteEditar.genero=this.generoPacienteEditar;

         //  this.pacientePacienteEditar.estadoPaciente= this.pacientePacienteEditar.estadoPaciente;
          
        console.log("el estado -----------"+this.pacientePacienteEditar.estadoPaciente);
           
                    //ACTUALIZAR EL ESTADO
          if (this.pacienteActivoRadio==1) {
            console.log("INHRESA-----------------------1");
            // this.pacientePacienteEditar.estadoPaciente=true;
                      
            }else{
             
              if (this.pacienteActivoRadio==2) {
                console.log("INHRESA-----------------------2");
               // this.pacientePacienteEditar.estadoPaciente=false;
              }
             
            }

           console.log('Ingresa paciente 10');
           this.pacienteService.actualizarPaciente(this.pacientePacienteEditar)
           .subscribe(
             pacienteEditado => {
               
               console.log('Ingresa paciente 11');
               if (pacienteEditado) {
                 console.log('EL PACIENTE SE EDITO CON EXITO');
                 this.pacienteEdited=pacienteEditado;
                 if (pacienteEditado) {
                  Swal.fire('Actualizacion éxitosa',
                  "Paciente editado con éxito",
                  'success');
                
                  this.dialogForm.reset();
                  this.dialogRefCrear.close("update");

                 }
               }
             },
             err => {//error paciente
               console.log('error paciente');
               this.errores = err.error.errors as string[];
               console.error('Código del error desde el backend: ' + err.status);
               console.error(err.error.errors);
             }
           );


                }
               },
                  err => {//error repre trabajo
                    console.log('error repre trabajo');
                    this.errores = err.error.errors as string[];
                    console.error('Código del error desde el backend: ' + err.status);
                    console.error(err.error.errors);
                  }
                );
            }
    
          },//error antecedente
          err => {
            console.log('error antecedente');
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          }
        );
            }

          },//error discapacidad
          err => {
            console.log('error discapaciad');
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          }
        );

   
        }


      },//error obtener representante
      err => {
        console.log('obtener cedula represe');
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      
      );
    
    

 }


 //RESETAR FECHA
  tranformarFecha(fecha: Date): Date
 {
  let nuevaFecha=new Date();
 
  nuevaFecha=new Date(fecha+" 00:00:00")
	return nuevaFecha;
 }
 

 //FALTA
 //1 EL AUTOCOMPLETE
 //2 VALIDACIONS DEL FORMULARIO
 //3 TIPO TRABAJO LA TABLA.===================
 //4 IMPLEMENTAR AUTENTICACION
 //5 AGEGAR EL ESTADO AL EDITAR=================
}
