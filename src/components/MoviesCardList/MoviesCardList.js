import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';
import Plug from '../Plug/Plug';
import MoviesCard from '../MoviesCard/MoviesCard';
import useCardOptions from '../../utils/useCardOptions';

function MoviesCardList({ cards, isNoSearchResult, isNoCards, isLoadingCards, isError, onCardSave, onCardDelete, isSaved }) {
  const location = useLocation();
  const cardsOptions = useCardOptions();
  const [isShowMoreButton, setIsShowMoreButton] = useState(false);
  const [renderedCards, setRenderedCards] = useState([]);
  let lastIndexCard = useRef(0);

  function handleShowMoreButtonClick() {
    console.log('handle more card click');
    console.log(cardsOptions.count + lastIndexCard.current > cards.length);

    lastIndexCard.current += cardsOptions.countAddMore;
    setRenderedCards(cards.filter((card, index) => {
      console.log(index < (cardsOptions.count + lastIndexCard.current));
      return index < (cardsOptions.count + lastIndexCard.current);
    }));
    console.log(cardsOptions.count, lastIndexCard.current, cards.length);
    if (cards.length - cardsOptions.count - lastIndexCard.current < 1) {
      setIsShowMoreButton(false);
      lastIndexCard.current = 0;
      return;
    }
  }

  useEffect(() => {
    console.log(cards);
    console.log(cards.length > cardsOptions.count);
    setRenderedCards(cards);
    setIsShowMoreButton(false);
    if (cards.length > cardsOptions.count) {
      setIsShowMoreButton(true);
      setRenderedCards(cards.filter((card, index) => {
        return index < cardsOptions.count;
      }));
    }
  }, [cards]);

  return (
    <section className="elements" >
      { isLoadingCards && <Preloader />}
      { isNoCards && isNoCards.status && <Plug text={isNoCards.message} />}
      { isNoSearchResult && isNoSearchResult.status && <Plug text={isNoSearchResult.message} />}
      { isError && isError.status && <Plug text={isError.message} />}
      { !!cards.length &&
        !isLoadingCards &&
        <ul className="cards cards_quantity_max">
          {
            renderedCards.map(card => (
              <MoviesCard
                location={location}
                card={card}
                key={card.movieId ? card.movieId : card.id}
                onCardSave={onCardSave}
                onCardDelete={onCardDelete}
                isSaved={isSaved}
              />
            ))}
        </ul>
      }
      {location.pathname === '/movies' &&
        !isLoadingCards &&
        isShowMoreButton &&
        isNoSearchResult &&
        !isNoSearchResult.status &&
        <button type="button" className="elements__button" onClick={handleShowMoreButtonClick}>Ещё</button>}
    </section >
  );
}

export default MoviesCardList;
