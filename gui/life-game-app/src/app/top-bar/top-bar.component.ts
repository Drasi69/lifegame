import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  @Output() run = new EventEmitter<boolean>();

  start() {
    this.run.emit(true);
  }

  stop() {
    this.run.emit(false);
  }

}
