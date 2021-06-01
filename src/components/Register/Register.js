import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from '../../images/header__logo.svg';

function Register({ handleRegister }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = userData;
    handleRegister(evt, name, email, password);
  }

  return (
    <section className="sign">
      <img src={logo} alt="ФильмоПоиск" className="sign__logo" />
      <p className="sign__heading">Добро пожаловать!</p>
      <form
        name="register-form"
        className="sign__form"
        onSubmit={handleSubmit}>
        <fieldset className="sign__fieldset">
          <label className="sign__label">
            <span className="sign__field">Имя</span>
            <input
              type="text"
              name="name"
              value={userData.name}
              className="sign__input"
              onChange={handleChange}
            />
          </label>
          <label className="sign__label">
            <span className="sign__field">E-mail</span>
            <input
              type="text"
              name="email"
              value={userData.email}
              className="sign__input"
              onChange={handleChange}
            />
          </label>
          <label className="sign__label">
            <span className="sign__field">Пароль</span>
            <input
              type="password"
              name="password"
              value={userData.password}
              className="sign__input"
              onChange={handleChange}
            />
            <p className="sign__error">Что-то пошло не так...</p>
          </label>
        </fieldset>
        <button type="submit" className="sign__button">Зарегистрироваться</button>
      </form>
      <div className="sign__signup">
        <span className="sign__redirect">Уже зарегистрированы?</span>
        <Link to="/signin" className="sign__link">Войти</Link>
        {/* <Link to="./sign-up" className="sign__link">Регистрация</Link> */}
      </div>
    </section>
  );
}

export default Register;