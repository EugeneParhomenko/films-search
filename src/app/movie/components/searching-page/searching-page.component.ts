import { Component, OnInit } from '@angular/core';
import { StoreRequest, StoreState, SearchRequest, SearchResults, SearchResultsMovies } from 'src/app/shared/models/search.model';
import { SearchingService } from '../../services/searching.service';
import { take } from 'rxjs/operators';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Observable } from 'rxjs';
import { ResultsStoreService } from '../../services/results-store.service';

@Component({
  selector: 'app-searching-page',
  templateUrl: './searching-page.component.html',
  styleUrls: ['./searching-page.component.scss']
})
export class SearchingPageComponent implements OnInit {

  public searchingResults: SearchResults;
  public totalPages: number;
  public request: SearchRequest;

  public loading$: Observable<boolean>;
  private resultsStore$: Observable<StoreState[]>;

  constructor(
    private _searchingService: SearchingService,
    private _resultsStoreService: ResultsStoreService,
    private _loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loading$ = this._loaderService.loading$;
    this.resultsStore$ = this._resultsStoreService.searchingStore$;
  }

  public search(value: string, page: number = 1): void {
    this.request =  new SearchRequest({
      title: value.trim().replace(/ /g, '-'),
      page
    });
    this._searchInStore(this.request);
    if(!this.searchingResults) {
      this._doSearchingRequest(this.request);
    }
  }

  private _searchInStore(request: SearchRequest): void {
    this.resultsStore$.pipe(take(1))
      .subscribe((data: StoreState[]) => {
        if(data.length) {
          const store: StoreState = data.find(result => result.requestTitle === request.title);
          if(store) {
            const storePage: SearchResultsMovies[] = store.results[request.page];
            if(storePage) {
              this.searchingResults =  {
                response: "True",
                search: storePage,
                totalResults: store.totalResults
              };
            }
            else {
              this.searchingResults =  null;
            }
          }
          else {
            this.searchingResults =  null;
          }
        }
        else {
          this.searchingResults =  null;
        }
      });
  }

  private _doSearchingRequest(request: SearchRequest): void {
    this._loaderService.setLoader(true);
    this._searchingService.search(request)
      .pipe(take(1))
      .subscribe(
        (data: SearchResults) => {
          this.searchingResults = data;
          this.totalPages = data.response === "True" ? Math.ceil(+data.totalResults / 10) : null;
          const storeRequest: StoreRequest = {
            requestTitle: this.request.title,
            totalResults: data.totalResults,
            page: this.request.page,
            results: this.searchingResults.search
          };
          this._resultsStoreService.setResults(storeRequest);
        },
        () => {
          this.totalPages = null;
          this.searchingResults = {
            response: "False",
            error: "Server Error. Please, try later."
          };
        },
        () => this._loaderService.setLoader(false)
      );
  }
}
