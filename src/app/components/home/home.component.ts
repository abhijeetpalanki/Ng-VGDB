import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponse, Game } from '../../models';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styles: `
    .filters {
      max-width: 1200px;
      margin: 20px auto;
      padding-left: 20px;
    }

    .games {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      min-width: 1200px;
      margin: 20px auto;
    }

    .game {
      width: 280px;
      margin: 10px;
      height: 330px;
      overflow: hidden;
      background-color: #202020;
      transition-duration: 0.3s;
      cursor: pointer;
      border-radius: 5px;
      box-shadow: 4px 3px 8px 0px rgb(200 152 44 / 0%)
    }

    .game:hover {
      box-shadow: 4px 3px 11px 6px rgb(200 152 44 / 46%);
      transform: translateY(-3px);
    }

    .game-thumb-container {
      background-color: #000;
      position: relative;
      height: 172px;
      color: #fff;
      text-align: center;
    }

    .game-thumb-container img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      height: 172px;
      object-fit: cover;
    }
  `,
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string = '';
  public games: Array<Game> = [];
  private routeSub: Subscription | undefined;
  private gameSub: Subscription | undefined;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('-added', params['game-search']);
      } else {
        this.searchGames('-added');
      }
    });
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
      });
  }

  openGameDetails(id: number): void {
    this.router.navigate(['details', id]);
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
