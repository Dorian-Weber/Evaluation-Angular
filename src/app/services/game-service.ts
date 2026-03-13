import {inject, Injectable, signal} from '@angular/core';
import {Error} from './error';
import {Letters} from './letters';


@Injectable({
  providedIn: 'root',
})
export class GameService {
  private error = inject(Error)
  private letters = inject(Letters)

  gameState$ = signal<'playing' | 'win' | 'lose'>('playing');

  setWin() {
    this.gameState$.set('win')
    console.log(this.gameState$())
  }

  setLose() {
    this.gameState$.set('lose')
    console.log(this.gameState$())
  }

  setPlaying() {
    this.gameState$.set('playing')
    console.log(this.gameState$())
  }

  resetGame() {
    this.setPlaying();
    this.error.counter$.update(count =>count = 0);
    this.letters.lettersList$.set([])
    this.letters.lastLetter$.set(null)
    // TODO randomword,si dialog fermer, placeholder

  }


}
