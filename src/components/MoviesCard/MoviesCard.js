import React from 'react';
import './MoviesCard.css';

function MoviesCard({ card, location }) {
  // const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner === currentUser._id;
  // const cardDeleteButtonClassName = (
  //   `button ${isOwn ? 'button_type_remove-card' : 'button_type_remove-card-hidden'}`
  // );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = card.likes.some(i => i === currentUser._id);
  // const cardLikeButtonClassName = (
  //   `button ${isLiked ? 'button_type_add-like-active' : 'button_type_add-like'}`
  // );

  // function handleImageClick() {
  //   onCardClick(card);
  // }

  // function handleLikeClick() {
  //   onCardLike(card);
  // }

  // function handleDeleteClick() {
  //   onCardDelete(card);
  // }

  return (
    <li className="card">
      {
        location === '/movies'
          ? <button type="button" className="card__button card__button_type_save"></button>
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
