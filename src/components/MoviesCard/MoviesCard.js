import React, { useState, useContext } from 'react';
import { moviesBaseUrl } from '../../utils/constants';
import './MoviesCard.css';
import plugImage from '../../images/plug-image.jpg';
import { noDataMessage } from '../../utils/constants';
import { AppContext } from '../../contexts/AppContext';

function MoviesCard({ card, onCardSave, onCardDelete }) {
  const value = useContext(AppContext);
  const [isSaved, setIsSaved] = useState(card.isSaved || false);
  let cardImageSrc = '';
  let cardAltText = '';

  if (card.image) {
    cardImageSrc = `${moviesBaseUrl}${card.image.url}`;
    cardAltText = card.image.alternativeText;
  } else {
    cardImageSrc = plugImage;
    cardAltText = noDataMessage;
  }

  function handleSaveClick() {
    if (!card.isSaved) {
      card.isSaved = true;
      onCardSave(card);
      setIsSaved(card.isSaved);
    } else {
      card.isSaved = false;
      onCardDelete(card);
      setIsSaved(card.isSaved);
    }
  }

  function handleDeleteClick() {
    card.isSaved = false;
    onCardDelete(card);
    setIsSaved(card.isSaved);
  }

  return (
    <li className="card">
      {
        value.location.pathname === '/movies'
          ? <button type="button" className={`card__button card__button_type_save${isSaved ? '-active' : ''}`} onClick={handleSaveClick}></button>
          : <button type="button" className="card__button card__button_type_delete" onClick={handleDeleteClick}></button>
      }
      <div className="card__info">
        <h2 className="card__name">{card.nameRU}</h2>
        <p className="card__duration">{Math.floor(card.duration / 60) > 0 ? Math.floor(card.duration / 60) + 'ч ' : ''}{card.duration - Math.floor(card.duration / 60) * 60 + 'м'}</p>
      </div>
      <a target="_blank" rel="noreferrer" href={value.location.pathname === '/movies' ? card.trailerLink : card.trailer}><img src={value.location.pathname === '/movies' ? cardImageSrc : card.image} alt={value.location.pathname === '/movies' ? cardAltText : card.nameRU} className="card__image" /></a>
    </li>
  );
}

export default MoviesCard;
