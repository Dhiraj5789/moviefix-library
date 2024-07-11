import "./App.css";
import MovieFilters from "./components/movie-filters";
import { useMovieLibrary } from "./hooks/useMovieLibrary";
import MovieListContainer from "./components/movie-year-list-container";
import { PAGE_TITLE } from "./apis/constants";
import { useRef } from "react";

function App() {
  // w200 is dynamic. other options --> w200, w500, original
  // https://image.tmdb.org/t/p/w200/bnbzEKX9LgDuJ0VBGm5d60mKDaR.jpg

  const {
    selectedGenres,
    moviesList,
    genresList,
    isLoading,
    onFilterClick,
    setLatestYear,
    setPreviousYear,
  } = useMovieLibrary();

  return (
    <div className="app">
      <header className="appHeader">
        <h1>{PAGE_TITLE}</h1>
        <MovieFilters
          filtersList={genresList}
          selectedFilters={selectedGenres}
          onFilterClick={onFilterClick}
        />
      </header>
      <MovieListContainer
        data={moviesList}
        isLoading={isLoading}
        setLatestYear={setLatestYear}
        setPreviousYear={setPreviousYear}
      />
    </div>
  );
}

export default App;
