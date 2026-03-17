import {effect, inject, Injectable, signal} from '@angular/core';

import {Words} from './words';
import {Keyboard} from './keyboard';
import {toSignal} from '@angular/core/rxjs-interop';
import {GameState} from '../model/gameState';
import {GameHistory} from '../model/gameHistory';
import {LocalStorage} from './local-storage';

// Controle la logique du jeu
@Injectable({
  providedIn: 'root',
})
export class GameService {
  private words = inject(Words);
  private keyboard = inject(Keyboard);
  private localStorage = inject(LocalStorage);

  private record = signal<number>(this.localStorage.getNumber("record"));
  private currentStreak = signal<number>(this.localStorage.getNumber("streak"));

  private _lastLetter = toSignal(this.keyboard.letters$, { initialValue: null });
  lastLetter = signal<string | null>(null)
  lettersList = signal<string[]>([]);

  gameState = signal<GameState>("playing");
  counter = signal<number>(0);

  private correctLetters: string[] = [];

  readonly getLettersList = this.lettersList;
  readonly getCurrentRecord = this.record;

  constructor() {

    effect(() => {
      this.lastLetter.set(this._lastLetter());

    });
    effect(() => {
      const letter = this.lastLetter()?.toUpperCase();
      if (!letter) return;
      if (!this.lettersList().includes(letter)) {
        if (!this.isIncluded(letter)) {
          this.counter.update(count => count + 1);
        } else  if (!this.correctLetters.includes(letter)) {
          this.correctLetters.push(letter);}
        this.lettersList.update(list => [...list, letter]);
      }
    });

    effect(() => {
      if (this.counter() >= 5) {
        this.setLose()
        this.addGameToHistory();
        this.setRecord();
        return;
      }
      if (this.testLetterAgainstWord()) {
        this.setWin()
        this.addGameToHistory();
        this.setRecord();
        return;
      }
    })
    effect(() => {
      console.log(this.gameState())
    })

    effect(() => {



    })
  }

  setWin() {
    this.gameState.set('win')
    this.keyboard.stopListening()
    console.log(this.gameState())
  }

  setLose() {
    this.gameState.set('lose')
    this.keyboard.stopListening()
    console.log(this.gameState())
  }

  setPlaying() {
    this.gameState.set('playing')
    this.keyboard.startListening()
    console.log(this.gameState())
  }

  resetGame() {
    this.setPlaying();
    this.counter.update(count =>count = 0);
    this.lettersList.set([])
    this.lastLetter.set(null)
    this.correctLetters = [];
    this.words.resetRandomWord();
    console.log("reset word")
  }

  defineWord() {
    this.words.defineRandomWord();
  }

  getCurrentWord(): string[] {
    return this.words.randomWord().split("");
  }

  // Verifie si une lettre est correcte (dans le mot à trouver)
  // !!! trop d'appels qui se cumulent exponientellement !!!
  isIncluded(letter: string) : boolean {
    if (this.words.randomWord() === "") {
      return false;
    }
    console.log(letter + " : " + this.words.randomWord()!.includes(letter));
    return this.words.randomWord()!.includes(letter);
  }


  // Verifie si toutes les lettres d'un mot ont été trouvés
  testLetterAgainstWord(): boolean {
    if (this.words.randomWord() === "") return false;
    for (let letter of this.words.randomWord()!.split("")) {
      if (!this.lettersList().includes(letter)) {
        return false
      }
    }
    return true;
  }

  // Verifie si une lettre du mot a été devinée
  isFound(letter: string) : boolean {
    return this.lettersList().includes(letter);
  }

  private endGame(): GameHistory {
    let state: string = "" ;
    if (this.gameState() == "lose") state = "Perdu";
    else if (this.gameState() == "win") state = "Gagné";

    return {
      date: new Date(),
      wordToFind: this.getCurrentWord().join(""),
      lettersFound: this.correctLetters,
      errors: this.counter(),
      state: state,
    }
  }

  addGameToHistory(): void {
    this.localStorage.addItem("history", this.endGame());
  }

  getHistory(): GameHistory[] {
    return <GameHistory[]> this.localStorage.getList("history");
  }

  clearHistory(): void {
    this.localStorage.clear("history");
  }

  setRecord() {
    if (this.gameState() == "win") {
      this.localStorage.setNumber("record", this.record() + 1);
    } else this.localStorage.setNumber("streak", 0);

    if (this.currentStreak > this.record) this.localStorage.setNumber("record", this.localStorage.getNumber("streak"));
  }
}
