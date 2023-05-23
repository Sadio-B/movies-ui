import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class DataMovieService {

  private readonly baseUrl: string = 'api/movies';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<HttpResponse<Movie[]>> {
    return this.http.get<Movie[]>(this.baseUrl, { observe: 'response' });
  }
}
