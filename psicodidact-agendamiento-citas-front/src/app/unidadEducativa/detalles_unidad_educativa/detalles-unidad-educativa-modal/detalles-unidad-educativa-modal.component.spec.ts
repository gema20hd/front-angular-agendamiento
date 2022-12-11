import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesUnidadEducativaModalComponent } from './detalles-unidad-educativa-modal.component';

describe('DetallesUnidadEducativaModalComponent', () => {
  let component: DetallesUnidadEducativaModalComponent;
  let fixture: ComponentFixture<DetallesUnidadEducativaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesUnidadEducativaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesUnidadEducativaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
