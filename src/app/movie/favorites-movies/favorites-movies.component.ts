import { Component, Input } from '@angular/core';
import { Movie } from '../shared/models/movie';
import { NoteToStarsPipe } from '../../shared/pipes/note-to-stars.pipe';
import { NgFor, DatePipe } from '@angular/common';

@Component({
    selector: 'app-favorites-movies',
    templateUrl: './favorites-movies.component.html',
    styleUrls: ['./favorites-movies.component.scss'],
    standalone: true,
    imports: [NgFor, DatePipe, NoteToStarsPipe]
})
export class FavoritesMoviesComponent {
  @Input() moviesInfavorites: Movie[] = [];

  trackByMovieId(_index: number, movie: Movie): number {
    return movie.id;
  }

}
