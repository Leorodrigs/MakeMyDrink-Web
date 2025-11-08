import { TestBed } from '@angular/core/testing';

import { Drinks } from './drinks';

describe('Drinks', () => {
  let service: Drinks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Drinks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
