import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';

function useValidation(value, validations) {
  const [isEmptyError, setIsEmptyError] = useState(true);
  const [isMinLengthError, setIsMinLengthError] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation] ? setIsMinLengthError(true) : setIsMinLengthError(false);
          break;
        case 'isEmpty':
          value ? setIsEmptyError(false) : setIsEmptyError(true);
          break;
        default: break;
      }
    }
  }, [value, validations])

  useEffect(() => {
    (isEmptyError || isMinLengthError)
      ? setIsInputValid(false)
      : setIsInputValid(true);
    console.log(isInputValid);
  }, [isEmptyError, isMinLengthError])

  return {
    isEmptyError,
    isMinLengthError,
    isInputValid
  }
}

function useInput(initialValue, validations) {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  function onChange(evt) {
    setValue(evt.target.value);
  }

  function onBlur(evt) {
    setIsDirty(true);
  }

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    ...valid
  }
}

function Register({ handleRegister }) {
  const email = useInput('', { isEmpty: true, minLength: 3 });
  const password = useInput('', { isEmpty: true });
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
            {/* <div className="sign__validity sign__validity_type_error"></div> */}
            <input
              type="text"
              name="name"
              value={userData.name}
              className="sign__input"
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label className="sign__label">
            <span className="sign__field">E-mail</span>
            <input
              type="text"
              name="email"
              value={email.value}
              className={`sign__input ${email.isDirty && (email.isEmptyError || email.isMinLengthError) && 'sign__input_type_error'}`}
              onChange={email.onChange}
              onBlur={email.onBlur}
              autoComplete="off"
            />
            {(email.isDirty && email.isEmptyError) &&
              <div className="sign__validity">Email не может быть пустым</div>
            }
            {(email.isDirty && email.isMinLengthError) &&
              <div className="sign__validity">Email слишком короткий</div>
            }
          </label>
          <label className="sign__label">
            <span className="sign__field">Пароль</span>
            <input
              type="password"
              name="password"
              value={password.value}
              className={`sign__input ${email.isDirty && (password.isEmptyError || password.isMinLengthError) && 'sign__input_type_error'}`}
              onChange={password.onChange}
              onBlur={password.onBlur}
              autoComplete="off"
            />
            {(password.isDirty && password.isEmptyError) &&
              <div className="sign__validity">Пароль не может быть пустым</div>
            }
          </label>
        </fieldset>
        <button type="submit" className="sign__button" disabled={!email.isInputValid || !password.isInputValid}>Зарегистрироваться</button>
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