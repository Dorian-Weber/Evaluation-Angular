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

export class Sidebar {
  private letters = inject(Letters);
  private word = inject(Words);
  protected reset = inject(GameService)

  protected lettersList$ = this.letters.getLettersList$
  protected getRandomWord$ = this.word.randomWord$;
}
