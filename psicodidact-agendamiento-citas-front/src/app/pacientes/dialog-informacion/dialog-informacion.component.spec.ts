import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInformacionComponent } from './dialog-informacion.component';

describe('DialogInformacionComponent', () => {
  let component: DialogInformacionComponent;
  let fixture: ComponentFixture<DialogInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInformacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
