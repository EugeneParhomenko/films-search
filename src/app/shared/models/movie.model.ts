export interface MovieResponse {
    Actors?: string,
    Awards?: string,
    BoxOffice?: string,
    Country?: string,
    DVD?: string,
    Director?: string,
    Genre?: string,
    Language?: string,
    Metascore?: string,
    Plot?: string,
    Poster?: string,
    Production?: string,
    Rated?: string,
    Ratings?: {Source: string, Value: string}[]
    Released?: string,
    Response?: string,
    Runtime?: string,
    Title?: string,
    Type?: string,
    Website?: string,
    Writer?: string,
    Year?: string,
    imdbID?: string,
    imdbRating?: string,
    imdbVotes?: string
}

export class MovieRating {
    source: string;
    value: string;

    constructor({source, value}) {
        this.source = source;
        this.value = value;
    }
}

export class Movie {

    actors?: string;
    awards?: string;
    boxOffice?: string;
    country?: string;
    dvd?: string;
    director?: string;
    genre?: string;
    language?: string;
    metascore?: string;
    plot?: string;
    poster?: string;
    production?: string;
    rated?: string;
    ratings?: MovieRating[];
    released?: string;
    response?: string;
    runtime?: string;
    title?: string;
    type?: string;
    website?: string;
    writer?: string;
    year?: string;
    imdbID?: string;
    imdbRating?: string;
    imdbVotes?: string;

    constructor(data?: MovieResponse) {
        this.actors = data?.Actors || '';
        this.awards = data?.Awards || '';
        this.boxOffice = data?.BoxOffice || '';
        this.country = data?.Country || '';
        this.dvd = data?.DVD || '';
        this.director = data?.Director || '';
        this.genre = data?.Genre || '';
        this.language = data?.Language || '';
        this.metascore = data?.Metascore || '';
        this.plot = data?.Plot || '';
        this.poster = data?.Poster || '';
        this.production = data?.Production || '';
        this.rated = data?.Rated || '';
        this.ratings = data?.Ratings.length ? data?.Ratings.map(d => new MovieRating({source: d.Source, value: d.Value})) : [];
        this.released = data?.Released || '';
        this.response = data?.Response || '';
        this.runtime = data?.Runtime || '';
        this.title = data?.Title || '';
        this.type = data?.Type || '';
        this.website = data?.Website || '';
        this.writer = data?.Writer || '';
        this.year = data?.Year || '';
        this.imdbID = data?.imdbID || '';
        this.imdbRating = data?.imdbRating || '';
        this.imdbVotes = data?.imdbVotes || '';
    }

}
