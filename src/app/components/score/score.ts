import {Component, inject, signal} from '@angular/core';

import {GameService} from '../../services/game-service';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.html',
  styleUrl: './score.css',
})
export class Score {
  private gameService = inject(GameService);

  protected counter = this.gameService.counter;
  protected record = this.gameService.getRecord;
}
