import { Injectable } from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Keyboard {
  //keydown permet d'écouter tous les évènements clavier.
  private keydown$: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(window, 'keydown');

  // filtre pour récupérer que les lettres.
  letters$: Observable<String> = this.keydown$.pipe(
    map(e => e.key ),
    filter(key => /^[a-zA-Z]$/.test(key))
  );
}
