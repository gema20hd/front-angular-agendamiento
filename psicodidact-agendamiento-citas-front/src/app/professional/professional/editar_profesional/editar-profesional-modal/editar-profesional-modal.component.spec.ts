import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProfesionalModalComponent } from './editar-profesional-modal.component';

describe('EditarProfesionalModalComponent', () => {
  let component: EditarProfesionalModalComponent;
  let fixture: ComponentFixture<EditarProfesionalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarProfesionalModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProfesionalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
