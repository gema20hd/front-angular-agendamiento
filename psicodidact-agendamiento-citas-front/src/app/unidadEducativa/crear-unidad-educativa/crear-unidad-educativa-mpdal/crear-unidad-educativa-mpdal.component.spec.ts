import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUnidadEducativaMpdalComponent } from './crear-unidad-educativa-mpdal.component';

describe('CrearUnidadEducativaMpdalComponent', () => {
  let component: CrearUnidadEducativaMpdalComponent;
  let fixture: ComponentFixture<CrearUnidadEducativaMpdalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearUnidadEducativaMpdalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearUnidadEducativaMpdalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
