import React, { useState } from 'react';
import './Profile.css';
import useFormValidation from '../../utils/useFormValidation';
import validateData from '../../utils/validateData';

function Profile({ onClickSignout }) {
  const { userData, handleChange, validationErrors, isValidForm } = useFormValidation({ name: 'Виталий', email: 'pochta@yandex.ru' }, validateData);
  const [disabledInput, setDisabledInput] = useState(true);

  function handleEditProfile() {
    setDisabledInput(false);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setDisabledInput(true);
  }

  function handleClickSignout() {
    onClickSignout();
  }

  return (
    <section className="profile">
      <p className="profile__heading">Привет, Виталий!</p>
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
            value={userData.name}
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
            value={userData.email}
            className={`profile__input ${validationErrors.email && 'profile__input_type_error'}`}
            onChange={handleChange}
            placeholder="E-mail"
            disabled={disabledInput}
          />
        </label>
        {/* <p className="profile__error">При обновлении профиля произошла ошибка.</p> */}
        {!disabledInput && <button type="submit" className="profile__button profile__button_type_submit" disabled={!isValidForm}>Сохранить</button>}
        {disabledInput && <button type="button" className="profile__button profile__button_type_edit" onClick={handleEditProfile}>Редактировать</button>}
        {disabledInput && <button type="button" className="profile__button profile__button_type_signout" onClick={handleClickSignout}>Выйти из аккаунта</button>}
      </form>
    </section>
  );
}

export default Profile;