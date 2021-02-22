import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchingPageComponent } from './components/searching-page/searching-page.component';
import { SearchingResultPageComponent } from './components/movie-page/movie-page.component';
import { SharedModule } from '../shared/shared.module';
import { SearchingService } from './services/searching.service';
import { MovieService } from './services/movie.service';
import { MovieRoutingModule } from './movie-routing.module';
import { ResultsStoreService } from './services/results-store.service';


@NgModule({
  imports: [
    CommonModule,
    MovieRoutingModule,
    SharedModule
  ],
  providers: [SearchingService, MovieService, ResultsStoreService],
  declarations: [
    SearchingPageComponent,
    SearchingResultPageComponent
  ],
  exports: [
    SearchingPageComponent,
    SearchingResultPageComponent
  ]
})
export class MovieModule { }
