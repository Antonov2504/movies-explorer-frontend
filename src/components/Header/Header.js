import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import logo from '../../images/header__logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header() {
  const value = useContext(AppContext);
  return (
    <header className={`header ${!value.loggedIn && 'header_color_grey'}`}>
      <div className="header__container">
        <Link to="/"><img src={logo} alt="ФильмоПоиск" className="header__logo" /></Link>
        <Navigation />
      </div>
    </header >
  );
}

export default Header;
