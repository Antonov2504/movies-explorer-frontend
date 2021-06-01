import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import { initialCards } from '../../utils/constants';
// import { AppContext } from '../contexts/AppContext';

function App() {
  const history = useHistory();
  const [isNavOpened, setIsNavOpened] = useState(false);                                             // Стейт мобильная навигация открыта
  const [loggedIn, setLoggedIn] = useState(false);                                             // Стейт мобильная навигация открыта

  function handleLogin() {
    console.log('handle login');
    setLoggedIn(true);
    history.push('/signin');
  }

  function handleRegister() {
    console.log('handle register');
  }

  // Обработчик клика по меню
  function handleNavClick() {
    setIsNavOpened(!isNavOpened);
  }

  function handleSignout() {
    console.log('handle signout');
    setLoggedIn(false);
  }

  return (
    // <AppContext.Provider value={{ loggedIn, userEmail, handleLogin, signOut }}>
    <div className="page__container">
      <Header
        loggedIn={loggedIn}
        isNavOpened={isNavOpened}
        onClickNav={handleNavClick}
        handleLogin={handleLogin}
      />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/movies">
          <Movies
            cards={initialCards}
          />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies
            cards={initialCards}
          />
        </Route>

        <Route path="/profile">
          <Profile
            onClickSignout={handleSignout}
          />
        </Route>

        <Route path="/signup">
          <Register
            handleRegister={handleRegister}
          />
        </Route>

        <Route path="/signin">
          <Login
            handleLogin={handleLogin}
          />
        </Route>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>

      <Footer />
    </div>
    // </AppContext.Provider>
  );
}

export default App;
