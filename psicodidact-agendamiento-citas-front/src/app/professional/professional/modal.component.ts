import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/users/login/auth.service';
import { ModalService } from './modal.service';
import { Profesional } from './profesional';
import { ProfesionalesService } from './profesionales.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

  @Input() profesional: Profesional = new Profesional();

  titulo: string = "Ingresar nuevo profesional";
  progreso: number = 0;

  constructor(
    public profesionalesService: ProfesionalesService,
    public authService: AuthService,
    public modalService: ModalService) { }

  ngOnInit() { }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.progreso = 0;
  }

 


}
