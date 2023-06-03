import { Routes } from '@angular/router';
import { DataMovieService } from './shared/services/data-movie.service';
import { FavoritesStoreMovieService } from './shared/services/favorites-store-movie.service';
import { PlaylistStoreMovieService } from './shared/services/playlist-store-movie.service';

export default [
  {
    path: '',
    loadComponent: () => import('./movie.component').then(module => module.MovieComponent),
    providers: [DataMovieService, FavoritesStoreMovieService, PlaylistStoreMovieService],
    title: 'Movies'
  },
] as Routes;
