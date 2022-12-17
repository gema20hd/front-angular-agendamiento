import { Component, Inject } from '@angular/core';
import { Profesional } from '../../profesional';
import { ProfesionalesService } from '../../profesionales.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoDiscapacidad } from 'src/app/models/tipoDiscapacidad';
import { Genero } from 'src/app/models/genero';
import { Banco } from 'src/app/models/banco';
import { EstadoCivil } from 'src/app/models/estadoCivil';
import { Discapacidad } from 'src/app/models/discapacidad';
import { TipoSangre } from 'src/app/models/tipoSangre';
import { TipoCuenta } from 'src/app/models/tipoCuenta';
import { ProfesionProfesional } from 'src/app/models/profesionProfesional';
import { CuentasService } from '../../services/cuentas.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Cuenta } from 'src/app/models/cuenta';
import { Usuario } from 'src/app/users/login/usuario';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/users/login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { flatMap, map, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-editar-profesional-modal',
  templateUrl: './editar-profesional-modal.component.html',
  styleUrls: ['./editar-profesional-modal.component.css']
})
export class EditarProfesionalModalComponent {

 titulo ="Editar el Profesional"
  error: string[]=[];

  disableSelect = new FormControl(false);
  bancosFiltrados: Observable<Banco[]> = new Observable();
  autocompleteControlBanco = new FormControl();
  cuenta: Cuenta = new Cuenta();
  discapacidad: Discapacidad = new Discapacidad();
  usuario: Usuario = new Usuario()
  tipoCuenta: TipoCuenta = new TipoCuenta();
  profesional: Profesional = new Profesional();
  tipoDiscapacidad: TipoDiscapacidad = new TipoDiscapacidad();
  tipoSangre: TipoSangre = new TipoSangre();
  banco: Banco = new Banco();
  estadoCivil: EstadoCivil = new EstadoCivil();
  genero: Genero = new Genero();
  profesionProfesional: ProfesionProfesional = new ProfesionProfesional();


  profesionales: Profesional[] = [];
  generos: Genero[] = [];
  estadosCivil: EstadoCivil[] = [];
  discapacidades: Discapacidad[] = [];
  tiposDiscapacidades: TipoDiscapacidad[] = [];
  tiposSangre: TipoSangre[] = [];
  tiposCuentas: TipoCuenta[] = [];
  bancos: Banco[] = [];
  profesionProfesionales: ProfesionProfesional[] = [];
  errores: string[] = [];
  bancosAsignar: Banco[] = [];

  selectedTipoSangre?:number;
  selectedEstadoCivil?:number;
  selectedBanco?:number;
  selectedGenero?:number;
  selectedTipoDiscapacidad?:number;
  selectedProfesionProfesional?:number;
  discapacidadRadio:number=2;


  dialogForm!: FormGroup;


  constructor(
    private profesionalService:ProfesionalesService,
    private cuentaService:CuentasService,
    private usuarioService:UsuariosService,
    public http: HttpClient,
    public authService: AuthService,

    public router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<EditarProfesionalModalComponent>,
    private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {

    this.profesional.identificacionProfesional =this.data.identificacionProfesional
    this.profesional.nombresProfesional =this.data.nombresProfesional
    this.profesional.apellidoPaternoProfesional =this.data.apellidoPaternoProfesional
    this.profesional.apellidoPaternoProfesional =this.data.apellidoMaternoProfesional
    this.profesional.apellidoMaternoProfesional =this.data.fechaNacimientoProfesional
    this.profesional.correoElectronicoProfesional =this.data.correoElectronicoProfesional
    this.profesional.celularProfesional =this.data.celularProfesional
    this.profesional.telefonoEmergenciaProfesional =this.data.telefonoEmergenciaProfesional
    this.profesional.direccionDomicilioProfesional=this.data.direccionDomicilioProfesional
    this.cuenta.numeroCuenta=this.data.cuenta.numeroCuenta
    this.discapacidad.porcetajeDiscapacidad=this.data.discapacidad.porcetajeDiscapacidad
    this.discapacidad.descripcionDiscapacidad=this.data.discapacidad.descripcionDiscapacidad


    this.dialogForm=this.formBuilder.group({

    //Cuenta
    //idCuenta : new FormControl('',Validators.required),
    numeroCuenta: new FormControl('',Validators.required),
    banco: new FormControl('',Validators.required),
    tipoCuenta: new FormControl('',Validators.required),

    //profesional
    //idProfesional : new FormControl('',Validators.required),
    identificacionProfesional : new FormControl('',Validators.required),
    nombresProfesional : new FormControl('',Validators.required),
    apellidoPaternoProfesional : new FormControl('',Validators.required),
    apellidoMaternoProfesional : new FormControl('',Validators.required),
    fechaNacimientoProfesional : new FormControl('',Validators.required),
    celularProfesional : new FormControl('',Validators.required),
    telefonoEmergenciaProfesional : new FormControl('',Validators.required),
    direccionDomicilioProfesional : new FormControl('',Validators.required),
    correoElectronicoProfesional : new FormControl('',Validators.required),
    estadoProfesional : new FormControl('',Validators.required),
    hojaVida : new FormControl('',Validators.required),
    tituloCuartoNivelProfesional : new FormControl('',Validators.required),

	estadoCivil: new FormControl('',Validators.required),
	tipoSangre : new FormControl('',Validators.required),
  //discapacidad : new FormControl('',Validators.required),
  descripcionDiscpacidad : new FormControl('',Validators.required),
  porcentajeDiscapacidad: new FormControl('',Validators.required),
  tipoDiscapacidad: new FormControl('',Validators.required),
	genero : new FormControl('',Validators.required),
  profesionProfesional : new FormControl('',Validators.required),
  cuenta : new FormControl('',Validators.required),


    //usuario

    //idUsuario : new FormControl('',Validators.required),
    username : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    password2: new FormControl('',Validators.required),
    enabled : new FormControl('',Validators.required),
    rol: new FormControl('',Validators.required),
    profesional: new FormControl('',Validators.required),

  });

      this.bancosFiltrados = this.autocompleteControlBanco.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.descripcionBanco), 
      flatMap(value => value ? this._filterBanco(value) : []));



            // get
            this.profesionalService.getGenero().subscribe(generos => this.generos = generos);
            this.profesionalService.getEstadoCivil().subscribe(estadosCivil => this.estadosCivil = estadosCivil);
            this.profesionalService.getTipoSangre().subscribe(tiposSangre => this.tiposSangre = tiposSangre);
            this.profesionalService.getTipoDiscapacidad().subscribe(tiposDiscapacidades => this.tiposDiscapacidades = tiposDiscapacidades);
            this.profesionalService.getProfesionProfesional().subscribe(profesionProfesionales => this.profesionProfesionales = profesionProfesionales);
            this.profesionalService.getTipoCuentas().subscribe(tiposCuentas => this.tiposCuentas = tiposCuentas);
      
  
  }

  



//banco
private _filterBanco(value: string): Observable<Banco[]> {
  const filterValue = value;
  return this.profesionalService.getFiltrarBanco(filterValue);
}


mostrarBanco(banco ? : Banco): string | "" {
  return banco ? banco.descripcionBanco : "";
}

seleccionarBanco(event: MatAutocompleteSelectedEvent): void {
  let banco = event.option.value as Banco;
  console.log(banco);
  this.bancosAsignar.push(banco);
  this.autocompleteControlBanco.setValue('');
  event.option.focus();
  event.option.deselect();

}

  cancelar(): void{
    this.modalRef.close();
  }

  verInformacionProfesional(id: number) {
    this.profesionalService.getProfesionalId(id).subscribe(rs => { this.profesional =rs });
    }
      
   editarInformacionProfesional(profesional: Profesional){
      this.profesionalService.update(profesional).subscribe(profesional=> {
        console.log(profesional);
        Swal.fire('Modificado:', `Profesional ${profesional.nombresProfesional} actualizado con éxito`, 'success');
      }, err => {
        if(err.status === 400){
          this.error = err.error;
          console.log(this.error);
        }
      });
    }

    compararGenero(o1: Genero, o2: Genero): boolean {
      if (o1 === undefined && o2 === undefined) {
        return true;
      }
    
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idGenero === o2.idGenero;
    }
    
    compararEstadoCivil(o1: EstadoCivil, o2: EstadoCivil): boolean {
      if (o1 === undefined && o2 === undefined) {
        return true;
      }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idEstadoCivil === o1.idEstadoCivil;
    }
    
    compararTipoDiscapacidad(o1: TipoDiscapacidad, o2: TipoDiscapacidad): boolean {
      if (o1 === undefined && o2 === undefined) {
        return true;
      }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idTipoDiscapacidad === o1.idTipoDiscapacidad;
    }
    
    compararProfesionProfesional(o1: ProfesionProfesional, o2: ProfesionProfesional): boolean {
      if (o1 === undefined && o2 === undefined) {
        return true;
      }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idProfesionProfesional === o1.idProfesionProfesional;
    }
    
    compararTipoSangre(o1: TipoSangre, o2: TipoSangre): boolean {
      if (o1 === undefined && o2 === undefined) {
        return true;
      }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idTipoSangre === o1.idTipoSangre;
    }
    
    compararTipoCuenta(o1: TipoCuenta, o2: TipoCuenta): boolean {
      if (o1 === undefined && o2 === undefined) {
        return true;
      }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.idTipoCuenta === o1.idTipoCuenta;
    }
    
    
    
    

  
}
