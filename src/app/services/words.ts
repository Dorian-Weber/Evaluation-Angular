import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Words {
  private randomWord: string | undefined;

  private readonly wordList: string[] = [
  "arbre","balai","banc","bille",
  "bol","livre","bois","bras",
  "bus","cadeau","cafe","carte",
  "chat","chemin","ciel","clou",
  "coin","collier","copain","craie",
  "cube","dent","dos","dossie",
  "eau","ecran","etagere","ete",
  "etui","feu","fil","fleur",
  "foin","four","fruit","jeu",
  "jouet","jupe","lac","lait",
  "lampe","lit","livre","loupe",
  "main","marteau","matin","mur",
  "neige","nid","nuit","oeil",
  "oiseau","pain","papier","parc",
  "pas","peau","pied","pile",
  "pipe","plan","plat","pli",
  "pont","porte","pot","pouce",
  "prix","puit","rail","rat",
  "reve","rideau","riz","robinet",
  "roi","rose","route","sac",
  "sable","sel","sirop","sol",
  "son","sou","soupe","table",
  "tapis","tas","taupe","tige",
  "toit","train","trou","tube",
  "valise","vent","verre","vin",
  "vis","voie","vol","voile"
  ]

  private defineRandomWord(): void {
    let index: number = Math.floor(Math.random() * this.wordList.length);
    this.randomWord = this.wordList[index];
  }

  private resetRandomWord(): void {
    this.randomWord = undefined;
  }

  // Verifie si le mot a deja été defini, et renvoie le mot aleatoire defini
  getRandomWord(): string {
    if (!this.randomWord) {
      this.defineRandomWord()
    }
    return <string>this.randomWord;
  }

  isIncluded(letter: string) : boolean {
    if (this.randomWord === undefined) {
      return false;
    }
    return this.randomWord.includes(letter);
  }
}
