import editButton from "../images/Edit-Button.svg";
import addButton from "../images/Add-Button.svg";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Main({
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  onAddPlaceClick,
  onEditProfileClick,
  onEditAvatarClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="Main">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatarClick}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="user's profile "
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn"
            type="button"
            aria-label="edit"
            onClick={onEditProfileClick}
          >
            <img
              className="profile__edit-img"
              src={editButton}
              alt="edit-btn "
            />
          </button>
          <p className="profile__about">{currentUser.about}</p>
        </div>

        <button className="profile__add-btn" type="button" aria-label="add">
          <img
            className="profile__add-img"
            src={addButton}
            alt="add-btn "
            onClick={onAddPlaceClick}
          />
        </button>
      </section>
      <section className="element">
        <ul className="element__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
