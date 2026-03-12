import {effect, inject, Injectable, signal} from '@angular/core';
import {Words} from './words';
import {Letters} from './letters';
import {Keyboard} from './keyboard';

@Injectable({
  providedIn: 'root',
})
export class Error {
  private wordService = inject(Words);
  private letterService = inject(Letters);

  keyboardService = inject(Keyboard);

  counter$ = signal(0);

  constructor() {
    effect(() => {
      const letter = this.lastLetter()?.toUpperCase()
      if (!letter) return;
      if (!this.wordService.isIncluded(letter)){
        this.counter$.update(count => count + 1);
        console.log(this.counter$());
      }
    })
  }

  protected lastLetter = this.letterService.getLastLetter




}
