import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Point } from '../shared/point';
import { SquareComponent } from './square/square.component';
import { NgFor } from '@angular/common';
import { LifeGameService } from '../shared/life-game.service';
import { BoardModel } from './board-model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [SquareComponent, NgFor],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {
  @Input() cols = 12;
  @Input() rows = 6;
  @Input() isRunning = false;
  @Input() isResize = false;
  @Input() newGame = false;
  @Output() status = new EventEmitter<string>();
  @Output() round = new EventEmitter<number>();
  @Output() resizeOff = new EventEmitter<boolean>();
  roundNo = 0;
  world: string[][] = [];
  service: LifeGameService = inject(LifeGameService);

  constructor() {
    this.service.newBoard(this.rows, this.cols).then((data: string[][]) => {
      this.world = data;
    });
    setInterval(() => {
      if (this.isResize) {
        const boardModel: BoardModel = new BoardModel();
        boardModel.board = this.world;
        this.isResize = false;
        this.service
          .resizeBoard(boardModel)
          .then((data: string[][]) => {
            this.world = data;
          })
          .catch((error) => console.error(error));
      }
      if (this.newGame) {
        this.newGame = false;
        this.service.newBoard(this.rows, this.cols).then((data: string[][]) => {
          this.world = data;
          this.roundNo = 0;
          this.round.emit(0);
        });
      }
      if (this.isRunning) {
        this.status.emit('Running');
        this.play();
      } else {
        this.status.emit('Stopped');
      }
    }, 2000);
  }

  click(point: Point) {
    this.world[point.getY()][point.getX()] = 'X';
  }

  play() {
    this.roundNo++;
    this.round.emit(this.roundNo);
    const boardModel: BoardModel = new BoardModel();
    boardModel.board = this.world;
    this.service
      .play(boardModel)
      .then((data: string[][]) => {
        this.world = data;
      })
      .catch((error) => console.error(error));
  }
}
