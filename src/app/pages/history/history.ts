import {Component, inject} from '@angular/core';
import {GameService} from '../../services/game-service';
import {RouterLink} from "@angular/router";
import {DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [
    RouterLink,
    NgClass,
    DatePipe
  ],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  protected gameService: GameService = inject(GameService);

}
