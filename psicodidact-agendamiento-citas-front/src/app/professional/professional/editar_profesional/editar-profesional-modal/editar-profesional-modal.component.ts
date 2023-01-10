import { Component, Inject } from '@angular/core';
import { Profesional } from '../../../../models/profesional';
import { ProfesionalesService } from '../../../../services/profesionales.service';
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
import { Cuenta } from 'src/app/models/cuenta';
import { Usuario } from 'src/app/users/login/usuario';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/users/login/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { flatMap, map, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CuentasService } from 'src/app/services/cuentas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DiscapacidadService } from 'src/app/services/discapacidad.service';

@Component({
  selector: 'app-editar-profesional-modal',
  templateUrl: './editar-profesional-modal.component.html',
  styleUrls: ['./editar-profesional-modal.component.css']
})
export class EditarProfesionalModalComponent {

 titulo ="Editar el Profesional"

  bancosFiltrados: Observable<Banco[]> = new Observable();
  autocompleteControlBanco = new FormControl();
  cuenta: Cuenta = new Cuenta();
  discapacidad: Discapacidad = new Discapacidad();
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

 
  estadoActivoProfesional:boolean=false;
  estadoInactivoProfesional:boolean=false;



  dialogForm!: FormGroup;


  constructor(
    private profesionalService: ProfesionalesService,
    private cuentaService: CuentasService,
    public http: HttpClient,
    public authService: AuthService,
    private discapacidadService: DiscapacidadService,
    public router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<EditarProfesionalModalComponent>,
    private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {

    this.bancosFiltrados = this.autocompleteControlBanco.valueChanges.pipe(
      map((value) =>
        typeof value === 'string' ? value : value.descripcionBanco
      ),
      flatMap((value) => (value ? this._filterBanco(value) : []))
    );

    this.profesional.idProfesional =this.data.idProfesional
    this.profesional.identificacionProfesional =this.data.identificacionProfesional
    this.profesional.nombresProfesional =this.data.nombresProfesional
    this.profesional.apellidoPaternoProfesional =this.data.apellidoPaternoProfesional
    this.profesional.apellidoMaternoProfesional =this.data.apellidoMaternoProfesional
    this.profesional.correoElectronicoProfesional =this.data.correoElectronicoProfesional
    this.profesional.celularProfesional =this.data.celularProfesional
    this.profesional.fechaNacimientoProfesional =this.data.fechaNacimientoProfesional
    this.profesional.telefonoEmergenciaProfesional =this.data.telefonoEmergenciaProfesional
    this.profesional.direccionDomicilioProfesional=this.data.direccionDomicilioProfesional
    this.profesional.estadoProfesional=this.data.estadoProfesional

    this.cuenta.banco.idBanco=this.data.cuenta.banco.idBanco
    this.cuenta.banco.descripcionBanco=this.data.cuenta.banco.descripcionBanco
    this.cuenta.tipoCuenta.idTipoCuenta=this.data.cuenta.tipoCuenta.idTipoCuenta
    this.cuenta.idCuenta=this.data.cuenta.idCuenta
    this.cuenta.numeroCuenta=this.data.cuenta.numeroCuenta

    
    this.discapacidad.tipoDiscapacidad.idTipoDiscapacidad=this.data.discapacidad.tipoDiscapacidad.idTipoDiscapacidad
    this.discapacidad.tipoDiscapacidad.descripcionTipoDiscapacidad=this.data.discapacidad.tipoDiscapacidad.descripcionTipoDiscapacida
    this.discapacidad.idDiscapacidad=this.data.discapacidad.idDiscapacidad
    this.discapacidad.porcetajeDiscapacidad=this.data.discapacidad.porcetajeDiscapacidad
    this.discapacidad.porcetajeDiscapacidad=this.data.discapacidad.porcetajeDiscapacidad
    this.discapacidad.descripcionDiscapacidad=this.data.discapacidad.descripcionDiscapacidad

    this.profesionProfesional.idProfesionProfesional= this.data.profesionProfesional.idProfesionProfesional
    this.profesionProfesional.tercerNivelProfesionProfesional= this.data.profesionProfesional.tercerNivelProfesionProfesional
    
    this.genero.idGenero= this.data.genero.idGenero
    this.genero.descripcionGenero= this.data.genero.descripcionGenero

    this.tipoSangre.idTipoSangre= this.data.tipoSangre.idTipoSangre
    this.tipoSangre.descripcionTipoSangre= this.data.tipoSangre.descripcionTipoSangre

    this.estadoCivil.idEstadoCivil= this.data.estadoCivil.idEstadoCivil
    this.estadoCivil.descripcionEstadoCivil= this.data.estadoCivil.descripcionEstadoCivil


    this.dialogForm = this.formBuilder.group({
      poseeDiscapacidad: new FormControl('', Validators.required), //radio
      numeroCuenta: new FormControl('', Validators.required),
      banco: new FormControl('', Validators.required),
      tipoCuenta: new FormControl('', Validators.required),

      //profesional
      //idProfesional : new FormControl('',Validators.required),
      identificacionProfesional: new FormControl(
        this.profesional.identificacionProfesional,
        [Validators.required, Validators.minLength(6), Validators.maxLength(10)]
      ),

      nombresProfesional: new FormControl('', Validators.required),
      apellidoPaternoProfesional: new FormControl('', Validators.required),
      apellidoMaternoProfesional: new FormControl('', Validators.required),
      fechaNacimientoProfesional: new FormControl('', Validators.required),
      celularProfesional: new FormControl('', Validators.required),
      telefonoEmergenciaProfesional: new FormControl('', Validators.required),
      direccionDomicilioProfesional: new FormControl('', Validators.required),
      correoElectronicoProfesional: new FormControl('', Validators.required),
      estadoProfesional: new FormControl('', Validators.required),
      hojaVida: new FormControl('', Validators.required),
      tituloCuartoNivelProfesional: new FormControl('', Validators.required),

      idTipoDiscapcidad: new FormControl('', Validators.required),
      estadoCivil: new FormControl('', Validators.required),
      tipoSangre: new FormControl('', Validators.required),
      discapacidad: new FormControl('', Validators.required),
      descripcionDiscpacidad: new FormControl(),
      porcentajeDiscapacidad: new FormControl(),
      nivelEducacion: new FormControl('', Validators.required),
      tipoDiscapacidad: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      cuenta: new FormControl('', Validators.required),

      username: new FormControl('', Validators.required),
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      enabled: new FormControl('', Validators.required),
      profesional: new FormControl('', Validators.required),
      profesion: new FormControl('', Validators.required),
    });

    // get
    this.profesionalService.getGenero().subscribe((generos) => (this.generos = generos));
    this.profesionalService.getEstadoCivil().subscribe((estadosCivil) => (this.estadosCivil = estadosCivil));
    this.profesionalService.getTipoSangre().subscribe((tiposSangre) => (this.tiposSangre = tiposSangre));
    this.profesionalService.getTipoDiscapacidad().subscribe((tiposDiscapacidades) =>(this.tiposDiscapacidades = tiposDiscapacidades));
    this.profesionalService.getProfesionProfesional().subscribe((profesionProfesionales) =>(this.profesionProfesionales = profesionProfesionales));
    this.profesionalService.getTipoCuentas().subscribe((tiposCuentas) => (this.tiposCuentas = tiposCuentas));
  
   
  }


  update(): void {
    this.discapacidadService.actualizarDiscapacidad(this.discapacidad).subscribe(
      (discapacidadCreada) => {
        console.log(
          'discapacidad actualizada con éxito',
          discapacidadCreada.idDiscapacidad
        );
        this.profesional.discapacidad.tipoDiscapacidad.idTipoDiscapacidad = this.discapacidad.tipoDiscapacidad.idTipoDiscapacidad;
        this.profesional.discapacidad.idDiscapacidad =discapacidadCreada.idDiscapacidad;
        
        
        this.profesional.cuenta.banco.idBanco = this.cuenta.banco.idBanco;
        this.profesional.cuenta.tipoCuenta.idTipoCuenta =this.cuenta.tipoCuenta.idTipoCuenta;
        this.cuentaService.update(this.cuenta).subscribe(
          (cuentaCreada) => {
            console.log('cuenta actualizada con éxito', cuentaCreada);
            this.profesional.cuenta.idCuenta = cuentaCreada.idCuenta;
            this.profesional.tipoSangre.idTipoSangre = this.tipoSangre.idTipoSangre;
            this.profesional.estadoCivil.idEstadoCivil =this.estadoCivil.idEstadoCivil;
            this.profesional.genero.idGenero = this.genero.idGenero;
            this.profesional.profesionProfesional.idProfesionProfesional =this.profesionProfesional.idProfesionProfesional;
            console.log('Lo que se envia Profesional', this.profesional);
            this.profesionalService.update(this.profesional).subscribe(
              (profesionalCreado) => {
                console.log('profesional actualizada con éxito', profesionalCreado);
                Swal.fire(
                  'Actualización Profesional',`El Profesional ${this.profesional.nombresProfesional} ${this.profesional.apellidoPaternoProfesional} ha sido actualizado con éxito`,'success' );
                this.cancelar();

              });   
          },
          (err) => {
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            console.error(err.error.errors);
          }
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }

      );  
}
  //banco
  private _filterBanco(value: string): Observable<Banco[]> {
    const filterValue = value.toLowerCase();
    return this.profesionalService.getFiltrarBancos(filterValue);
  }

  mostrarBanco(banco?: Banco): string | '' {
    return banco ? banco.descripcionBanco : '';
  }

  seleccionarBanco(event: MatAutocompleteSelectedEvent): void {
    let banco = event.option.value as Banco;
    console.log(banco);
    this.autocompleteControlBanco.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  compararGenero(o1: Genero, o2: Genero): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.idGenero === o2.idGenero;
  }

  compararEstadoCivil(o1: EstadoCivil, o2: EstadoCivil): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.idEstadoCivil === o1.idEstadoCivil;
  }

  compararTipoDiscapacidad(
    o1: TipoDiscapacidad,
    o2: TipoDiscapacidad
  ): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.idTipoDiscapacidad === o1.idTipoDiscapacidad;
  }

  compararProfesionProfesional(
    o1: ProfesionProfesional,
    o2: ProfesionProfesional
  ): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.idProfesionProfesional === o1.idProfesionProfesional;
  }

  compararTipoSangre(o1: TipoSangre, o2: TipoSangre): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.idTipoSangre === o1.idTipoSangre;
  }

  compararTipoCuenta(o1: TipoCuenta, o2: TipoCuenta): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.idTipoCuenta === o1.idTipoCuenta;
  }

  public passwordsMatch = (_form: FormGroup): boolean => {
    if (
      _form.controls['password'].touched &&
      _form.controls['confirmPassword'].touched
    ) {
      if (_form.value.password === _form.value.confirmPassword) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  public verifyPasswords = (_field: string, _form: FormGroup): any => {
    let result = false;
    if (!this.passwordsMatch(_form) || !this.isFieldValid(_field, _form)) {
      result = true;
    }
    return { 'is-invalid': result };
  };

  public isFieldValid(_field: string, _form: FormGroup): boolean {
    let valid = true;
    if (_form.get(_field)?.invalid && _form.get(_field)?.touched) {
      valid = false;
    }
    return valid;
  }

  cancelar(): void {
    this.modalRef.close();
  }
}