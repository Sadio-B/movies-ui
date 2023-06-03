import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoviesForListToAdd } from '../shared/models/movies-for-list-to-add';
import { NoteToStarsPipe } from '../../shared/pipes/note-to-stars.pipe';
import { NgFor, NgIf, DatePipe } from '@angular/common';


@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, DatePipe, NoteToStarsPipe]
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
