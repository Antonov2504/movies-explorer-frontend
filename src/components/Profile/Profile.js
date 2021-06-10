import React, { useContext } from 'react';
import './Profile.css';
import useFormValidation from '../../utils/useFormValidation';
import validateData from '../../utils/validateData';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Profile({ disabledInput, isLoading, isErrorResponse, onEditProfile, onSubmitEditProfile, onClickSignout }) {
  const currentUser = useContext(CurrentUserContext)
  const { inputValues, handleChange, validationErrors, isValidForm } = useFormValidation({ name: currentUser.name, email: currentUser.email }, validateData);

  function handleEditProfile() {
    onEditProfile();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitEditProfile({ name: inputValues.name, email: inputValues.email })
  }

  function handleClickSignout() {
    onClickSignout();
  }

  return (
    <section className="profile">
      <p className="profile__heading">Привет, {currentUser.name}!</p>
      <form
        name="profile-form"
        className="profile__form"
        onSubmit={handleSubmit}
      >
        <label className="profile__label">
          <span className="profile__field">Имя</span>
          {validationErrors.name &&
            <p className="profile__validity">{validationErrors.name}</p>
          }
          <input
            type="text"
            name="name"
            value={inputValues.name}
            className={`profile__input ${validationErrors.name && 'profile__input_type_error'}`}
            onChange={handleChange}
            placeholder="Имя"
            disabled={disabledInput}
          />
        </label>
        <label className="profile__label">
          <span className="profile__field" lang="en">E-mail</span>
          {validationErrors.email &&
            <p className="profile__validity">{validationErrors.email}</p>
          }
          <input
            type="text"
            name="email"
            value={inputValues.email}
            className={`profile__input ${validationErrors.email && 'profile__input_type_error'}`}
            onChange={handleChange}
            placeholder="E-mail"
            disabled={disabledInput}
          />
        </label>
        {isErrorResponse.status && <p className="sign__error">{isErrorResponse.message}</p>}
        {isLoading && <div className="sign__preloader" />}
        {!isLoading &&
          !disabledInput &&
          <button type="submit" className="profile__button profile__button_type_submit" disabled={!isValidForm}>Сохранить</button>}
        {!isLoading && disabledInput && <button type="button" className="profile__button profile__button_type_edit" onClick={handleEditProfile}>Редактировать</button>}
        {!isLoading && disabledInput && <button type="button" className="profile__button profile__button_type_signout" onClick={handleClickSignout}>Выйти из аккаунта</button>}
      </form>
    </section>
  );
}

export default Profile;