import React from 'react';
import useFormValidation from '../../utils/useFormValidation';
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import validateData from '../../utils/validateData';

function Register({ handleRegister }) {
  const { userData, handleChange, validationErrors, isValidForm } = useFormValidation({ name: '', email: '', password: '' }, validateData);

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = userData;
    if (!name || !email || !password) {
      return;
    }
    if (isValidForm) handleRegister(evt, name, email, password);
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
            {validationErrors.name &&
              <p className="sign__validity">{validationErrors.name}</p>
            }
            <input
              type="text"
              name="name"
              value={userData.name}
              className={`sign__input ${validationErrors.name && 'sign__input_type_error'}`}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label className="sign__label">
            <span className="sign__field">E-mail</span>
            {validationErrors.email &&
              <p className="sign__validity">{validationErrors.email}</p>
            }
            <input
              type="text"
              name="email"
              value={userData.email}
              className={`sign__input ${validationErrors.email && 'sign__input_type_error'}`}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label className="sign__label">
            <span className="sign__field">Пароль</span>
            {validationErrors.password &&
              <p className="sign__validity">{validationErrors.password}</p>
            }
            <input
              type="password"
              name="password"
              value={userData.password}
              className={`sign__input ${validationErrors.password && 'sign__input_type_error'}`}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
        </fieldset>
        <button type="submit" className="sign__button" disabled={!isValidForm}>Зарегистрироваться</button>
      </form>
      <div className="sign__signup">
        <span className="sign__redirect">Уже зарегистрированы?</span>
        <Link to="/signin" className="sign__link">Войти</Link>
      </div>
    </section>
  );
}

export default Register;