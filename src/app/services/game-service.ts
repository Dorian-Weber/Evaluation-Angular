import {effect, inject, Injectable, signal} from '@angular/core';
import {Error} from './error';
import {Letters} from './letters';
import {Words} from './words';
import {Keyboard} from './keyboard';
import {toSignal} from '@angular/core/rxjs-interop';

// Controle la logique du jeu
@Injectable({
  providedIn: 'root',
})
export class GameService {
  private words = inject(Words);
  private keyboard = inject(Keyboard);

  private _lastLetter$ = toSignal(this.keyboard.letters$, { initialValue: null });
  lastLetter$ = signal<string | null>(null)
  lettersList$ = signal<string[]>([]);

  gameState$ = signal<'playing' | 'win' | 'lose'>('playing');
  counter$ = signal(0);

  readonly getLastLetter$ = this.lastLetter$;
  readonly getLettersList$ = this.lettersList$;

  constructor() {
  // Pourquoi ajouter celui la ? il est deja ligne 17 ?
    effect(() => {
      this.lastLetter$.set(this._lastLetter$());

    });
    effect(() => {
      const letter = this.lastLetter$()?.toUpperCase();
      if(letter)
        if (!this.lettersList$().includes(letter)) {
          this.lettersList$.update(list => [...list, letter]);
        }
    });
    effect(() => {
      const letter = this.lastLetter$()?.toUpperCase()
      if (!letter) return;
      if (!this.isIncluded(letter)){
        this.counter$.update(count => count + 1);
      }
    });
    effect(() => {
      if (this.counter$() >= 5) {
        this.setLose()
        return;
      }
      if (this.testLetterAgainstWord()) {
        this.setWin()
        return;
      }
    })
  }

  setWin() {
    this.gameState$.set('win')
    console.log(this.gameState$())
  }

  setLose() {
    this.gameState$.set('lose')
    console.log(this.gameState$())
  }

  setPlaying() {
    this.gameState$.set('playing')
    console.log(this.gameState$())
  }

  resetGame() {
    this.setPlaying();
    this.counter$.update(count =>count = 0);
    this.lettersList$.set([])
    this.lastLetter$.set(null)
    // TODO si dialog fermer
    this.words.resetRandomWord();
  }

  defineWord() {
    this.words.defineRandomWord();
  }

  getCurrentWord(): string[] {
    return this.words.randomWord$().split("");
  }

  // Verifie si une lettre est correcte (dans le mot à trouver)
  // !!! trop d'appels qui se cumulent exponientellement !!!
  isIncluded(letter: string) : boolean {
    if (this.words.randomWord$() === "") {
      return false;
    }
    console.log(letter + " : " + this.words.randomWord$()!.includes(letter));
    return this.words.randomWord$()!.includes(letter);
  }


  // Verifie si toutes les lettres d'un mot ont été trouvés
  testLetterAgainstWord(): boolean {
    if (this.words.randomWord$() === "") return false;
    for (let letter of this.words.randomWord$()!.split("")) {
      if (!this.lettersList$().includes(letter)) {
        return false
      }
    }
    return true;
  }

  // Verifie si une lettre du mot a été devinée
  isFound(letter: string) : boolean {
    return this.lettersList$().includes(letter);
  }



}
