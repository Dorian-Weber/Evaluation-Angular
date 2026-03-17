import {Component, effect, ElementRef, inject, ViewChild, viewChild} from '@angular/core';
import {GameService} from '../../services/game-service';


@Component({
  selector: 'app-game-over',
  imports: [],
  templateUrl: './game-over.html',
  styleUrl: './game-over.css',
})
export class GameOver {

  protected gameService= inject(GameService);
  private modalState: boolean = false;

@ViewChild('gameOverDialog') dialog! : ElementRef<HTMLDialogElement>;

  // constructeur qui va vérifier et écouter l'état de gameState pour ouvrir ou non la boite de dialog
  constructor() {
    effect(() => {
      if (this.gameService.gameState() === 'lose' || this.gameService.gameState() === 'win') {
        this.dialog.nativeElement.showModal();
        this.modalState = true;
      } else if (this.modalState) {
        this.closeModal()
      }
    });

  }
  closeModal(): void {
    this.dialog.nativeElement.close();
    //this.gameService.resetGame();
    this.modalState = false;
  }

  getCurrentWordJoin(): string {
    return this.gameService.getCurrentWord().join("")
  }



}
