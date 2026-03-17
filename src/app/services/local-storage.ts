import {Injectable} from '@angular/core';
import {GameHistory} from '../model/gameHistory';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {

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

  clear(key : string): void {
    localStorage.removeItem(key);
  }
}
