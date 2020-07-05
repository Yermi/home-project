import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../app.consts';
import { Movie } from '../Models/Movie';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  Catagories: string[];
  Movies: Array<Movie>;

  constructor(private http: HttpClient) { }

  GetAllCatagories() {
    this.http.get(Globals.BASE_URL + '/api/categories').subscribe(
      ((catagories: string[]) => {
        this.Catagories = catagories;
        console.log(this.Catagories);

      }),
      ((error) => {
        console.log(error);
      })
    )
  }

  GetMovies(catagory: string): Observable<Movie[]> {
    return this.http.get(Globals.BASE_URL + '/api/movies?catagory=' + catagory).pipe(tap((movies: Movie[]) => {
      this.Movies = movies;
    }))
  }

  AddMovie(movie: Movie) {
    var body = { movie: movie }
    return this.http.post(Globals.BASE_URL + '/api/movie', body, { responseType: 'text' })
  }

  Remove(index) {
    var name = this.Movies[index].Name;
    return this.http.delete(Globals.BASE_URL + '/api/movie?name=' + name, { responseType: 'text' })
  }
}
