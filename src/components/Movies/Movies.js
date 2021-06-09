import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ onSearchSubmit, cards, isNoSearchResult, isLoadingCards, isError, onCardSave, onCardDelete, isSaved }) {
  return (
    <main className="content">
      <SearchForm
        onSearchSubmit={onSearchSubmit}
      />
      <MoviesCardList
        cards={cards}
        isNoSearchResult={isNoSearchResult}
        isLoadingCards={isLoadingCards}
        isError={isError}
        onCardSave={onCardSave}
        onCardDelete={onCardDelete}
        isSaved={isSaved}
      />
    </main>
  );
}

export default Movies;
