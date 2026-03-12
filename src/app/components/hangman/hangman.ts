import {Component, inject} from '@angular/core';
import {Letters} from '../../services/letters';
import {Words} from '../../services/words';
import {Error} from '../../services/error';

@Component({
  selector: 'app-hangman',
  imports: [],
  templateUrl: './hangman.html',
  styleUrl: './hangman.css',
})
export class Hangman {
  private errorService = inject(Error);
  protected errors = this.errorService.counter();
}
