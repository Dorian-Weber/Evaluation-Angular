import {Component, inject, signal} from '@angular/core';
import {Letters} from '../../services/letters';
import {Words} from '../../services/words';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.html',
  styleUrl: './score.css',
})
export class Score {
  private letters = inject(Letters);
  private word = inject(Words);

  protected lastLetter = this.letters.getLastLetter
  protected getRandomWord = this.word.getRandomWord()

  protected counter = signal(0);

  scoreCounter() : void {
    if(!this.getRandomWord.includes(this.lastLetter()!)) {
      this.counter.update(count => count + 1);

    }
  }
}
