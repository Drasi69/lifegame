import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Point } from '../../shared/point';

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [],
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent {
  @Input() val!: string;
  @Input() row: number = -1;
  @Input() col: number = -1;
  @Output() point = new EventEmitter<Point>();

  click() {
    this.point.emit(new Point(this.col, this.row));
  }

}
