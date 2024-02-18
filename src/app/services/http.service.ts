import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams()
      .set('key', env.API_KEY)
      .set('ordering', ordering);

    if (search) {
      params = new HttpParams()
        .set('key', env.API_KEY)
        .set('ordering', ordering)
        .set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: number): Observable<Game> {
    const gameInfoRequest = this.http.get(
      `${env.BASE_URL}/games/${id}?key=${env.API_KEY}`
    );
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies?key=${env.API_KEY}`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots?key=${env.API_KEY}`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
