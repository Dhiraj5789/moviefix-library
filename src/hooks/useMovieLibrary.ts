import { useEffect, useState } from "react";
import { IGenre, IMovie } from "../apis/interface";
import { getData, getMoviesList } from "../apis";

export const useMovieLibrary = () => {
  const [selectedGenres, setSelectedGenres] = useState<Set<number>>(new Set());
  const [genresList, setGenresList] = useState<IGenre[] | []>([]);
  const [moviesList, setMoviesList] = useState<
    { year: number; data: IMovie[] }[]
  >([]);
  const [latestYear, setLatestYear] = useState(2012);
  const [previousYear, setPreviousYear] = useState(2012);
  const [isLoading, setIsLoading] = useState({
    previous: false,
    latest: false,
  });

  const onFilterClick = (clickedId: number) => {
    setSelectedGenres((prevState) => {
      const newSet = new Set(prevState);
      if (newSet.has(clickedId)) {
        newSet.delete(clickedId);
        return newSet;
      }
      newSet.add(clickedId);
      return newSet;
    });
  };

  async function procureGenreList() {
    setGenresList((await getData()).genres);
  }

  async function onFilterChange() {
    setMoviesList([]);
    setIsLoading((prev) => {
      return { ...prev, latest: true };
    });
    setLatestYear(2012);
    setPreviousYear(2012);
    const a = await getMoviesList({ year: 2012, genres: selectedGenres });
    if (a) {
      setMoviesList([a]);
    }
    setIsLoading((prev) => {
      return { ...prev, latest: true };
    });
  }

  async function getMoviesByLatestYear() {
    setIsLoading((prev) => {
      return { ...prev, latest: true };
    });
    const a = await getMoviesList({ year: latestYear, genres: selectedGenres });
    setIsLoading((prev) => {
      return { ...prev, latest: false };
    });
    if (a) {
      setMoviesList([...moviesList, a]);
    }
  }

  async function getMoviesByPreviousYear() {
    setIsLoading((prev) => {
      return { ...prev, previous: true };
    });
    const a = await getMoviesList({
      year: previousYear,
      genres: selectedGenres,
    });
    setIsLoading((prev) => {
      return { ...prev, previous: false };
    });
    if (a) {
      setMoviesList([a, ...moviesList]);
    }
  }

  useEffect(() => {
    onFilterChange();
  }, [selectedGenres]);

  useEffect(() => {
    procureGenreList();
  }, []);

  useEffect(() => {
    if (latestYear !== 2012) {
      getMoviesByLatestYear();
    }
  }, [latestYear]);

  useEffect(() => {
    if (previousYear !== 2012) {
      getMoviesByPreviousYear();
    }
  }, [previousYear]);

  return {
    selectedGenres,
    genresList,
    moviesList,
    isLoading,
    onFilterClick,
    setPreviousYear,
    setLatestYear,
  };
};
