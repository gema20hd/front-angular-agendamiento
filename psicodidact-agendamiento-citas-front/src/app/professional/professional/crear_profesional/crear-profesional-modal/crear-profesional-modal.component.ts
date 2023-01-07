import { Component, Inject } from '@angular/core';
import { Profesional } from '../../../../models/profesional';
import { ProfesionalesService } from '../../../../services/profesionales.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CuentasService } from 'src/app/services/cuentas.service';
import { DiscapacidadService } from 'src/app/services/discapacidad.service';

@Component({
  selector: 'app-crear-profesional-modal',
  templateUrl: './crear-profesional-modal.component.html',
  styleUrls: ['./crear-profesional-modal.component.css'],
})
export class CrearProfesionalModalComponent {
  titulo = 'Crer el Profesional';
  error: any;
  errores: string[] = [];
  discapacidadRadio: number =2;
  checkPoseeDiscapacidadSi:boolean=false;
  checkPoseeDiscapacidadNo:boolean=true;

  bancosFiltrados: Observable<Banco[]> = new Observable();
  autocompleteControlBanco = new FormControl();

  cuenta: Cuenta = new Cuenta();
  discapacidad: Discapacidad = new Discapacidad();
  usuario: Usuario = new Usuario();
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

  bancosAsignar: Banco[] = [];



  dialogForm!: FormGroup;

  constructor(
    private profesionalService: ProfesionalesService,
    private cuentaService: CuentasService,
    private usuarioService: UsuariosService,
    public http: HttpClient,
    public authService: AuthService,
    private discapacidadService: DiscapacidadService,
    public router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<CrearProfesionalModalComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.bancosFiltrados = this.autocompleteControlBanco.valueChanges.pipe(
      map((value) =>
        typeof value === 'string' ? value : value.descripcionBanco
      ),
      flatMap((value) => (value ? this._filterBanco(value) : []))
    );

    this.dialogForm = this.formBuilder.group({
      poseeDiscapacidad: new FormControl('', Validators.required), //radio
      numeroCuenta: new FormControl('', Validators.required),
      banco: new FormControl('', Validators.required),
      tipoCuenta: new FormControl('', Validators.required),

      //profesional
      //idProfesional : new FormControl('',Validators.required),
      identificacionProfesional: new FormControl('', Validators.required),
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
      profesionProfesional: new FormControl('', Validators.required),
      cuenta: new FormControl('', Validators.required),

      username: new FormControl('', Validators.required),
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      enabled: new FormControl('', Validators.required),
      profesional: new FormControl('', Validators.required),
      profesion: new FormControl('', Validators.required),
    });

    // get
    this.profesionalService.getGenero() .subscribe((generos) => (this.generos = generos));
    this.profesionalService.getEstadoCivil().subscribe((estadosCivil) => (this.estadosCivil = estadosCivil));
    this.profesionalService.getTipoSangre().subscribe((tiposSangre) => (this.tiposSangre = tiposSangre));
    this.profesionalService.getTipoDiscapacidad().subscribe((tiposDiscapacidades) =>(this.tiposDiscapacidades = tiposDiscapacidades));
    this.profesionalService.getProfesionProfesional().subscribe((profesionProfesionales) =>(this.profesionProfesionales = profesionProfesionales));
    this.profesionalService.getTipoCuentas().subscribe((tiposCuentas) => (this.tiposCuentas = tiposCuentas));
  }
  get name() {
    return this.dialogForm.get('identificacionProfesional');
  }

  create(): void {
    if(this.discapacidad.porcetajeDiscapacidad !=0){

    this.discapacidadService.crearDiscapacidad(this.discapacidad).subscribe(
      (discapacidadCreada) => {
        console.log(
          'discapacidad creada con éxito',
          discapacidadCreada.idDiscapacidad
        );
        this.profesional.discapacidad.tipoDiscapacidad.idTipoDiscapacidad =
          this.discapacidad.tipoDiscapacidad.idTipoDiscapacidad;
        this.profesional.discapacidad.idDiscapacidad =
          discapacidadCreada.idDiscapacidad;
        console.log(' cuenta', this.cuenta);
        
        this.profesional.cuenta.banco.idBanco = this.cuenta.banco.idBanco;
        this.profesional.cuenta.tipoCuenta.idTipoCuenta =
          this.cuenta.tipoCuenta.idTipoCuenta;
        this.cuentaService.create(this.cuenta).subscribe(
          (cuentaCreada) => {
            console.log('cuenta creada con éxito', cuentaCreada);
            this.profesional.cuenta.idCuenta = cuentaCreada.idCuenta;
            this.profesional.tipoSangre.idTipoSangre =
              this.tipoSangre.idTipoSangre;
            this.profesional.estadoCivil.idEstadoCivil =
              this.estadoCivil.idEstadoCivil;
            this.profesional.genero.idGenero = this.genero.idGenero;
            this.profesional.profesionProfesional.idProfesionProfesional =
              this.profesionProfesional.idProfesionProfesional;

            console.log('Lo que se envia Profesional', this.profesional);
            this.profesionalService.create(this.profesional).subscribe(
              (profesionalCreado) => {
                console.log('me trae el profesional creado', profesionalCreado);
                this.usuario.profesional.idProfesional =
                  profesionalCreado.idProfesional;
                this.usuario.username =
                  profesionalCreado.correoElectronicoProfesional;
                console.log('lo que envio', this.usuario);

                this.usuarioService.create(this.usuario).subscribe(
                  (usuario) => {
                    console.log('usuario creado con éxito', usuario);
                    
                    Swal.fire(
                      'Nuevo Profesional',`El Profesional ${this.profesional.nombresProfesional} ${this.profesional.apellidoPaternoProfesional}ha sido creado con éxito`,'success' );
                    this.cancelar();
                  });
                  
              },(err) => {
                this.errores = err.error.errors as string[];
                console.error('Código del error desde el backend: ' + err.status);
                //console.error('Cuenta bnacaria ya existe: ' + err.validarNumeroCuentaRepetida);
                console.error(err.error.errors);
                this.discapacidadService.eliminarDiscapacidad(this.profesional.discapacidad.idDiscapacidad).subscribe(
                  () => {
                    console.log(
                      'discapacidad eliminada con éxito',
                      this.profesional.discapacidad.idDiscapacidad
                    );
              }
            );
    
            this.cuentaService.eliminarCuenta(this.profesional.cuenta.idCuenta).subscribe(
              () => {
                console.log(
                  'cuenta eliminada con éxito',
                  this.profesional.cuenta.idCuenta
                );
          }
        );
              }
            );
            
          });
      },
      (err) => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
        this.discapacidadService.eliminarDiscapacidad(this.profesional.discapacidad.idDiscapacidad).subscribe(
          () => {
            console.log(
              'discapacidad eliminada con éxito',
              this.profesional.discapacidad.idDiscapacidad
            );
      }
    );

    this.cuentaService.eliminarCuenta(this.profesional.cuenta.idCuenta).subscribe(
      () => {
        console.log(
          'cuenta eliminada con éxito',
          this.profesional.cuenta.idCuenta
        );
  }
);
      });
   }else{
    //this.profesional.discapacidad.tipoDiscapacidad.idTipoDiscapacidad = 11;
    this.profesional.discapacidad.idDiscapacidad = 1;
    this.profesional.cuenta.banco.idBanco = this.cuenta.banco.idBanco;
    this.profesional.cuenta.tipoCuenta.idTipoCuenta =this.cuenta.tipoCuenta.idTipoCuenta;
    this.cuentaService.create(this.cuenta).subscribe(
      (cuentaCreada) => {
        console.log('cuenta creada con éxito', cuentaCreada);
        this.profesional.cuenta.idCuenta = cuentaCreada.idCuenta;
        this.profesional.tipoSangre.idTipoSangre =
          this.tipoSangre.idTipoSangre;
        this.profesional.estadoCivil.idEstadoCivil =
          this.estadoCivil.idEstadoCivil;
        this.profesional.genero.idGenero = this.genero.idGenero;
        this.profesional.profesionProfesional.idProfesionProfesional =
          this.profesionProfesional.idProfesionProfesional;

        console.log('Lo que se envia Profesional', this.profesional);
        this.profesionalService.create(this.profesional).subscribe(
          (profesionalCreado) => {
            console.log('me trae el profesional creado', profesionalCreado);
            this.usuario.profesional.idProfesional =
              profesionalCreado.idProfesional;
            this.usuario.username =
              profesionalCreado.correoElectronicoProfesional;
            console.log('lo que envio', this.usuario);

            this.usuarioService.create(this.usuario).subscribe(
              (usuario) => {
                console.log('usuario creado con éxito', usuario);
                Swal.fire(
                  'Nuevo Profesional',`El Profesional ${this.profesional.nombresProfesional} ${this.profesional.apellidoPaternoProfesional}  ha sido creado con éxito`,'success' );
                this.cancelar();
              },
              (err) => {
                this.errores = err.error.errors as string[];
                console.error(
                  'Código del error desde el backend: ' + err.status
                );
                console.error(err.error.errors);
                
              }
            );
          },
          (err) => {
            this.errores = err.error.errors as string[];
            console.error('Código del error desde el backend: ' + err.status);
            //console.error('Cuenta bnacaria ya existe: ' + err.validarNumeroCuentaRepetida);
            console.error(err.error.errors);
            this.discapacidadService.eliminarDiscapacidad(this.profesional.discapacidad.idDiscapacidad).subscribe(
              () => {
                console.log(
                  'discapacidad eliminada con éxito',
                  this.profesional.discapacidad.idDiscapacidad
                );
          }
        );

        this.cuentaService.eliminarCuenta(this.profesional.cuenta.idCuenta).subscribe(
          () => {
            console.log(
              'cuenta eliminada con éxito',
              this.profesional.cuenta.idCuenta
            );
      }
    );
          }
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error('Cuenta bancaria ya existe: ' + err.validarNumeroCuentaRepetida);
        
       
        console.error(err.error.errors);
      }
    );

    }
  
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