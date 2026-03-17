import { Injectable } from '@angular/core';
import {BehaviorSubject, EMPTY, fromEvent, Observable, switchMap} from 'rxjs';
import {map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Keyboard {
  //keydown permet d'écouter tous les évènements clavier.
  private keydown$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(window, 'keydown');
  private listening = new BehaviorSubject<boolean>(true);

  letters$ = this.listening.pipe(
    switchMap(isListening =>
      isListening
        ? this.keydown$.pipe(
          map(e => e.key),
          filter(key => /^[a-zA-Z]$/.test(key))
        )
        : EMPTY
    )
  );

  startListening() {
    this.listening.next(true);
  }

  stopListening() {
    this.listening.next(false);
  }
}
