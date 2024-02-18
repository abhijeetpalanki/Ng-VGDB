import { Component, OnDestroy, OnInit } from '@angular/core';
import { GaugeModule } from 'angular-gauge';
import { Game } from '../../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { CommonModule, DatePipe } from '@angular/common';
import { GameTabsComponent } from '../game-tabs/game-tabs.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [GaugeModule, DatePipe, CommonModule, GameTabsComponent],
  templateUrl: './details.component.html',
  styles: `
    .details-wrapper {
      min-width: 900px;
      margin: 20px auto;
      position: relative;
    }

    .details::ng-deep mwl-gauge {
      width: 150px;
      height: 150px;
      display: block;
      padding: 10px;
    }

    .details::ng-deep mwl-gauge .dial {
      stroke-width: 10;
    }

    .details::ng-deep mwl-gauge .value {
      stroke-dasharray: none;
      stroke-width: 13;
    }

    .details::ng-deep mwl-gauge .value-text {
      fill: #fff;
      font-weight: bold;
      font-size: 24px;
    }

    .game-gauge {
      position: absolute;
      top: 50px;
      right: 0;
    }

    .game-gauge-label {
      font-size: 20px;
      color: #fff;
      position: relative;
      bottom: 60px;
    }

    .game-banner {
      height: 442px;
      overflow: hidden;
    }

    .game-banner-img {
      width: 100%;
      filter: blur(5px);
    }

    .game-content {
      text-align: center;
      position: relative;
      top: -200px;
    }

    .game-header-title {
      font-size: 70px;
      color: #fff;
      font-weight: bold;
      line-height: 70px;
      white-space: nowrap;
    }

    .game-header-release-date, .game-header-genres {      
      color: #fff;
      font-weight: bold;
    }
  `,
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId!: number;
  game!: Game;
  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: number): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;

        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
