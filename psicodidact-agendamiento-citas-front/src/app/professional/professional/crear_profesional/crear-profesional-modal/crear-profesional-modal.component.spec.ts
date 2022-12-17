import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProfesionalModalComponent } from './crear-profesional-modal.component';

describe('CrearProfesionalModalComponent', () => {
  let component: CrearProfesionalModalComponent;
  let fixture: ComponentFixture<CrearProfesionalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProfesionalModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearProfesionalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
