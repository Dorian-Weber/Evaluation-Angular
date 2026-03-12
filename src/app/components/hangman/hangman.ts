import {Component, inject} from '@angular/core';
import {Letters} from '../../services/letters';
import {Words} from '../../services/words';

@Component({
  selector: 'app-hangman',
  imports: [],
  templateUrl: './hangman.html',
  styleUrl: './hangman.css',
})
export class Hangman {

  protected errors : number = 0;
}
