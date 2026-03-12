import {Component, inject} from '@angular/core';
import {Error} from '../../services/error';

@Component({
  selector: 'app-score',
  imports: [],
  templateUrl: './score.html',
  styleUrl: './score.css',
})
export class Score {
  private errorService = inject(Error);

  protected counter = this.errorService.counter$;
}
