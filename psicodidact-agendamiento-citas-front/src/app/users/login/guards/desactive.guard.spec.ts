import { TestBed } from '@angular/core/testing';

import { DesactiveGuard } from './desactive.guard';

describe('DesactiveGuard', () => {
  let guard: DesactiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DesactiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
