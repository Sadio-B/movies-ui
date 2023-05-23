import { Component, Input } from '@angular/core';
import { Movie } from '../shared/models/movie';

@Component({
  selector: 'app-favorites-movies',
  templateUrl: './favorites-movies.component.html',
  styleUrls: ['./favorites-movies.component.scss']
})
export class FavoritesMoviesComponent {
  @Input() moviesInfavorites: Movie[] = [];

  trackByMovieId(_index: number, movie: Movie): number {
    return movie.id;
  }

}
