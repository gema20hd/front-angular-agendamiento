import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEspecialidadModalComponent } from './crear-especialidad-modal.component';

describe('CrearEspecialidadModalComponent', () => {
  let component: CrearEspecialidadModalComponent;
  let fixture: ComponentFixture<CrearEspecialidadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEspecialidadModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEspecialidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
