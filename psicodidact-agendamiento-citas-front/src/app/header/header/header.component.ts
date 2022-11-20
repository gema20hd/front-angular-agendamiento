
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/users/login/auth.service';
import swal from 'sweetalert2';
import { ModalComponent } from 'src/app/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = 'App Angular'
  modalRef: MdbModalRef<ModalComponent> | null = null;
  constructor(public authService: AuthService, public router: Router ) { }//public modalService: MdbModalService

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }
  mprofesional(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

  openModal() {
    //this.modalRef = this.modalService.open(ModalComponent)
  }
  
}