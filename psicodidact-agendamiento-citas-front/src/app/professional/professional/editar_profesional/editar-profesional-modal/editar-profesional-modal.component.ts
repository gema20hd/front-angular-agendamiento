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

   // this.data.enabled = true;
    //this.usuario.enabled = this.data.enabled;

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
      this.getTiposSangres();
      this.getGenero();
      this.getEstadoCivil ();
      this.getProfesionProfesional();
      this.gettipoDiscapacidad();
      
      
  
  }

  


  create(): void {
    this.cuentaService.create(this.cuenta)
      .subscribe(cuenta => {
        console.log(cuenta)
       }
      );

      this.profesionalService.create(this.profesional)
      .subscribe(profesional => {
        console.log(profesional)
        if (this.discapacidadRadio==1) {
          this.tipoDiscapacidad.idTipoDiscapcidad=this.dialogForm.controls['tipoDiscapacidad'].value;
          this.discapacidad.tipoDiscapacidad=this.tipoDiscapacidad;
          this.discapacidad.porcentajeDiscapacidad=this.dialogForm.controls['porcentajeDiscapacidad'].value;
          this.discapacidad.descripcionDiscpacidad=this.dialogForm.controls['descripcionDiscapacidad'].value;
          console.log('Ingresa', profesional);
         }else{
  
        this.tipoDiscapacidad.idTipoDiscapcidad=11;
        this.discapacidad.tipoDiscapacidad=this.tipoDiscapacidad;
        this.discapacidad.porcentajeDiscapacidad="";
        this.discapacidad.descripcionDiscpacidad="";
        console.log('LO QUE ENVIO DE DISCAPACIDAD'+this.discapacidad.descripcionDiscpacidad);
         } 
      }
      );

      this.usuarioService.create(this.usuario)
      .subscribe(usuario => {
        this.router.navigate(['/profesional'])
        console.log(usuario)
 }
      );
  }


private getTiposSangres(){
    this.profesionalService.getTipoSangre().subscribe(tipoSangre=>{
    this.tiposSangre=tipoSangre;
    } );
}

private getGenero(){
this.profesionalService.getGenero().subscribe(genero=>{
this.generos=genero;


} );
}

private getProfesionProfesional(){
this.profesionalService.getProfesionProfesional().subscribe(profesionProfesional=>{
this.profesionProfesionales=profesionProfesional;

} );
}


private gettipoDiscapacidad(){
this.profesionalService.getTipoDiscapacidad().subscribe(tipoDiscapacidad=>{
this.tiposDiscapacidades=tipoDiscapacidad;

} );
}

private getEstadoCivil (){
this.profesionalService.getEstadoCivil().subscribe(estadoCivil=>{
this.estadosCivil=estadoCivil;

} );
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

    editarProfesional(){
      
    }
}
