
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UnidadEducativaService } from '../../../services/unidadEducativa.service';
import Swal from 'sweetalert2';
import { UnidadEducativa } from 'src/app/models/unidadEducativa';


@Component({
  selector: 'app-crear-unidad-educativa-mpdal',
  templateUrl: './crear-unidad-educativa-mpdal.component.html',
  styleUrls: ['./crear-unidad-educativa-mpdal.component.css']
})


export class CrearUnidadEducativaMpdalComponent implements OnInit{

  mostrarColumnas: string[] = ['nombre', 'direccion','codigo'];
  
  dialogForm!: FormGroup;
  unidadesEducativasAsignar: UnidadEducativa [] = [];
  autocompleteControlNombre = new FormControl();
  unidadEducativa: UnidadEducativa;
  titulo: string = 'Nuevo Unidad Educativa';
  inputTest="0";
  errores: String [] = [];
  unidadesEducativasFiltrados: Observable<UnidadEducativa[]> = new Observable();
  
  constructor(
    
  public router: Router,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public modalRef: MatDialogRef<CrearUnidadEducativaMpdalComponent>,
  public http: HttpClient,
  private unidadEducativaService: UnidadEducativaService

  ) {this.unidadEducativa = new UnidadEducativa()}

  ngOnInit(): void {
      this.dialogForm = new FormGroup({
      codigo: new FormControl('',Validators.required),
      nombre: new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required)


  });
  
  
  }


  create(): void {
    this.unidadEducativaService.create(this.unidadEducativa)
      .subscribe(unidadEducativa => {
          this.router.navigate(['/unidadEducativa']);
          console.log(" hola ....",unidadEducativa);
          Swal.fire('Nueva unidad educativa', `La unidad educativa ${unidadEducativa.nombreUnidadEducativa} ha sido creado con éxito`, 'success');
        }
      );
  }
  

  cancelar(): void{
     this.modalRef.close();
   }

}
