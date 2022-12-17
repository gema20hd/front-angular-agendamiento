import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProfesionalModalComponent } from './detalle-profesional-modal.component';

describe('DetalleProfesionalModalComponent', () => {
  let component: DetalleProfesionalModalComponent;
  let fixture: ComponentFixture<DetalleProfesionalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleProfesionalModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleProfesionalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
