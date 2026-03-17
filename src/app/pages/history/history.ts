import {Component, inject} from '@angular/core';
import {GameService} from '../../services/game-service';
import {RouterLink} from "@angular/router";
import {NgClass} from '@angular/common';
import {LocalStorage} from '../../services/local-storage';

@Component({
  selector: 'app-history',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './history.html',
  styleUrl: './history.css',
})
export class History {
  protected gameService: GameService = inject(GameService);



}
