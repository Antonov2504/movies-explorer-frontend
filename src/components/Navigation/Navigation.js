import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import { AppContext } from '../../contexts/AppContext';

function Navigation() {
  const value = useContext(AppContext);

  return (
    <>
      {/* Меню неавторизованный пользователь */}
      {!value.loggedIn &&
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item"><Link to="/signup" className="nav__link">Регистрация</Link></li>
            <li className="nav__item"><Link to="/signin" className="nav__button nav__button_type_signin">Войти</Link></li>
          </ul>
        </nav>
      }
      {/* Меню авторизованный пользователь */}
      {value.loggedIn &&
        <nav className="nav">
          {value.isNavOpened && <div className="nav__cover"></div>}
          <button type="button" className={`nav__button nav__button_type_open-nav ${value.isNavOpened && 'nav__button_type_close-nav'}`} onClick={value.handleNavClick}></button>
          <ul className={`nav__list nav__list_authorized ${value.isNavOpened && 'nav__list_opened'}`}>
            <li className="nav__item nav__item_authorized nav__item_type_main"><NavLink exact to="/" activeClassName="nav__link_active" className="nav__link">Главная</NavLink></li>
            <li className="nav__item nav__item_authorized"><NavLink to="/movies" activeClassName="nav__link_active" className="nav__link">Фильмы</NavLink></li>
            <li className="nav__item nav__item_authorized"><NavLink to="/saved-movies" activeClassName="nav__link_active" className="nav__link">Сохраненные фильмы</NavLink></li>
            <li className="nav__item nav__item_type_account"><NavLink to="/profile" activeClassName="nav__item_type_account_active" className="nav__link nav__link_type_account">Аккаунт</NavLink></li>
          </ul>
        </nav>
      }

    </>
  );
}

export default Navigation;