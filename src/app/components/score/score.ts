import {Component, inject} from '@angular/core';
import {Error} from '../../services/error';
import {GameService} from '../../services/game-service';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.html',
  styleUrl: './score.css',
})
export class Score {
  private gameService = inject(GameService);

  protected counter$ = this.gameService.counter$;
}
