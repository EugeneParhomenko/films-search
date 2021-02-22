import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MoviePosterComponent } from './components/movie-poster/movie-poster.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FontAwesomeModule
  ],
  providers: [LoaderService],
  declarations: [
    SearchFieldComponent,
    MoviePosterComponent,
    PaginationComponent,
    LoaderComponent
  ],
  exports: [
    SearchFieldComponent,
    MoviePosterComponent,
    PaginationComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
