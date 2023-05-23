import { NgModule } from '@angular/core';
import { MovieRoutingModule } from './movie-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MovieComponent } from './movie.component';
import { FavoritesMoviesComponent } from './favorites-movies/favorites-movies.component';
import { PlaylistMoviesComponent } from './playlist-movies/playlist-movies.component';

@NgModule({
  declarations: [MovieRoutingModule.components, MovieComponent, FavoritesMoviesComponent, PlaylistMoviesComponent],
  imports: [
    SharedModule,
    MovieRoutingModule,
  ],
  exports: [
  ]
})
export class MovieModule { }
