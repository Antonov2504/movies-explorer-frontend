import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Login.css';
import logo from '../../images/header__logo.svg';

function Login({ handleLogin }) {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  function handleChange(evt) {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      return;
    }
    handleLogin(evt, password, email);
  }

  return (
    <section className="sign">
      <img src={logo} alt="ФильмоПоиск" className="sign__logo" />
      <p className="sign__heading">Рады видеть!</p>
      <form
        name="login-form"
        className="sign__form"
        onSubmit={handleSubmit}>
        <fieldset className="sign__fieldset">
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
          </label>
        </fieldset>
        <button type="submit" className="sign__button">Войти</button>
      </form>
      <div className="sign__signup">
        <span className="sign__redirect">Еще не зарегистрированы?</span>
        <Link to="/signup" className="sign__link">Регистрация</Link>
        {/* <Link to="./sign-up" className="sign__link">Регистрация</Link> */}
      </div>
    </section>
  );
}

export default Login;