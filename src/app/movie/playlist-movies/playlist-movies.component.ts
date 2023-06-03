import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../shared/models/movie';
import { MovieInPlaylist } from '../shared/models/movie-in-playlist';
import { NoteToStarsPipe } from '../../shared/pipes/note-to-stars.pipe';
import { NgFor, NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-playlist-movies',
    templateUrl: './playlist-movies.component.html',
    styleUrls: ['./playlist-movies.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, DatePipe, NoteToStarsPipe]
})
export class PlaylistMoviesComponent {
  @Input() moviesInPlaylistToDisplay: MovieInPlaylist[] = [];
  @Output() updateWatchStatusEvent: EventEmitter<MovieInPlaylist> = new EventEmitter<MovieInPlaylist>();
  @Output() selectMoviesToDisplayEvent: EventEmitter<string> = new EventEmitter<string>();

  trackByMovieId(_index: number, movie: Movie): number {
    return movie.id;
  }

  onClickButtonUpdateWatchStatus(movie: MovieInPlaylist): void {
    movie.wasWatched = !movie.wasWatched;
    this.updateWatchStatusEvent.emit(movie);
  }

  onSelectMoviesToDisplay(event: any): void {
    const value = event.target.value as string
    this.selectMoviesToDisplayEvent.emit(value)
  }
}
