import ButtonText from "./ButtonText";

export default function ShowDeleteWindow({
  lastMovieTitle,
  removeMovie,
  returnFromPopUp,
}) {
  return (
    <div className="overlay">
      <div className="confirm-window">
        <h3>Delete current Movie?</h3>
        <p>{lastMovieTitle}</p>
        <div className="btn-container">
          <ButtonText onClick={removeMovie} text="Yes"></ButtonText>
          <ButtonText onClick={returnFromPopUp} text="No"></ButtonText>
        </div>
      </div>
    </div>
  );
}
