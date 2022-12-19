import { TestBed } from '@angular/core/testing';

import { ProfesionalesService } from '../../services/profesionales.service';

describe('ProfesionalesService', () => {
  let service: ProfesionalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfesionalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
