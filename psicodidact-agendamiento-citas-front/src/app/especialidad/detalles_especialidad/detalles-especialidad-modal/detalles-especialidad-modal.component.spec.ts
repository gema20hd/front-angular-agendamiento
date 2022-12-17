import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesEspecialidadModalComponent } from './detalles-especialidad-modal.component';

describe('DetallesEspecialidadModalComponent', () => {
  let component: DetallesEspecialidadModalComponent;
  let fixture: ComponentFixture<DetallesEspecialidadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesEspecialidadModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesEspecialidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
