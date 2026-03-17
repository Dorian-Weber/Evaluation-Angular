import {Component, inject} from '@angular/core';
import {GameService} from '../../services/game-service';

@Component({
  selector: 'app-history',
  imports: [],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  protected gameService: GameService = inject(GameService);

}
