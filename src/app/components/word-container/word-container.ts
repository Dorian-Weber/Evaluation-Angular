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
  currentWord = signal<string[]>([]);
  private wordService = inject(Words);
  private letterService = inject(Letters);

  lettersList = this.letterService.lettersList$;

  // Assigne un mot aléatoire grace au service
  ngOnInit(): void {
    //this.currentWord.set(this.wordService.getRandomWord().split(""));
    this.wordService.getRandomWordApi().subscribe((data : any) => {
      console.log(data[0].name)
      this.currentWord.set(data[0].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(""));
      console.log(this.currentWord());
    })

  }

}
