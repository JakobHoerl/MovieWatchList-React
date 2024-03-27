import StarRating from "./StarRating";
import ButtonText from "./ButtonText";
import ButtonIcon from "./ButtonIcon";

export default function ShowRateWindow({
  title,
  img,
  year,
  id,
  onClickReturn,
  onClickRate,
  rating,
  setRating,
}) {
  return (
    <div className="rate-movie">
      <div className="rate-movie-btn-container">
        <ButtonIcon
          icon={"×"}
          className={" cross bg "}
          onClick={onClickReturn}
        />
      </div>
      <div className="title-rate">
        <h2>Rate this Movie</h2>
      </div>
      <div className="top-container">
        <div className="img-container">
          <img className="picture-rate" src={img} alt={title}></img>
        </div>
        <div className="text-rate">
          <h4>{title}</h4>
          <span>{year}</span>
        </div>
      </div>
      <div className="bottom-container">
        <StarRating setRating={setRating} rating={rating}></StarRating>
        <div className="btn-container-rate">
          <ButtonText
            onClick={() => onClickRate(title, year, img, rating, id)}
            text={"Add to watched Movies"}
          ></ButtonText>
        </div>
      </div>
    </div>
  );
}
