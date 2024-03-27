import Navbar from "./Navbar";
import Window from "./Window";
import Movie from "./Movie";
import ButtonIcon from "./ButtonIcon";

import ShowDeleteWindow from "./ShowDeleteWindow";
import ShowRateWindow from "./ShowRateWindow";
import RateMovieList from "./RateMovieList";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchBarResults, setSearchBarResults] = useState("");
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [showRateBox, setShowRateBox] = useState(false);
  const [showRatedMovies, setShowRatedMovies] = useState(false);
  const [lastMovieClicked, setLastMovieClicked] = useState(null);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [rating, setRating] = useState(0);

  const getMovie = async (searchBarResults) => {
    const url = `https://www.omdbapi.com/?s=${searchBarResults}&apikey=54c36b55`;

    const res = await fetch(url);
    const data = await res.json();
    if (data.Search) setMovies(data.Search);
  };

  useEffect(() => {
    getMovie(searchBarResults);
  }, [searchBarResults]);

  useEffect(() => {
    const movieWatchList = JSON.parse(
      localStorage.getItem("react-movie-storage-watchList")
    );
    const movieRated = JSON.parse(
      localStorage.getItem("react-movie-storage-rated")
    );
    if (movieWatchList) setWatchListMovies(movieWatchList);
    if (movieRated) setWatchedMovies(movieRated);
  }, []);

  const saveToLocalStorageWatchList = (items) => {
    localStorage.setItem(
      "react-movie-storage-watchList",
      JSON.stringify(items)
    );
  };
  const saveToLocalStorageRated = (items) => {
    localStorage.setItem("react-movie-storage-rated", JSON.stringify(items));
  };

  const currMovie = showRatedMovies
    ? watchedMovies.find((el) => el.imdbID === lastMovieClicked)
    : watchListMovies.find((el) => el.imdbID === lastMovieClicked);

  const lastMovieTitle = lastMovieClicked ? currMovie.Title : null;
  const lastMovieImg = lastMovieClicked ? currMovie.Poster : null;
  const lastMovieYear = lastMovieClicked ? currMovie.Year : null;
  const lastMovieImdbID = lastMovieClicked ? currMovie.imdbID : null;

  const searchBarResult = (e) => {
    setSearchBarResults(e.target.value);
  };

  const deleteSelectedMovie = () => {
    if (showRatedMovies) {
      const newWatchedMoviesArr = watchedMovies.filter(
        (el) => el.imdbID !== lastMovieClicked
      );
      setWatchedMovies(newWatchedMoviesArr);
      saveToLocalStorageRated(newWatchedMoviesArr);
    } else {
      const newWatchListMoviesArr = watchListMovies.filter(
        (el) => el.imdbID !== lastMovieClicked
      );
      setWatchListMovies(newWatchListMoviesArr);
      saveToLocalStorageWatchList(newWatchListMoviesArr);
    }
    setShowDeleteBox(false);
    setLastMovieClicked(null);
  };

  const returnFromPopUp = () => {
    setShowDeleteBox(false);
    setLastMovieClicked(null);
  };

  const addToWatchList = (targetMovie) => {
    const dublicatedMovie = watchListMovies.find(
      (el) => el.imdbID === targetMovie.imdbID
    );
    if (dublicatedMovie)
      return alert("This movie is already in your Watchlist.");
    const newArray = [...watchListMovies, targetMovie];

    setWatchListMovies(newArray);
    saveToLocalStorageWatchList(newArray);
  };

  const getIdAndDelete = (id) => {
    setShowDeleteBox((curr) => !curr);
    setLastMovieClicked(id);
  };
  const getIdAndRate = (id, title) => {
    const dublicatedMovie = watchedMovies.find((el) => el.imdbID === id);

    if (dublicatedMovie)
      return alert(`${title} is already in your rated-movie list.`);

    setShowRateBox((curr) => !curr);
    setLastMovieClicked(id);
  };

  const hideRateWindow = () => {
    setShowRateBox((curr) => !curr);
    setRating(0);
    setLastMovieClicked(null);
  };

  const watchedMoviesList = (title, year, img, rating, id) => {
    const dublicatedMovie = watchedMovies.find((el) => el.imdbID === id);
    if (dublicatedMovie)
      return alert(`${title} is already in your rated-movie list.`);
    const newArr = [
      ...watchedMovies,
      { Title: title, Year: year, Img: img, Rating: rating, imdbID: id },
    ];
    setWatchedMovies(newArr);
    saveToLocalStorageRated(newArr);
    setShowRateBox((curr) => !curr);
    setRating(0);
    setLastMovieClicked(null);
  };

  const displayRating = (i) => {
    if (rating === i + 1) return setRating(0);
    setRating(i + 1);
  };

  const showWatchedMovieList = () => {
    if (showDeleteBox) return;
    setShowRateBox(false);
    setLastMovieClicked(null);
    setShowRatedMovies((curr) => !curr);
  };

  return (
    <>
      <Navbar
        setSearchBarResult={searchBarResult}
        showDeleteBox={showDeleteBox}
        currValue={searchBarResults}
        toggleWatchedMovieList={showWatchedMovieList}
        listNumber={watchedMovies.length}
      ></Navbar>
      {showDeleteBox && (
        <ShowDeleteWindow
          lastMovieTitle={lastMovieTitle}
          removeMovie={deleteSelectedMovie}
          returnFromPopUp={returnFromPopUp}
        ></ShowDeleteWindow>
      )}

      <div className="windows">
        {showRatedMovies && (
          <RateMovieList
            watchedMovies={watchedMovies}
            title="Rated movies"
            onClick={showWatchedMovieList}
            onClick2={getIdAndDelete}
          ></RateMovieList>
        )}
        {showRateBox && (
          <ShowRateWindow
            rating={rating}
            setRating={displayRating}
            title={lastMovieTitle}
            img={lastMovieImg}
            year={lastMovieYear}
            id={lastMovieImdbID}
            onClickReturn={hideRateWindow}
            onClickRate={watchedMoviesList}
          ></ShowRateWindow>
        )}
        {!showRateBox && !showRatedMovies && (
          <Window title={`Movies found`} className={"movies-found left"}>
            {movies.map((el) => (
              <Movie
                onClick={addToWatchList}
                movie={el}
                key={el.imdbID}
              ></Movie>
            ))}
          </Window>
        )}
        {!showRateBox && !showRatedMovies && (
          <Window title={"Watchlist"} className={"movies-found right"}>
            {watchListMovies.length === 0 && movies.length !== 0 && (
              <div className="watchlist-text-info">
                <p>Click on a movie to add it to your Watchlist.</p>
              </div>
            )}
            {watchListMovies.map((el) => (
              <Movie movie={el} key={el.imdbID}>
                <ButtonIcon
                  onClick={() => getIdAndRate(el.imdbID, el.Title)}
                  tooltip="Rate this Movie"
                  movie={el}
                  icon={"★"}
                  className={"btn star bg"}
                ></ButtonIcon>
                <ButtonIcon
                  onClick={() => getIdAndDelete(el.imdbID)}
                  tooltip="Remove from Watchlist"
                  movie={el}
                  icon={"×"}
                  className={"btn cross bg"}
                ></ButtonIcon>
              </Movie>
            ))}
          </Window>
        )}
      </div>
    </>
  );
}

export default App;
