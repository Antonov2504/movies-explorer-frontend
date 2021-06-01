import React, { useState } from 'react';
import './Profile.css';

function Profile({ onClickSignout }) {
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
          <input
            type="text"
            name="profile-name"
            defaultValue="Виталий"
            className="profile__input"
            placeholder="Имя"
            disabled={disabledInput}
          />
        </label>
        <label className="profile__label">
          <span className="profile__field" lang="en">E-mail</span>
          <input
            type="text"
            name="profile-email"
            defaultValue="pochta@yandex.ru"
            className="profile__input"
            placeholder="E-mail"
            disabled={disabledInput}
          />
        </label>
        {/* <p className="profile__error">При обновлении профиля произошла ошибка.</p> */}
        {!disabledInput && <button type="submit" className="profile__button profile__button_type_submit">Сохранить</button>}
        {disabledInput && <button type="button" className="profile__button profile__button_type_edit" onClick={handleEditProfile}>Редактировать</button>}
        {disabledInput && <button type="button" className="profile__button profile__button_type_signout" onClick={handleClickSignout}>Выйти из аккаунта</button>}
      </form>
    </section>
  );
}

export default Profile;