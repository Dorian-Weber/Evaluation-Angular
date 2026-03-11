import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordContainer } from './word-container';

describe('WordContainer', () => {
  let component: WordContainer;
  let fixture: ComponentFixture<WordContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
