import React from 'react';
import useFormValidation from '../../utils/useFormValidation';
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import validateData from '../../utils/validateData';

function Register({ handleRegister, isLoading, isErrorResponse }) {
  const { inputValues, handleChange, validationErrors, isValidForm } = useFormValidation({ name: '', email: '', password: '' }, validateData);

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = inputValues;
    if (!name || !email || !password) {
      return;
    }
    if (isValidForm) handleRegister(name, email, password);
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
              value={inputValues.name}
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
              value={inputValues.email}
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
              value={inputValues.password}
              className={`sign__input ${validationErrors.password && 'sign__input_type_error'}`}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
        </fieldset>
        {isErrorResponse.status && <p className="sign__error">{isErrorResponse.message}</p>}
        {isLoading && <div className="sign__preloader" />}
        {!isLoading && <button type="submit" className="sign__button" disabled={!isValidForm}>Зарегистрироваться</button>}
      </form>
      <div className="sign__signup">
        <span className="sign__redirect">Уже зарегистрированы?</span>
        <Link to="/signin" className="sign__link">Войти</Link>
      </div>
    </section>
  );
}

export default Register;