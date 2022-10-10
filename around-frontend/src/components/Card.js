import trashIcon from "../images/Trash.svg";
import likeSign from "../images/like-sign.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Card(props) {

  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  const isOwn = props.card.owner._id === currentUser._id;

  

  const isLiked = props.card.likes.some((user) => user._id === currentUser._id);

  const cardLikeButtonClassName = `element__like-btn ${
    isLiked ? "element__like-btn_active" : "element__like-btn"
  }`;

  return (
    <li className="element__list-item">
      {isOwn && (
      <button
        className="element__trash-btn"
        type="button"
        aria-label="trash"
        onClick={handleDeleteClick}
      >
        <img className="element__trash-icon" src={trashIcon} alt="trash-icon" />
      </button>
  )}
      <img
        className="element__photo"
        src={props.card.link}
        alt={`a great place in ${props.card.name}`}
        onClick={handleClick}
      />
      <div className="element__caption">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className="element__like-btn"
            type="button"
            aria-label="like"
            onClick={handleLikeClick}
          >
            <img
              className={cardLikeButtonClassName}
              src={likeSign}
              alt="like sign"
            />
          </button>
          <span className="element__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
