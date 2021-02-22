import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StoreRequest, StoreState } from "src/app/shared/models/search.model";

@Injectable()
export class ResultsStoreService {

    public searchingStore$ = new BehaviorSubject<StoreState[]>([]);
    private _store: StoreState[] = [];

    constructor() {}

    public setResults(data: StoreRequest): void {
        const searchRequest = this._store.find(result => result.requestTitle === data.requestTitle);
        if(searchRequest) {
            this._store.map((result: StoreState) => {
                if(result.requestTitle !== data.requestTitle) {
                    return result;
                } else {
                    result.results[data.page] = data.results;
                    return result;
                }
            });
        }
        else {
            this._store.push({
                requestTitle: data.requestTitle,
                totalResults: data.totalResults,
                results: {
                    [data.page]: data?.results
                }
            });
        }
        this.searchingStore$.next(this._store);
    }

}
