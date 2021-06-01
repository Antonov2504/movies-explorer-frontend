import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
// import Preloader from '../Preloader/Preloader';
// import Plug from '../Plug/Plug';
import MoviesCard from '../MoviesCard/MoviesCard';
// import { emptyMoviesContainerText } from '../../utils/constants';

function Movies({ cards }) {
  const location = useLocation();
  return (
    <section className="elements">
      {/* <Preloader /> */}
      {/* <Plug text={emptyMoviesContainerText} /> */}
      <ul className="cards cards_quantity_max">
        {cards.map(card => (
          <MoviesCard
            key={card._id}
            card={card}
            location={location.pathname} />
        ))}
      </ul>
      {/* <button type="button" className="elements__button">Ещё</button> */}
    </section>
  );
}

export default Movies;
