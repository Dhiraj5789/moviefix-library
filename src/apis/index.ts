import axios from "axios";
import {
  API_KEY,
  DISCOVER_MOVIES_API,
  GENRE_LIST_API,
  MOVIE_DETAILS_API,
} from "./constants";

export async function getData() {
  const options = {
    method: "GET",
    url: GENRE_LIST_API,
    params: { language: "en", api_key: API_KEY },
    headers: { accept: "application/json" },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMoviesList({
  year,
  genres,
}: {
  year: number;
  genres: Set<number>;
}) {
  try {
    const response = await axios.request(
      getDiscoverRequestOptions(genres, year)
    );

    const finalData = await Promise.all(
      response.data.results.map(async (movie: any) => {
        const id = movie.id;
        const res = await axios.request(getMovieDetailsOptions(id));
        return { ...movie, credits: res.data.credits, genres: res.data.genres };
      })
    );

    return { year, data: finalData };
  } catch (error) {
    console.error(error);
  }
}

function getDiscoverRequestOptions(genres: Set<number>, year: number) {
  return {
    method: "GET",
    url: DISCOVER_MOVIES_API,
    params: {
      language: "en",
      api_key: API_KEY,
      page: "1",
      sort_by: "popularity.desc",
      primary_release_year: year,
      "vote_count.gte": 100,
      with_genres: Array.from(genres).toString(),
    },
    headers: { accept: "application/json" },
  };
}

function getMovieDetailsOptions(id: any) {
  return {
    method: "GET",
    url: `${MOVIE_DETAILS_API}/${id}`,
    params: {
      language: "en-US",
      append_to_response: "credits",
      api_key: API_KEY,
    },
    headers: { accept: "application/json" },
  };
}
