import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/login/auth.service';
import { Profesional } from '../../profesional';
import { ProfesionalesService } from '../../profesionales.service';
import { ModalDetalleService } from './modal-detalle.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() profesional: Profesional = new Profesional();

  titulo: string = "Detalle del profesional";
  progreso: number = 0;

  constructor(
    public profesionalsrvice: ProfesionalesService,
    public authService: AuthService,
    public  modalDetalleService:  ModalDetalleService) { }

  ngOnInit() { }



  cerrarModal() {
    this.modalDetalleService.cerrarModal();
    this.progreso = 0;
  }
}
