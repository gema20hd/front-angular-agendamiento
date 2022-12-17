import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadEducativaComponent } from './unidad-educativa.component';

describe('UnidadEducativaComponent', () => {
  let component: UnidadEducativaComponent;
  let fixture: ComponentFixture<UnidadEducativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadEducativaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadEducativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
