import { Component, Inject } from '@angular/core';
import { Profesional } from '../../profesional';
import { ProfesionalesService } from '../../profesionales.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
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

@Component({
  selector: 'app-crear-profesional-modal',
  templateUrl: './crear-profesional-modal.component.html',
  styleUrls: ['./crear-profesional-modal.component.css']
})
export class CrearProfesionalModalComponent {

  cuenta: Cuenta = new Cuenta();
  usuario: Usuario = new Usuario()
  profesional: Profesional = new Profesional();

  profesionales: Profesional[] = [];
  generos: Genero[] = [];
  estadoCivil: EstadoCivil[] = [];
  discapacidades: Discapacidad[] = [];
  tiposDiscapacidades: TipoDiscapacidad[] = [];
  tipoSangre: TipoSangre[] = [];
  tiposCuentas: TipoCuenta[] = [];
  bancos: Banco[] = [];
  profesionProfesionales: ProfesionProfesional[] = [];
  errores: string[] = [];

  selectedTipoSangre?:number;
  selectedEstadoCivil?:number;
  selectedBanco?:number;
  selectedGenero?:number;
  selectedTiposDiscapacidades?:number;
  selectedProfesionProfesionales?:number;

  dialogForm!: FormGroup;
  discapacidadRadio:number=2;
  checkPoseeDiscapacidadSi:boolean=false;
  checkPoseeDiscapacidadNo:boolean=true;




  constructor(
    private profesionalService:ProfesionalesService,
    private cuentaService:CuentasService,
    private usuarioService:UsuariosService,
    public http: HttpClient,
    public authService: AuthService,

    public router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<CrearProfesionalModalComponent>,
    private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {


 
  
  }

  
  creaeCuenta(){
    console.log(this.cuenta);
    this.cuentaService.create(this.cuenta)
      .subscribe(
        cuenta => {
          console.log(cuenta)
            },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );

  }

  crearProfesional(profesional: Profesional){
    console.log(this.cuenta);
    this.profesionalService.create(this.profesional)
      .subscribe(
        profesional => {
          console.log(profesional)
            },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );


  }

  crearUsuario( profesional: Profesional){

  }

  creaeProfesionalCompleto(){
    

  }
  create(): void {
    this.profesionalService.create(this.profesional)
      .subscribe(profesional => {
        this.router.navigate(['/profesional'])
        Swal.fire('Profesional Creado', `profesional ${profesional.nombresProfesional +' '+profesional.apellidoPaternoProfesional} Creado con éxito!`, 'success')
        
      }
      );
  }

  update():void{
    this.profesionalService.update(this.profesional)
    .subscribe( profesional => {
      this.router.navigate(['/profesional'])
      
    })
  }


  cancelar(): void{
    this.modalRef.close();
  }
}
