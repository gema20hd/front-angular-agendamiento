import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEspecialidadModalComponent } from './editar-especialidad-modal.component';

describe('EditarEspecialidadModalComponent', () => {
  let component: EditarEspecialidadModalComponent;
  let fixture: ComponentFixture<EditarEspecialidadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarEspecialidadModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEspecialidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
