import {effect, inject, Injectable, signal} from '@angular/core';
import {Keyboard} from './keyboard';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class Letters {

  private keyboard = inject(Keyboard);

  lastLetter = toSignal(this.keyboard.letters$, { initialValue: null });
  lettersList = signal<string[]>([]);

  constructor() {
    effect(() => {
      const letter = this.lastLetter();
      if(letter)
        if (!this.lettersList().includes(letter)) {
          this.lettersList.update(list => [...list, letter]);
          console.log(this.lettersList())
      }
    });
  }
 readonly getLastLetter = this.lastLetter;
 readonly getLettersList = this.lettersList;

}
