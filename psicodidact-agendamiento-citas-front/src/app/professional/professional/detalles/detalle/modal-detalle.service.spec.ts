import { TestBed } from '@angular/core/testing';

import { ModalDetalleService } from './modal-detalle.service';

describe('ModalDetalleService', () => {
  let service: ModalDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
