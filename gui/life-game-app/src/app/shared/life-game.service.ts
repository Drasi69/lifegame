import { Injectable } from '@angular/core';
import { ControlPanelModel } from '../control-panel/control-panel-model';
import { BoardModel } from '../board/board-model';

@Injectable({
  providedIn: 'root',
})
export class LifeGameService {
  private url: string = 'http://localhost:8081/lifegame';

  constructor() {}

  async newBoard(row: number, col: number) {
    const service: string = '/board/new';
    const params = new URLSearchParams();
    params.append('rows', row.toString());
    params.append('cols', col.toString());

    const data = await fetch(`${this.url}${service}?${params}`, {
      headers: { Accept: 'application/json' },
    });
    return (await data.json()) ?? [];
  }

  async getControlPanel() {
    const service: string = '/controlpanel';

    const data = await fetch(`${this.url}${service}`, { headers: { Accept: 'application/json' } });
    return (await data.json()) ?? [];
  }

  async setControlPanel(cp: ControlPanelModel) {
    const service: string = '/controlpanel';
    const param = new URLSearchParams();
    param.append('infinite', cp.infinite.toString());
    param.append('large', cp.large.toString());

    const data = await fetch(`${this.url}${service}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: param,
    });
    return (await data.json()) ?? [];
  }

  async resizeBoard(board: BoardModel) {
    const service: string = '/board/resize';

    const data = await fetch(`${this.url}${service}`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(board),
    });
    return (await data.json()) ?? [];
  }
}
