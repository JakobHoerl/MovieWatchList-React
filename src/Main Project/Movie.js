export default function Movie({ movie, onClick = null, children }) {
  const handleClick = () => {
    if (onClick) onClick(movie);
  };
  return (
    <div onClick={handleClick} className="movie-found">
      <div className="img-box">
        <img
          className="picture-movie"
          src={movie.Poster}
          alt={movie.Title}
        ></img>
      </div>
      <div className="text">
        <h4>{movie.Title}</h4>
        <p>{movie.Year}</p>
      </div>
      {children}
    </div>
  );
}
