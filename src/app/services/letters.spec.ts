import { TestBed } from '@angular/core/testing';

import { Letters } from './letters';

describe('Lettres', () => {
  let service: Letters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Letters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
