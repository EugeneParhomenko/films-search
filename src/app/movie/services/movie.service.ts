import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Movie, MovieResponse } from "../../shared/models/movie.model";
import { map } from "rxjs/operators";

@Injectable()
export class MovieService {

    constructor(private _http: HttpClient) {}

    getMovie(id: string): Observable<Movie> {
        id = id.trim();
        return this._http.get<MovieResponse>(`${environment.API_URL}?i=${id}&r=json&plot=full&apikey=${environment.API_KEY}`)
            .pipe(map((movie: MovieResponse) => new Movie(movie)));
    }

}
