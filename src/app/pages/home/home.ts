import { Component } from '@angular/core';
import {GameOver} from '../../components/game-over/game-over';
import {Hangman} from '../../components/hangman/hangman';
import {Sidebar} from '../../components/sidebar/sidebar';
import {WordContainer} from '../../components/word-container/word-container';

@Component({
  selector: 'app-home',
  imports: [
    GameOver,
    Hangman,
    Sidebar,
    WordContainer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
