import {effect, Injectable, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {wordApiModel} from '../model/wordApiModel';

// Responsable de distribuer un signal avec un mot aléatoire a trouver
@Injectable({
  providedIn: 'root',
})
export class Words {
  randomWord$ = signal<string>("");

  private apiUrl = "https://trouve-mot.fr/api/random"
  constructor(private http: HttpClient) {};


   defineRandomWord(): void {
    this.getRandomWordApi().subscribe(word => {
      const formattedWord = this.normalizeWord(word[0].name).toUpperCase();
      console.log(formattedWord);
      this.randomWord$.set(formattedWord);
    });
  }

  private getRandomWordApi(): Observable<wordApiModel[]> {
    return this.http.get<wordApiModel[]>(this.apiUrl);
  }

  private normalizeWord(word :string): string {
    // Enleve les accents et les caracteres speciaux
    return word.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace("œ", "oe")
  }

  resetRandomWord(): void {
    this.randomWord$.set("");
    this.defineRandomWord();
  }


  isIncluded(letter: string) : boolean {
    if (this.randomWord$() === "") {
      return false;
    }
    return this.randomWord$()!.includes(letter);
  }


  testLetterAgainstWord(letterList: string[]): boolean {
    if (this.randomWord$() === "") return false;
    for (let letter of this.randomWord$()!.split("")) {
      if (!letterList.includes(letter)) {
        return false
      }
    }
    return true;
  }




}
