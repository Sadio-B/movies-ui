import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Movie } from '../models/movie';

@Injectable()
export class DataMovieService {

  private readonly baseUrl: string = 'api/movies';
  private readonly http: HttpClient = inject(HttpClient);

  getAll(): Observable<HttpResponse<Movie[]>> {
    return this.http.get<Movie[]>(this.baseUrl, { observe: 'response' });
  }
}
