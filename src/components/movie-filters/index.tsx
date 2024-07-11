import { IGenre } from "../../apis/interface";
import "./styles.css";

const MovieFilters = ({
  filtersList,
  selectedFilters,
  onFilterClick,
}: {
  filtersList: IGenre[];
  selectedFilters: Set<number>;
  onFilterClick: (clickedId: number) => void;
}) => {
  if (!filtersList.length) return <></>;

  return (
    <nav className="navigation">
      <ul className="navigationItems">
        {filtersList.map(({ id, name }) => (
          <li
            key={id}
            className={selectedFilters.has(id) ? "selectedFilter" : ""}
          >
            <p onClick={() => onFilterClick(id)}>{name}</p>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MovieFilters;
