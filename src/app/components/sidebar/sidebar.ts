import {Component, signal, effect, inject} from '@angular/core';
import {Letters} from '../../services/lettres';


@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar {
  private letters = inject(Letters);

  lastLetter =this.letters.getLastLetter
  lettersList = this.letters.getLettersList

}
