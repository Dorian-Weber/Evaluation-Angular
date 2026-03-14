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

  private gameService= inject(GameService);

  private error$ = this.gameService.counter$

  constructor() {
    effect(() => {
      if (this.error$() >= 5) {
        this.gameService.setLose()
        return;
      }
      if (this.gameService.testLetterAgainstWord()) {
        this.gameService.setWin()
        return;
      }
    })
  }




}
