import { IMovie } from "../../apis/interface";
import "./styles.css";

const InformationCard = ({
  original_title,
  id,
  poster_path,
  overview,
  credits,
  genres,
}: Pick<
  IMovie,
  "original_title" | "id" | "poster_path" | "overview" | "credits" | "genres"
>) => {
  const cast = `${credits.cast[0].name}, ${credits.cast[1].name}`;
  const director = credits.crew.find(
    (a) => a.job === "Director"
  )?.original_name;
  const genresName = genres.map((a) => a.name).toString();
  return (
    <div key={id} className="cardContainer">
      <img
        src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
        alt={`${original_title} Poster`}
      />
      <div>
        <h3>{original_title}</h3>
        <p>
          <b>Directed By:</b> {director}
        </p>
        <div className="descriptionBox">
          <b>About</b>
          <p>{overview}</p>
        </div>
        <p>
          <b>Starring:</b> {cast}
        </p>
        <p>
          <b>Genre:</b> {genresName}
        </p>
      </div>
    </div>
  );
};

export default InformationCard;
