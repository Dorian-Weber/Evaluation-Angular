import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Score} from './components/score/score';
import {WordContainer} from './components/word-container/word-container';
import {Hangman} from './components/hangman/hangman';
import {GameOver} from './components/game-over/game-over';
import {Sidebar} from './components/sidebar/sidebar';
import {GameService} from './services/game-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Score, WordContainer, Hangman, GameOver, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Pendu_Angular');
  protected gameService = inject(GameService);

  ngOnInit() {
    this.gameService.defineWord();
  }
}
