import {Component, inject} from '@angular/core';
import {Letters} from '../../services/letters';


@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar {
  private letters = inject(Letters);

  lettersList = this.letters.getLettersList

}
