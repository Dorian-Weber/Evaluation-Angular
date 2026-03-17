import {Component, inject} from '@angular/core';
import {GameService} from '../../services/game-service';


@Component({
  selector: 'app-word-container',
  imports: [

  ],
  templateUrl: './word-container.html',
  styleUrl: './word-container.css',
})

export class WordContainer {
  protected gameService = inject(GameService);

}
