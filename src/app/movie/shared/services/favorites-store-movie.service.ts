import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable()
export class FavoritesStoreMovieService {
  private favoritesStore: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  favoritesStore$: Observable<Movie[]> = this.favoritesStore.asObservable();
  
  add(movie: Movie): void {
    const favorites: Movie[] = this.favoritesStore.getValue();
    this.favoritesStore.next([...new Set([...favorites, movie])]);
  }

  remove(movieToRemove: Movie): void {
    const filteredPFavorites: Movie[] = this.favoritesStore.getValue().filter(movie => movie.id !== movieToRemove.id);
    this.favoritesStore.next([...filteredPFavorites]);
  }
}
