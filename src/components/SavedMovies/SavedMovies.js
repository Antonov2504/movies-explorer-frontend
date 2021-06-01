import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import Preloader from '../Preloader/Preloader';

function SavedMovies({ cards }) {
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

export default SavedMovies;
