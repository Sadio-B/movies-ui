export class MoviesForListToAdd {
    id!: number;
    isInFavorites: boolean = false;
    isInPlaylist: boolean = false;
    note: number = 0;
    poster: string = ''
    releaseDate: number | undefined;
    title: string = '';
}
