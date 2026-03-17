import {Component, inject} from '@angular/core';

import {GameService} from '../../services/game-service';

@Component({
  selector: 'app-hangman',
  imports: [],
  templateUrl: './hangman.html',
  styleUrl: './hangman.css',
})
export class Hangman {
  private gameService = inject(GameService);
  protected errors = this.gameService.counter;
}
