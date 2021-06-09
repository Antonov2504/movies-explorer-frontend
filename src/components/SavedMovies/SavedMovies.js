import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ cards, onChangeInputMovie, onSearchSubmit, isNoSearchResult, isNoCards, isLoadingCards, onCardDelete }) {
  return (
    <main className="content">
      <SearchForm
        onSearchSubmit={onSearchSubmit}
        onChangeInputMovie={onChangeInputMovie}
      />
      <MoviesCardList
        cards={cards}
        isNoSearchResult={isNoSearchResult}
        isLoadingCards={isLoadingCards}
        isNoCards={isNoCards}
        onCardDelete={onCardDelete}
      />
    </main>
  );
}

export default SavedMovies;
