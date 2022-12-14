import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { flatMap, map, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Paciente } from '../models/paciente';
import { PacienteService } from '../services/paciente.service';
import { DialogInformacionComponent } from './dialog-informacion/dialog-informacion.component';
import { DialogoCrearComponent } from './dialogo-crear/dialogo-crear.component';
import { DtoTablaPacientes } from './dto-tabla-pacientes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit ,AfterViewInit{
   
  displayedColumns: string[] = ['Identificacion','Nombres','Apellidos','Representante','Carnet_Discapacidad','Estado','accion'];
//  dataSource = new MatTableDataSource<Paciente>();

  dialogForm!: FormGroup;
  errores?: string[];
  //cedula traida desde el dialogo crear
  cedula?:string;
  
 // pacientesDtoFiltrados: Observable<Paciente[]> = new Observable();

  autocompleteControlApellidoCedula = new FormControl();
  inputTest="0";

  pacientesFiltrados: Observable<Paciente[]> = new Observable();


  constructor(private pacienteService:PacienteService,
 private diagCrearPaciente:MatDialog,
 //private dialogRefCrear:MatDialogRef<DialogoCrearComponent>,
  private diagCrearInformacion:MatDialog,
 // private formBuilder: FormBuilder, 
  
  ) { }


  pacientes: Paciente[]=[];
  
  auxPacientes:DtoTablaPacientes[]=[];

  pacienteDtoObservable: Observable<Paciente[]> = new Observable();



  ngOnInit(): void {

   // this.obtenerPacientes();

  // this.pacientesDtoFiltrados=this.pacienteService.listarPaciente();
/*
    this.dialogForm=this.formBuilder.group({
 
      identificacion: new FormControl('',[Validators.pattern('[0-9]{10}')]),
      apellidos: new FormControl('',[Validators.pattern('[a-zA-Z]+$')]),

    });
    */

   
    this.pacientesFiltrados= this.obtenerFiltros('');


  }


  private  obtenerFiltros(valor:string): Observable<Paciente[]> {

 // console.log('GATOOOOOOOOOOOOOOOOOOOOO');
       this.autocompleteControlApellidoCedula.setValue(valor);
      
  
   console.log('VALORRRRRRRRRRRRRRRRRRRR'+this.autocompleteControlApellidoCedula.value)
    return this.autocompleteControlApellidoCedula.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.identificacionPaciente), 
      flatMap(value => value ? this._filterApellidoCedula(value) : []));
  }


  private _filterApellidoCedula(value: string): Observable<Paciente[]> {
    const filterValue = value.toLowerCase();
    
   if(filterValue.match(/^[0-9]+$/)) {
     this.inputTest="0";
     console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'+value);
     return  this.pacienteService.getFiltrarPacienteDni(filterValue);
     
   } else {
      this.inputTest="1";
      return this.pacienteService.getFiltrarPacienteApellidoPaterno(filterValue);
    }
    
  }

  seleccionarApellidoCedula(event: MatAutocompleteSelectedEvent): void {
    let paciente = event.option.value as Paciente;
    console.log(paciente);
    this.autocompleteControlApellidoCedula.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  mostrarApellidoCedula(paciente ? : Paciente): string | "" {
    if(this.inputTest=="0"){
      return paciente ? paciente.identificacionPaciente! : "";
    }else{
      return paciente ? paciente.apellidoPaternoPaciente!: "";
    }  
  
  }

  //para validar
  get identificacion(){
   return  this.dialogForm.controls['identificacion'];
  }
  

  get apellidos(){
    return  this.dialogForm.controls['apellidos'];
   }


 // @ViewChild(MatPaginator) paginator!: MatPaginator;
 // @ViewChild(MatSort) sort!: MatSort;
  
  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;
    
  }



private obtenerPacientes(): Observable<Paciente[]> {


    
return this.pacienteService.listarPaciente();
/* 
.subscribe(data =>{
      this.pacientes=data;
 /*     //Ingresa a cambiar por los parametros de la tabla
      this.crearDtoPaciente(this.pacientes);

      console.log("AUX LISTAR"+this.auxPacientes);
      
      this.dataSource.data=this.auxPacientes;

   //  console.log("los pacientes son as notas son inacivas");
     this.dataSource.paginator = this.paginator;

     this.dataSource.data=data;

     });
    */
   }


   openDiagCrearPaciente(){ 
    this.diagCrearPaciente.open(DialogoCrearComponent
      ).afterClosed().subscribe(valor=>{
        console.log("EL VALOR ES "+valor);
        
        if (valor) {
        console.log("INGREAAAAAA-======")
      //  this.pacientesFiltrados=  this.obtenerPacienteByCedula(valor);
      this.pacientesFiltrados=this.obtenerPacienteByCedula(valor);
      setTimeout(() => {
        this.pacientesFiltrados=this.obtenerFiltros('');
      }, 1000)
     
        }
        //CONTINUA ESCUCHANDO EL OBSERVABLE
       
      }
        );
   }


   openDiagEditarPaciente(row:any){ 
    this.diagCrearPaciente.open(DialogoCrearComponent,
      {
        data:row
      }).afterClosed().subscribe(valor=>{
        if (valor) {
          console.log("INGREAAAAAA-RRRRR-----------------------------======");
      
          this.pacientesFiltrados=this.obtenerPacienteByCedula(valor);
          setTimeout(() => {
            this.pacientesFiltrados=this.obtenerFiltros('');
          }, 1000)
         console.log("-------------------====tyyyyyyyyyyyyyyyyy");
         
        }
    //CONTINUA ESCUCHANDO EL OBSERVABLE
    

      }
      
        );
      
     
   }

   //listarPaciente():Observable<Paciente[]>{


  //  return this.http.get<Paciente[]>(this.url);
  
  // }


   private crearDtoPaciente(pacientes:Paciente[]){
    this.auxPacientes=[];
   // this.dataSource = new MatTableDataSource<DtoTablaPacientes>();

    let nuevoPaciente:DtoTablaPacientes;

    let paciente:Paciente;

    
    for (let i = 0; i < pacientes.length; i++) {
      nuevoPaciente= new DtoTablaPacientes();
      paciente=pacientes[i];
       
      if (paciente) {
        nuevoPaciente.id=paciente.idPaciente;
        nuevoPaciente.apellidos=paciente.apellidoPaternoPaciente+" "+paciente.apellidoMaternoPaciente;
        nuevoPaciente.nombres=paciente.nombresPaciente;

        nuevoPaciente.identificacion=paciente.identificacionPaciente;  
        nuevoPaciente.estado=paciente.estadoPaciente;
       

        nuevoPaciente.identificacion=paciente.identificacionPaciente;
      //  if (paciente.estadoPaciente==true) {
          nuevoPaciente.estado="Activo";
       // }else{
          nuevoPaciente.estado="Inactivo";
        //}


        if (paciente.representante?.identificacionRepresentante) {
          nuevoPaciente.posee_representante="Si";
        }else{
          nuevoPaciente.posee_representante="No";

        }

        if (paciente.discapacidad?.descripcionDiscapacidad) {
          nuevoPaciente.posee_carnet="Si";
        }else{
          nuevoPaciente.posee_carnet="No";
        }

        console.log("LO QUE INGRESA");
        console.log(nuevoPaciente);
        this.auxPacientes.push(nuevoPaciente);
      }
  
     }

     
   }


   
   openDiagInformacion(row :any){
    this.diagCrearInformacion.open(DialogInformacionComponent,{
 
      width: '850px',
      data:row
      
    });

    console.log('el  row '+row.discapacidad.idDiscapacidad);
   }
/*


   buscarBtn(){
   this.dataSource = new MatTableDataSource<DtoTablaPacientes>();

   let identificacion:string= this.dialogForm.controls['identificacion'].value;
   let apellidos:string= this.dialogForm.controls['apellidos'].value;
   
    if (identificacion==="" && apellidos==="") {
       
      
      Swal.fire('Ingrese un par??metro de b??squeda',
       "Puede realizar la b??squeda por c??dula o apellido paterno del paciente",
       'warning');
     }else{
      if (identificacion!=="" && apellidos!=="") {
       // console.log("INGRESE UN UNICO PARAMETRO DE BUSQUEDA");

        Swal.fire('Ingrese un ??nico par??metro de b??squeda',
        "Puede realizar la b??squeda por c??dula o apellido paterno del paciente",
        'warning');
      }else{

        if (identificacion!=="") {
         // console.log("ingresa identificacion");

         this.obtenerPacienteByCedula(identificacion);

        }

        if (apellidos!=="") {
       //   console.log("ingresa apellidos");

       this.obtenerPacienteByApellido(apellidos);

        }

        
      }
     }

   }





   private obtenerPacienteByCedula(cedula:any){
  

    let pacienteByCedula:Paciente[]=[];

    this.pacienteService.obtenerPacienteByCedula(cedula).subscribe((data)=>{

        pacienteByCedula.push(data as Paciente);
        console.log("OBTENER"+pacienteByCedula);

        this.crearDtoPaciente(pacienteByCedula);
     
        this.dataSource.data=this.auxPacientes;

        //  console.log("los pacientes son as notas son inacivas");
          this.dataSource.paginator = this.paginator;

   
    },
    err => {
     
      this.errores = err.error.errors as string[];
     // console.error('C??digo del error desde el backend: ' + err.status);
      if (err.status==404) {
       // console.log("Paciente no encontrado por cedula ingresada");

        Swal.fire('Paciente no encontrado',
        `El paciente con c??dula ${cedula} no se encuentra registrado`,
        'warning');
      }
      console.error(err.error.errors);
    }
  );
   }




   

   private obtenerPacienteByApellido(apellido:string){
  


    this.pacienteService.obtenerPacienteByApellido(apellido).subscribe((data)=>{
       // console.log("OBTENER"+pacienteByApellido);
  if (data) {
    
  
        this.crearDtoPaciente(data);
     
        this.dataSource.data=this.auxPacientes;

        //  console.log("los pacientes son as notas son inacivas");
          this.dataSource.paginator = this.paginator;

   }
    },
    err => {
     
      this.errores = err.error.errors as string[];
     // console.error('C??digo del error desde el backend: ' + err.status);
   //   if (err.status==404) {
     //   console.log("Paciente no encontrado por apellido ingresado");
    //   Swal.fire('Paciente no encontrado',
     //  `El paciente con apellido o iniciales ${apellido} no se encuentra registrado`,
     //  'warning');
    //  }
      console.error(err.error.errors);
    }
  );
   }
*/


 private obtenerPacienteByCedula(cedula:any): Observable<Paciente[]>{


console.log("INGRESA METODO OBTENER PACIENTES BY CEDULA");
 return this.pacienteService.obtenerPacienteByCedula(cedula);

  }
  
  

}


