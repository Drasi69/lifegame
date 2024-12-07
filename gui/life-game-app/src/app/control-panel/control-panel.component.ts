import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LifeGameService } from '../shared/life-game.service';
import { ControlPanelModel } from './control-panel-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [MatSlideToggleModule, FormsModule],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css',
})
export class ControlPanelComponent implements AfterViewInit {
  @Input() round = 0;
  @Input() status = 'Stopped';
  @Output() columns = new EventEmitter<number>();
  @Output() rows = new EventEmitter<number>();
  @Output() isResize = new EventEmitter<boolean>();
  service: LifeGameService = inject(LifeGameService);
  infinite: boolean = false;
  large: boolean = false;
  cs: number = 0;
  rs: number = 0;
  cp: ControlPanelModel = Inject(ConstantSourceNode);

  constructor() {}
  ngAfterViewInit(): void {
    this.service.getControlPanel().then((resp: ControlPanelModel) => {
      this.setProperties(resp);
    });
  }

  largeChange() {
    this.isResize.emit(false);
    this.cp.large = this.large;
    this.service.setControlPanel(this.cp).then((resp: ControlPanelModel) => {
      this.setProperties(resp);
      this.isResize.emit(true);
    });
  }

  infiniteChange() {
    this.cp.infinite = this.infinite;
    this.service.setControlPanel(this.cp).then((resp: ControlPanelModel) => {
      this.setProperties(resp);
    });
  }

  setProperties(resp: ControlPanelModel) {
    this.infinite = resp.infinite;
    this.large = resp.large;
    this.columns.emit(resp.cols);
    this.rows.emit(resp.rows);
    this.cs = resp.cols;
    this.rs = resp.rows;
    this.cp = resp;
  }
}
