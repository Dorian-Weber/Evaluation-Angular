import {Component, effect, inject} from '@angular/core';
import {GameService} from '../../services/game-service';
import {Error} from '../../services/error';
import {Words} from '../../services/words';
import {Letters} from '../../services/letters';

@Component({
  selector: 'app-game-over',
  imports: [],
  templateUrl: './game-over.html',
  styleUrl: './game-over.css',
})
export class GameOver {

  private errorService = inject(Error);
  private gameService= inject(GameService);
  private wordsService = inject(Words);
  private lettersService= inject(Letters);

  private error$ = this.errorService.counter$
  //private testLetterAgainstWord = this.wordsService.testLetterAgainstWord
  private lettersList$ = this.lettersService.lettersList$;


  constructor() {
    effect(() => {
      if (this.error$() >= 5) {
        this.gameService.setLose()
        return;
      };
      if (this.gameService.testLetterAgainstWord(this.lettersList$())) {
        this.gameService.setWin()
        return;
      }
    })
  }




}
