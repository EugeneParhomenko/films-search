import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { SearchReponse, SearchRequest, SearchResults } from "../../shared/models/search.model";
import { map } from "rxjs/operators";

@Injectable()
export class SearchingService {

    constructor(private _http: HttpClient) {}

    search(request: SearchRequest): Observable<SearchResults> {
        return this._http.get<SearchReponse>(this._url(request))
        .pipe(map((response: SearchReponse) => new SearchResults(response)));
    }

    private _url(request: SearchRequest): string {
        return `${environment.API_URL}?apikey=${environment.API_KEY}&s=${request.title}&page=${request.page}&r=json&plot=full`;
    }

}
