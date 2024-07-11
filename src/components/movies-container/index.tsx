import { IMovie } from "../../apis/interface";
import InformationCard from "../information-card";
import "./styles.css";

const MoviesContainer = ({ year, data }: { year: number; data: IMovie[] }) => {
  return (
    <div className="moviesByYearContainer" id={`${year}`}>
      <h2>{year}</h2>
      <div className="moviesCardContainer">
        {data.map(({ id, title, poster_path, overview, credits, genres }) => (
          <InformationCard
            key={title}
            original_title={title}
            id={id}
            poster_path={poster_path}
            overview={overview}
            credits={credits}
            genres={genres}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesContainer;
