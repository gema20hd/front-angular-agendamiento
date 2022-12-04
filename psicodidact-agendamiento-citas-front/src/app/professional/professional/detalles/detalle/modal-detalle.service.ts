import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDetalleService {

  modal: boolean = false;

  public _notificar = new EventEmitter<any>();

  constructor() { }

  get notificar(): EventEmitter<any> {
    return this._notificar;
  }

  abrirModal() {
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }
}