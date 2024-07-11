export interface IGenreList {
  genres: IGenre[];
}
export interface IGenre {
  id: number;
  name: string;
}

export interface IMoviesList {
  page: number;
  results?: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: ICredits;
  genres: IGenre[];
}

export interface ICredits {
  cast: ICast[];
  crew: ICrew[];
}
export interface ICast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
export interface ICrew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
}
