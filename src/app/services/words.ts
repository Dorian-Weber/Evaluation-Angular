import {Injectable, OnInit, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {wordApiModel} from '../model/wordApiModel';

@Injectable({
  providedIn: 'root',
})
export class Words implements OnInit {
  randomWord$ = signal<string | undefined>(undefined);

  private apiUrl = "https://trouve-mot.fr/api/random "
  constructor(private http: HttpClient) {};

  ngOnInit() {
    this.defineRandomWord();
  }


  // Verifie si le mot a deja été defini, et renvoie le mot aleatoire defini
  getRandomWord(): string | undefined{
    if (this.randomWord$ === undefined) {
      this.defineRandomWord()
    }
    console.log(this.randomWord$());
    return this.randomWord$();
  }

  private defineRandomWord(): void {
    this.getRandomWordApi().subscribe(word => {
      const formattedWord = word[0].name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();

      this.randomWord$.set(formattedWord);
    });
  }

  private getRandomWordApi(): Observable<wordApiModel[]> {
    return this.http.get<wordApiModel[]>(this.apiUrl);
  }

  resetRandomWord(): void {
    this.randomWord$.set(undefined);
    this.defineRandomWord();
  }


  isIncluded(letter: string) : boolean {
    if (this.randomWord$() === undefined) {
      return false;
    }
    return this.randomWord$()!.includes(letter);
  }


  testLetterAgainstWord(letterList: string[]): boolean {
    if (this.randomWord$ === undefined) return false;
    for (let letter of this.randomWord$()!) {
      if (!letterList.includes(letter)) {
        return false
      }
    }
    return true;
  }
}
