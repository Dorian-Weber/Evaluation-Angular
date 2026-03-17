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
  // Injection de dependance
  private words = inject(Words);
  private keyboard = inject(Keyboard);
  private localStorage = inject(LocalStorage);

  // Creation des signaux
  private record = signal<number>(0);
  private currentStreak = signal<number>(0);

  private _lastLetter = toSignal(this.keyboard.letters$, { initialValue: null });
  lastLetter = signal<string | null>(null)
  lettersList = signal<string[]>([]);

  gameState = signal<GameState>("playing");
  counter = signal<number>(0);

  // getters de signaux
  readonly getLettersList = this.lettersList;
  getRecord = this.record.asReadonly();
  getCurrentStreak = this.currentStreak.asReadonly();

  // Liste de lettres trouvées
  private correctLetters: string[] = [];


  constructor() {
    effect(() => {
      this.record.set(this.localStorage.getNumber("record"))
      this.currentStreak.set(this.localStorage.getNumber("streak"))
    })
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
      if (this.gameState() !== "playing") return;
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
  }

  defineWord() {
    this.words.defineRandomWord();
  }

  getCurrentWord(): string[] {
    return this.words.randomWord().split("");
  }

  // Verifie si une lettre est correcte (dans le mot à trouver)
  isIncluded(letter: string) : boolean {
    if (this.words.randomWord() === "") {
      return false;
    }
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

  // Etat du jeu
  setPlaying() {
    this.gameState.set('playing')
    this.keyboard.startListening()
  }

  setWin() {
    this.gameState.set('win')
    this.keyboard.stopListening()
  }

  setLose() {
    this.gameState.set('lose')
    this.keyboard.stopListening()
  }

  resetGame() {
    this.setPlaying();
    this.counter.update(count =>count = 0);
    this.lettersList.set([])
    this.lastLetter.set(null)
    this.correctLetters = [];
    this.words.resetRandomWord();
  }

  // gestion du storage
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
    this.record.set(0);
    this.localStorage.clear("record");
    this.currentStreak.set(0);
    this.localStorage.clear("streak");
  }

  setRecord() {
    if (this.gameState() == "win") {
      this.currentStreak.update(count => count + 1);
    } else if (this.gameState() == "lose") {
      this.currentStreak.set(0);
    }
    if (this.currentStreak() > this.record()) this.record.set(this.currentStreak());

    this.localStorage.setNumber("record", this.record());
    this.localStorage.setNumber("streak", this.currentStreak());
  }
}
