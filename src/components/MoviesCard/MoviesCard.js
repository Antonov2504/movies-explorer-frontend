import React from 'react';
import './MoviesCard.css';

function MoviesCard({ location, card, onCardSave }) {
  // const currentUser = useContext(CurrentUserContext);
  const currentUser = {
    _id: 7
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner === currentUser._id;
  // const cardDeleteButtonClassName = (
  //   `button ${isOwn ? 'button_type_remove-card' : 'button_type_remove-card-hidden'}`
  // );

  // Определяем, сохранена ли карточка в избранном у текущего пользователя
  const isSaved = card.saved.some(i => i === currentUser._id);
  const cardSaveButtonClassName = (
    `card__button ${isSaved ? 'card__button_type_save-active' : 'card__button_type_save'}`
  );

  // function handleImageClick() {
  //   onCardClick(card);
  // }

  function handleSaveClick() {
    onCardSave(card);
  }

  // function handleDeleteClick() {
  //   onCardDelete(card);
  // }

  return (
    <li className="card">
      {
        location === '/movies'
          ? <button type="button" className={cardSaveButtonClassName} onClick={handleSaveClick}></button>
          : <button type="button" className="card__button card__button_type_delete"></button>
      }
      <div className="card__info">
        <h2 className="card__name">{card.nameRU}</h2>
        <p className="card__duration">{Math.floor(card.duration)}ч {Math.floor((card.duration - Math.floor(card.duration)) * 60)}м</p>
      </div>
      <img src={card.image} alt={card.nameRU} className="card__image" />
    </li>
  );
}

export default MoviesCard;
