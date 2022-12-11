
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Component, Inject } from '@angular/core';


@Component({
  selector: 'app-crear-unidad-educativa-mpdal',
  templateUrl: './crear-unidad-educativa-mpdal.component.html',
  styleUrls: ['./crear-unidad-educativa-mpdal.component.css']
})


export class CrearUnidadEducativaMpdalComponent {
  
  constructor(
    
    public router: Router,
  public dialog: MatDialog,
  public activatedRoute: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public modalRef: MatDialogRef<CrearUnidadEducativaMpdalComponent>,
  private formBuilder: FormBuilder
  ) {}
}
