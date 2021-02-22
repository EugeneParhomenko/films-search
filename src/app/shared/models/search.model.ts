export interface SearchReponse {
    Response: string, // "True" || "False"
    Search?: SearchResponseMovie[],
    totalResults?: string
    Error?: string
}

export interface SearchResponseMovie {
    Poster?: string,
    Title: string,
    Type?: string,
    Year?: string,
    imdbID: string
}

export class SearchRequest {
    title: string;
    page: number;

    constructor({title, page}) {
        this.page = page || 1;
        this.title = title || '';
    }
}

export class SearchResults {
    response: string; // "True" || "False"
    search?: SearchResultsMovies[];
    totalResults?: string;
    error?: string;

    constructor(data: SearchReponse) {
        this.response = data.Response;
        this.search = data.Search.length ? data.Search.map(d => new SearchResultsMovies(d)) : [];
        this.totalResults = data.totalResults || null;
        this.error = data.Error || null;
    }
}

export class SearchResultsMovies {
    poster?: string;
    title: string;
    type?: string;
    year?: string;
    imdbID: string;

    constructor(data: SearchResponseMovie) {
        this.poster = data.Poster || '';
        this.title = data.Title;
        this.type = data.Type || '';
        this.year = data.Year || '';
        this.imdbID = data.imdbID;
    }
}

export class StoreState {
    requestTitle: string;
    totalResults: string;
    results: {
        [page: number]: SearchResultsMovies[]
    };
}

export class StoreRequest {
    requestTitle: string;
    page: number;
    totalResults: string;
    results: SearchResultsMovies[];
}

