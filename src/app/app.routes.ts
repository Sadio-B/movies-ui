import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'movies',
      loadChildren: () => import('./movie/movie.routes'),
    },
    {
      path: '**',
      redirectTo: 'movies',
      pathMatch: 'full'
    },
  ];