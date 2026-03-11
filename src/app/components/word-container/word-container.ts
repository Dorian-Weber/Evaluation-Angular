import {Component, Inject, OnInit, signal} from '@angular/core';
import {Words} from '../../services/words';
import {NgForOf} from '@angular/common';

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
  guessedLetters: string[] = [];
  constructor(private wordService: Words) {}

  // Assigne un mot aléatoire grace au service
  ngOnInit(): void {
    this.currentWord.set(this.wordService.getRandomWord().split(""));
    console.log(this.currentWord());
  }

  addToGuessedLetters(letter: string): void {
    this.guessedLetters.push(letter);
  }

  resetGuessedLetters(): void {
    this.guessedLetters = [];
  }
}
