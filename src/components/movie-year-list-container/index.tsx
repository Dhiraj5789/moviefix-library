import { Dispatch, SetStateAction } from "react";
import { IMovie } from "../../apis/interface";
import ScrollComponent from "../infinite-scroll-wrapper";
import InformationCard from "../information-card";
import Loader from "../loader";
import "./styles.css";
import MoviesContainer from "../movies-container";

const MovieListContainer = ({
  data,
  isLoading,
  setLatestYear,
  setPreviousYear,
}: {
  data: {
    year: number;
    data: IMovie[];
  }[];
  isLoading: { previous: boolean; latest: boolean };
  setLatestYear: Dispatch<SetStateAction<number>>;
  setPreviousYear: Dispatch<SetStateAction<number>>;
}) => {
  if (data.length === 0) return <></>;

  function onReachTop() {
    return setPreviousYear((prev) => (prev > 2010 ? prev - 1 : prev));
  }
  function onReachBottom() {
    return setLatestYear((prev) => (prev < 2024 ? prev + 1 : prev));
  }
  return (
    <main>
      <section className="moviesListContainer" style={{ height: "100vh" }}>
        <ScrollComponent onReachBottom={onReachBottom} onReachTop={onReachTop}>
          {data.map(({ year, data }) => {
            return <MoviesContainer key={year} year={year} data={data} />;
          })}
        </ScrollComponent>
      </section>
    </main>
  );
};

export default MovieListContainer;
