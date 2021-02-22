import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/shared/models/movie.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss']
})
export class SearchingResultPageComponent implements OnInit {

  public movie: Movie;
  public loading$: Observable<boolean>;

  constructor(
    private _movieService: MovieService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loading$ = this._loaderService.loading$;
    this._loaderService.setLoader(true);

    const id = this._activateRoute.snapshot.params.id;
    this._movieService.getMovie(id)
      .pipe(take(1))
      .subscribe((data: Movie) => {
        this._loaderService.setLoader(false);
        if(data.response === "True") {
          this.movie = data;
        } else {
          this._router.navigate(['/search']);
        }
      });
  }

}
