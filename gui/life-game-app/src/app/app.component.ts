import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BoardComponent } from './board/board.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopBarComponent, BoardComponent, ControlPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'life-game-app';
  isRunning = false;
  columns = 0;
  rows = 0;
  status = '';
  round = 0;
  isResize = false;
  newGame = false;

  setIsRunning(value: boolean) {
    this.isRunning = value;
  }

  setColumns(value: number) {
    this.columns = value;
  }

  setRows(value: number) {
    this.rows = value;
  }

  setStatus(value: string) {
    this.status = value;
  }

  setRound(value: number) {
    this.round = value;
  }

  setIsResize(value: boolean) {
    this.isResize = value;
  }

  setNewGame(value: boolean) {
    this.newGame = value;
  }
}
