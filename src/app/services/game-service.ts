import {inject, Injectable, signal} from '@angular/core';
import {Score} from '../components/score/score';
import {Error} from './error';


@Injectable({
  providedIn: 'root',
})
export class GameService {
  private error = inject(Error)

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
    this.setPlaying()
    this.error.counter$.update(count =>count = 0)
    // TODO randomword,si dialog fermer, liste lettre utiliser, placeholder

  }


}
