import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css',
})
export class TopBarComponent {
  @Output() run = new EventEmitter<boolean>();
  @Output() newGame = new EventEmitter<boolean>();

  start() {
    this.newGame.emit(false);
    this.run.emit(true);
  }

  stop() {
    this.newGame.emit(false);
    this.run.emit(false);
  }

  reset() {
    this.newGame.emit(false);
    this.run.emit(false);
    this.newGame.emit(true);
  }
}
