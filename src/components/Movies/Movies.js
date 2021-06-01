import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';

function Movies({ cards }) {
  // const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <SearchForm />
      <MoviesCardList
        cards={cards}
      />
    </main>
  );
}

export default Movies;
