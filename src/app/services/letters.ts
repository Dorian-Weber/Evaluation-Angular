import {effect, inject, Injectable, signal} from '@angular/core';
import {Keyboard} from './keyboard';
import {toSignal} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class Letters {
  // !!! DEPRECATED !!!

  private keyboard = inject(Keyboard);

  private _lastLetter$ = toSignal(this.keyboard.letters$, { initialValue: null });
  lastLetter$ = signal<string | null>(null)
  lettersList$ = signal<string[]>([]);



  constructor() {
    effect(() => {
      this.lastLetter$.set(this._lastLetter$());

    });
    effect(() => {
        const letter = this.lastLetter$()?.toUpperCase();
      if(letter)
        if (!this.lettersList$().includes(letter)) {
          this.lettersList$.update(list => [...list, letter]);
      }
    });
  }

  readonly getLastLetter$ = this.lastLetter$;
  readonly getLettersList$ = this.lettersList$;

}
