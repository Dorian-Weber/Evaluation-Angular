import {Component, inject, signal} from '@angular/core';
import {Letters} from '../../services/letters';
import {Words} from '../../services/words';
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
