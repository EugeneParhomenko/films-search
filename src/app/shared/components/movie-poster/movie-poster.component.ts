import { Component, Input, OnInit } from '@angular/core';
import { SearchResultsMovies } from '../../models/search.model';

@Component({
  selector: 'app-movie-poster',
  templateUrl: './movie-poster.component.html',
  styleUrls: ['./movie-poster.component.scss']
})
export class MoviePosterComponent implements OnInit {

  @Input() movie: SearchResultsMovies;

  constructor() { }

  ngOnInit() {
  }

}
