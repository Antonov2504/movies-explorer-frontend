import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm() {
  const [movie, setMovie] = useState('');

  function handleChange(evt) {
    setMovie(evt.target.value);
    // console.log(movie);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <section className="searchForm">
      <form
        name="search-form"
        className="searchForm__form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="movie"
          value={movie}
          className="searchForm__input"
          onChange={handleChange}
          placeholder="Фильм"
          autoComplete="off"
        />
        <button type="submit" className="searchForm__button"></button>
        <label className="searchForm__label">
          <input
            type="checkbox"
            name="movie-type"
            value="short"
            className="searchForm__input"
          />
          <span className="searchForm__checkbox"></span>
              Короткометражки
            </label>
      </form>
    </section>
  );
}

export default SearchForm;