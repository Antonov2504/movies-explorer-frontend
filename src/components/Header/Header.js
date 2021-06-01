import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, isNavOpened, onClickNav, handleLogin }) {
  return (
    <header className={`header ${!loggedIn && 'header_color_grey'}`}>
      <div className="header__container">
        <Link to="/"><img src={logo} alt="ФильмоПоиск" className="header__logo" /></Link>
        <Navigation
          loggedIn={loggedIn}
          isNavOpened={isNavOpened}
          onClickNav={onClickNav}
          onClickSignin={handleLogin}
        />
      </div>
    </header >
  );
}

export default Header;
