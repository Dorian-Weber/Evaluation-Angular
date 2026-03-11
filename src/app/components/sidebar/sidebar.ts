import {Component, signal, effect, inject} from '@angular/core';
import { Keyboard } from '../../services/keyboard'
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  private keyboard = inject(Keyboard);

  lastLetter = toSignal(this.keyboard.letters$, { initialValue: null });
  lettersList = signal<string[]>([]);

  constructor() {
    effect(() => {
      const letter = this.lastLetter();
      if (letter) {
        this.lettersList.update(list => [...list, letter]);
        console.log(this.lettersList())
      }
    });
  };

  }
