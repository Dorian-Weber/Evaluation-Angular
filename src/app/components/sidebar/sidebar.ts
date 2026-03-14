import {Component, inject} from '@angular/core';
import {Letters} from '../../services/letters';
import {Words} from '../../services/words';
import {NgClass} from '@angular/common';
import {GameService} from '../../services/game-service';


@Component({
  selector: 'app-sidebar',
  imports: [
    NgClass
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

// !!! Possible migration de la logique du html vers service !!!
export class Sidebar {
  protected gameService = inject(GameService)
}
