import {Component, inject} from '@angular/core';
import {Error} from '../../services/error';

@Component({
  selector: 'app-hangman',
  imports: [],
  templateUrl: './hangman.html',
  styleUrl: './hangman.css',
})
export class Hangman {
  private errorService = inject(Error);
  protected errors = this.errorService.counter$;
}
