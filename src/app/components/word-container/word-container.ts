import {Component, OnInit, signal, inject} from '@angular/core';
import {Words} from '../../services/words';
import {Letters} from '../../services/letters';


@Component({
  selector: 'app-word-container',
  imports: [

  ],
  templateUrl: './word-container.html',
  styleUrl: './word-container.css',
})
// Implementation de l'interface OnInit pour assigner le mot a l'initialisation
export class WordContainer implements OnInit {

  private wordService = inject(Words);
  private letterService = inject(Letters);



  ngOnInit() {
    this.wordService.defineRandomWord()
  }

  lettersList$ = this.letterService.lettersList$;
  currentWord$ = this.wordService.randomWord$;
}
