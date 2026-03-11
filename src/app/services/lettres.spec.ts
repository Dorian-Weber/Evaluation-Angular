import { TestBed } from '@angular/core/testing';

import { Lettres } from './lettres';

describe('Lettres', () => {
  let service: Lettres;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Lettres);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
