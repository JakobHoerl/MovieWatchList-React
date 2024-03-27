import ButtonIcon from "./ButtonIcon";

export default function RateMovieList({
  title,
  onClick,
  onClick2,
  watchedMovies,
}) {
  return (
    <>
      <div className="watched-movies">
        <ButtonIcon
          onClick={onClick}
          icon={"×"}
          className={" cross bg"}
        ></ButtonIcon>
        <div className="watched-movies-title">
          <h2>{title}</h2>
        </div>
        <div className="watched-movie-container">
          {watchedMovies.length === 0 && (
            <div className="info-tag">
              <p>Your list is empty.</p>
              <p>Your rated movies will be displayed here.</p>
            </div>
          )}
          {watchedMovies.map((el, i) => (
            <div
              key={i}
              className={
                watchedMovies.length === 1
                  ? "watched-movie double-border"
                  : "watched-movie single-border"
              }
            >
              <div className="watched-movie-img-container">
                <img
                  className="watched-movie-img"
                  src={el.Img}
                  alt={el.Title}
                ></img>
              </div>
              <div className="watched-movie-content">
                <div className="watched-movie-text">
                  <h4>{el.Title}</h4>
                  <ButtonIcon
                    onClick={() => onClick2(el.imdbID)}
                    icon={"×"}
                    id={el.imdbID}
                    className={" cross bg"}
                  ></ButtonIcon>
                </div>
                <div className="rating-year">
                  <p>{el.Year}</p>
                  <span>
                    Your Rating: {el.Rating}
                    <span>★</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
