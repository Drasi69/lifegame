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
  @Output() status = new EventEmitter<string>();
  @Output() round = new EventEmitter<number>();
  @Output() resizeOff = new EventEmitter<boolean>();
  roundNo = 0;
  world: string[][] = [];
  service: LifeGameService = inject(LifeGameService);

  constructor() {
    this.service.newBoard(this.rows, this.cols).then((data: string[][]) => {
      this.world = data;
      this.loadWorld();
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
    const nextWorld = this.world.slice();
    let isModified = false;
    let n = 0;
    let deads = [];
    let lives = [];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        n = this.getNeighbours(row, col);
        if (!nextWorld[row][col] && n === 3) {
          lives.push(new Point(row, col));
        } else if (nextWorld[row][col] === 'X' && (n < 2 || n > 3)) {
          deads.push(new Point(row, col));
        }
      }
    }

    if (lives.length > 0 || deads.length > 0) {
      isModified = true;
    }

    for (let i of lives) {
      nextWorld[i.getX()][i.getY()] = 'X';
    }

    for (let i of deads) {
      nextWorld[i.getX()][i.getY()] = '';
    }

    if (isModified) {
      this.world = nextWorld;
    }
  }

  getNeighbours(row: number, col: number) {
    let num = 0;

    if (row > 0) {
      if (col > 0 && this.world[row - 1][col - 1]) {
        num++;
      }
      if (this.world[row - 1][col]) num++;
      if (col < this.cols - 1 && this.world[row - 1][col + 1]) {
        num++;
      }
    }
    if (col > 0 && this.world[row][col - 1]) {
      num++;
    }
    if (col < this.cols - 1 && this.world[row][col + 1]) {
      num++;
    }
    if (row < this.rows - 1) {
      if (col > 0 && this.world[row + 1][col - 1]) {
        num++;
      }
      if (this.world[row + 1][col]) num++;
      if (col < this.rows - 1 && this.world[row + 1][col + 1]) {
        num++;
      }
    }

    return num;
  }

  loadWorld() {
    this.world[0][1] = 'X';
    this.world[0][2] = 'X';
    this.world[1][1] = 'X';
    this.world[1][4] = 'X';
  }
}
