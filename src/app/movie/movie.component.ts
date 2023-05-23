import { Component } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { DataMovieService } from './shared/services/data-movie.service';
import { FavoritesStoreMovieService } from './shared/services/favorites-store-movie.service';
import { Movie } from './shared/models/movie';
import { MovieInPlaylist } from './shared/models/movie-in-playlist';
import { MoviesForListToAdd } from './shared/models/movies-for-list-to-add';
import { PlaylistStoreMovieService } from './shared/services/playlist-store-movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  moviesInfavorites: Movie[] = [];
  allMoviesToDisplay: MoviesForListToAdd[] = [];
  moviesInPlaylistToDisplay: MovieInPlaylist[] = [];

  private optionSelectedFromPlaylist: string = 'all';
  private optionSelectedFromMovies: string = 'default';
  private allMovies: MoviesForListToAdd[] = [];
  private moviesInPlaylist: MovieInPlaylist[] = [];
  private unSubscribeSubject: Subject<void> = new Subject<void>();

  constructor(
    private dataMovieService: DataMovieService,
    private favoritesStoreMovie: FavoritesStoreMovieService,
    private playlistStoreMovie: PlaylistStoreMovieService) { }

  ngOnInit(): void {
    this.getAllMovies();
    this.getPlaylist();
    this.getAllFavorites();
  }

  onAddtoFavorites(movie: MoviesForListToAdd): void {
    this.favoritesStoreMovie.add(movie as Movie);
  }

  onAddtoPlaylist(movie: MoviesForListToAdd): void {
    this.playlistStoreMovie.add(movie as unknown as MovieInPlaylist);
  }

  onUpdateWatchStatus(movie: MovieInPlaylist): void {
    this.playlistStoreMovie.updateWatchStatus(movie);
  }

  onSelectMoviesToDisplay(optionSelectedFromPlaylist: string): void {
    this.optionSelectedFromPlaylist = optionSelectedFromPlaylist;
    this.moviesInPlaylistToDisplay = this.getMoviesInPlaylistToDisplay(optionSelectedFromPlaylist, this.moviesInPlaylist);
  }

  onSelectSortToDisplay(optionSelectedFromMovies: string): void {
    this.optionSelectedFromMovies = optionSelectedFromMovies;
    this.allMoviesToDisplay = this.getMoviesISort(optionSelectedFromMovies, this.allMovies)
  }

  private getMoviesInPlaylistToDisplay(optionSelectedFromPlaylist: string, moviesInPlaylist: MovieInPlaylist[]): MovieInPlaylist[] {
    switch (optionSelectedFromPlaylist) {
      case 'already':
        return moviesInPlaylist.filter((movie: MovieInPlaylist) => movie.wasWatched);

      case 'never':
        return moviesInPlaylist.filter((movie: MovieInPlaylist) => !movie.wasWatched);

      case 'all':
      default:
        return [...moviesInPlaylist];
    }
  }

  private getMoviesISort(optionSelectedFromMovies: string, allMovies: MoviesForListToAdd[]): MoviesForListToAdd[] {
    switch (optionSelectedFromMovies) {
      case 'byAscendingDate':
        return [...allMovies.sort((a, b) => (a.releaseDate || 0) - (b.releaseDate || 0))];

      case 'byDescendingDate':
        return [...allMovies.sort((a, b) => (b.releaseDate || 0) - (a.releaseDate || 0))];

      case 'byAscendingNote':
        return [...allMovies.sort((a, b) => (a.note || 0) - (b.note || 0))];

      case 'byDescendingNote':
        return [...allMovies.sort((a, b) => (b.note || 0) - (a.note || 0))];

      case 'default':
      default:
        return [...allMovies];
    }
  }

  private getAllMovies(): void {
    this.dataMovieService.getAll()
      .pipe(map(response => response.body!), takeUntil(this.unSubscribeSubject))
      .subscribe((response: Movie[]) => {
        this.allMovies = response as MoviesForListToAdd[]
        this.allMoviesToDisplay = this.getMoviesISort(this.optionSelectedFromMovies, this.allMovies);
      });
  }

  private getAllFavorites(): void {
    this.favoritesStoreMovie.favoritesStore$
      .pipe(takeUntil(this.unSubscribeSubject))
      .subscribe((favoriteMovies: Movie[]) => {
        this.moviesInfavorites = favoriteMovies;
        this.updateMoviesForListToAddFromFavorites(this.allMovies, favoriteMovies);
      });
  }

  private getPlaylist(): void {
    this.playlistStoreMovie.playlistStore$
      .pipe(takeUntil(this.unSubscribeSubject))
      .subscribe((moviesInPlaylist: MovieInPlaylist[]) => {
        this.moviesInPlaylist = moviesInPlaylist;
        this.moviesInPlaylistToDisplay = this.getMoviesInPlaylistToDisplay(this.optionSelectedFromPlaylist, moviesInPlaylist);
        this.updateMoviesForListToAddFromPlaylist(this.allMovies, moviesInPlaylist);
      });
  }

  private updateMoviesForListToAddFromFavorites(allMovies: MoviesForListToAdd[], moviesInfavorites: Movie[]): void {
    for (const movie of allMovies) {
      movie.isInFavorites = !!moviesInfavorites.find((movieInfavorites: Movie) => movieInfavorites.id === movie.id);
    }
  }

  private updateMoviesForListToAddFromPlaylist(allMovies: MoviesForListToAdd[], moviesInPlaylist: MovieInPlaylist[]): void {
    for (const movie of allMovies) {
      movie.isInPlaylist = !!moviesInPlaylist.find((movieInfPlaylist: Movie) => movieInfPlaylist.id === movie.id);
    }
  }

  ngOnDestroy(): void {
    this.unSubscribeSubject.next();
    this.unSubscribeSubject.complete();
  }
}
