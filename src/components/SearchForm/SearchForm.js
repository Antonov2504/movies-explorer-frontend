import React from 'react';
import './SearchForm.css';
import useFormValidation from '../../utils/useFormValidation';
import validateData from '../../utils/validateData';

function SearchForm({ onChangeInputMovie, onSearchSubmit }) {
  const { inputValues, handleChange, runFormValidation, validationErrors, isValidForm } = useFormValidation({ movie: '' }, validateData);

  function handleInputChange(evt) {
    handleChange(evt);
    if (onChangeInputMovie) onChangeInputMovie(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('handleSubmit search');
    runFormValidation();
    if (isValidForm) onSearchSubmit(inputValues.movie, evt.target['movie-type'].checked);
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
          value={inputValues.movie}
          className={`searchForm__input ${validationErrors.movie && 'searchForm__input_type_error'}`}
          onChange={handleInputChange}
          placeholder="Фильм"
          autoComplete="off"
        />
        {validationErrors.movie &&
          <p className="searchForm__validity">{validationErrors.movie}</p>
        }
        <button type="submit" className="searchForm__button" disabled={validationErrors.movie}></button>
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