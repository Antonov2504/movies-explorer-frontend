import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
// import { AppContext } from '../contexts/AppContext';

function Navigation({ isNavOpened, onClickNav, loggedIn, onClickSignin }) {
  // const value = useContext(AppContext);

  return (
    <>
      {/* Меню неавторизованный пользователь */}
      {!loggedIn &&
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item"><Link to="/signup" className="nav__link">Регистрация</Link></li>
            <li className="nav__item"><button type="button" className="nav__button nav__button_type_signin" onClick={onClickSignin}>Войти</button></li>
          </ul>
        </nav>
      }
      {/* Меню авторизованный пользователь */}
      {loggedIn &&
        <nav className="nav">
          {isNavOpened && <div className="nav__cover"></div>}
          <button type="button" className={`nav__button nav__button_type_open-nav ${isNavOpened && 'nav__button_type_close-nav'}`} onClick={onClickNav}></button>
          <ul className={`nav__list nav__list_authorized ${isNavOpened && 'nav__list_opened'}`}>
            <li className="nav__item nav__item_authorized nav__item_type_main"><NavLink exact to="/" activeClassName="nav__link_active" className="nav__link">Главная</NavLink></li>
            <li className="nav__item nav__item_authorized"><NavLink to="/movies" activeClassName="nav__link_active" className="nav__link">Фильмы</NavLink></li>
            <li className="nav__item nav__item_authorized"><NavLink to="/saved-movies" activeClassName="nav__link_active" className="nav__link">Сохраненные фильмы</NavLink></li>
            <li className="nav__item nav__item_type_account"><NavLink to="/profile" activeClassName="nav__item_type_account_active" className="nav__link">Аккаунт</NavLink></li>
          </ul>
        </nav>
      }

    </>
  );
}

export default Navigation;