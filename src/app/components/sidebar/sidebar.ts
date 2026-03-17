import {Component, inject} from '@angular/core';

import {NgClass} from '@angular/common';
import {GameService} from '../../services/game-service';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass,
    RouterLink
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar {
  protected gameService = inject(GameService)
}
