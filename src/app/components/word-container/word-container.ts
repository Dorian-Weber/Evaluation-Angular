import {Component, OnInit, signal, inject} from '@angular/core';
import {Words} from '../../services/words';
import {Letters} from '../../services/letters';
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
