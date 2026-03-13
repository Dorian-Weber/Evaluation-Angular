import {inject, Injectable, signal} from '@angular/core';
import {Score} from '../components/score/score';
import {Error} from './error';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private error = inject(Error);

  private counter = this.error.counter$()
  gameState = signal<'playing' | 'win' | 'lose'>('playing');

  setWin() {
    this.gameState.set('win')
  }

  setLose() {
    this.gameState.set('lose')
  }
}
