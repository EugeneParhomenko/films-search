import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchingPageComponent } from './components/searching-page/searching-page.component';
import { SearchingResultPageComponent } from './components/movie-page/movie-page.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchingPageComponent,
    children: [
      {
        path:'search/:page', //:id is dynamic here
        component: SearchingResultPageComponent
      }
    ]
  },
  {
    path: 'result/:id',
    component: SearchingResultPageComponent
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
