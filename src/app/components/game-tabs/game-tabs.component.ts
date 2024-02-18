import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { Game } from '../../models';

@Component({
  selector: 'app-game-tabs',
  standalone: true,
  imports: [CommonModule, TabsModule],
  templateUrl: './game-tabs.component.html',
  styles: `
    .game-tabs {
      background: rgb(63 81 181 / 61%);
      color: #fff;
      text-align: left;
      max-width:1200px;
      margin: 40px auto;
      padding: 10px;
    }

    .game-tabs-par {
      padding: 20px 20px 0 20px;
      margin-bottom: 0;
    }

    .game-tabs-link {
      color: #fff;
    }

    .game-tab-votes {
      margin-left: 20px;
      display: flex;
    }

    .game-votes-count {
      margin-left: 5px;
      margin-right: 10px;
      vertical-align: center;
    }

    .game-description {
      padding: 20px;
    }

    .game-screenshot {
      margin-top: 5px;
      width: calc(50% - 10px);
    }

    .game-screenshot:nth-child(even) {
      margin-left: 10px;
    }

    .game-trailer {
      width: 100%;
      margin: 20px 0;
    }
  `,
})
export class GameTabsComponent {
  @Input() game!: Game;
}
