import {Injectable} from '@angular/core';
import {GameHistory} from '../model/gameHistory';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {

  // Methode pour stocker et recuperer des nombres
  setNumber(key: string, value: number) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getNumber(key: string): number {
    let number = localStorage.getItem(key);
    if(!number) {
      number = "0";
    }

    return parseInt(number);
  }

  // Methodes pour stocker et recuperer des liste de GameHistory
  setList(key: string, list: GameHistory[]) {
    localStorage.setItem(key, JSON.stringify(list));
  }
  getList(key: string) {
    const list = localStorage.getItem(key);
    return list ? JSON.parse(list) as GameHistory[] : null;
  }
  addItem(key:string, item:GameHistory) {
    let list : GameHistory[] | null = this.getList(key);
    if (!list) {
      list = []
    }
    list.push(item);
    this.setList(key, list);

  }

  // Clear des données stockées generique
  clear(key : string): void {
    localStorage.removeItem(key);
  }
}
