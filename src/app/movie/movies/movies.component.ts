import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoviesForListToAdd } from '../shared/models/movies-for-list-to-add';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  @Input() allMoviesToDisplay: MoviesForListToAdd[] = [];
  @Output() addToFavoritesEvent: EventEmitter<MoviesForListToAdd> = new EventEmitter<MoviesForListToAdd>();
  @Output() addtoPlaylistEvent: EventEmitter<MoviesForListToAdd> = new EventEmitter<MoviesForListToAdd>();
  @Output() selectSortToDisplayEvent: EventEmitter<string> = new EventEmitter<string>();


  trackByMovieId(_index: number, movie: MoviesForListToAdd) {
    return movie.id;
  }

  onClickButtonAddtoFavorites(movie: MoviesForListToAdd): void {
    this.addToFavoritesEvent.emit(movie);
  }

  onClickButtonAddtoPlaylist(movie: MoviesForListToAdd): void {
    this.addtoPlaylistEvent.emit(movie);
  }

  onSelectSortToDisplay(event: any): void {
    const value = event.target.value as string
    this.selectSortToDisplayEvent.emit(value);
  }
}
