import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie.component';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {
  static components = [MovieComponent, MoviesComponent]
}
