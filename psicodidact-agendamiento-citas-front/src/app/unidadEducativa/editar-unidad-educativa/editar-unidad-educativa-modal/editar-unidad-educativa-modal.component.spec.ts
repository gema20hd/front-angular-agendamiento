import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUnidadEducativaModalComponent } from './editar-unidad-educativa-modal.component';

describe('EditarUnidadEducativaModalComponent', () => {
  let component: EditarUnidadEducativaModalComponent;
  let fixture: ComponentFixture<EditarUnidadEducativaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarUnidadEducativaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarUnidadEducativaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
