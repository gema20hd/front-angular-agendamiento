import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaCompra } from 'src/app/models/facturaCompra';
import { Paciente } from 'src/app/models/paciente';
import { AuthService } from 'src/app/users/login/auth.service';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent {
  titulo = 'Crer el Profesional';
  error: any;
  errores: string[] = [];

  paciente: Paciente= new Paciente();
  facturaCompra: FacturaCompra = new FacturaCompra();
  facturas: FacturaCompra[] = [];
  dialogForm!: FormGroup;

  constructor(

    public http: HttpClient,
    public authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public modalRef: MatDialogRef<CrearFacturaComponent>,
    private formBuilder: FormBuilder
  ) {}

  
}
