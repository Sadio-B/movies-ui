import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieInPlaylist } from '../models/movie-in-playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistStoreMovieService {

  private playlistStore: BehaviorSubject<MovieInPlaylist[]> = new BehaviorSubject<MovieInPlaylist[]>([]);
  playlistStore$: Observable<MovieInPlaylist[]> = this.playlistStore.asObservable();

  add(movieInPlaylist: MovieInPlaylist): void {
    const playlist: MovieInPlaylist[] = this.playlistStore.getValue();
    this.playlistStore.next([...new Set([...playlist, movieInPlaylist])]);
  }

  remove(movieToRemove: MovieInPlaylist): void {
    const filteredPlaylist: MovieInPlaylist[] = this.playlistStore.getValue().filter(movie => movie.id !== movieToRemove.id);
    this.playlistStore.next([...filteredPlaylist]);
  }

  updateWatchStatus(movieToupdate: MovieInPlaylist): void {
    const playlist: MovieInPlaylist[] = this.playlistStore.getValue();
    let searchedMovie: MovieInPlaylist | undefined = playlist.find(movie => movie.id !== movieToupdate.id);

    if (searchedMovie)
    this.playlistStore.next([...playlist]);
  }
}
