import {inject, Injectable, signal} from '@angular/core';
import {Words} from './words';
import {Letters} from './letters';

@Injectable({
  providedIn: 'root',
})
export class Error {
  private wordService = inject(Words);
  private letterService = inject(Letters);

  protected lastLetter = this.letterService.getLastLetter

  counter = signal(0);

  scoreCounter() : void {
    if (this.lastLetter === null) return;
    if(!this.wordService.isIncluded(<string> this.lastLetter())) {
      this.counter.update(count => count + 1);
    }
  }
}
