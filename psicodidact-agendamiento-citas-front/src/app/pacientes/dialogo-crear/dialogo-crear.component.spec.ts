import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCrearComponent } from './dialogo-crear.component';

describe('DialogoCrearComponent', () => {
  let component: DialogoCrearComponent;
  let fixture: ComponentFixture<DialogoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
