import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import { mainApiBaseUrl, moviesApiBaseUrl, noDataMessage, serverRejectMessage } from '../../utils/constants';
import MainApi from './../../utils/MainApi';
import MoviesApi from './../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);                                                    // Стейт-переменная статус пользователя, вход в систему
  const [currentUser, setCurrentUser] = useState({                                                    // Стейт данные текущего пользователя
    _id: '',
    name: '',
    email: '',
  });
  const [searchMovie, setSearchMovie] = useState('');                                                 // Стейт массив найденных фильмов
  const [searchMovies, setSearchMovies] = useState([]);                                               // Стейт массив найденных фильмов
  const [filteredMovies, setFilteredMovies] = useState([]);                                               // Стейт массив найденных фильмов
  const [savedMovies, setSavedMovies] = useState([]);                                                 // Стейт массив сохраненных фильмов
  const [renderedMovies, setRenderedMovies] = useState([]);                                                 // Стейт массив сохраненных фильмов
  const [isNavOpened, setIsNavOpened] = useState(false);                                              // Стейт мобильная навигация открыта
  const [isLoadingCards, setIsLoadingCards] = useState(false);                                        // Стейт прелоадер загрузки карточек
  const [isNoSearchResult, setIsNoSearchResult] = useState({                                          // Стейт нет результатов поиска
    status: false,
    message: noDataMessage
  });
  const [isNoMovies, setIsNoMovies] = useState({                                                      // Стейт нет сохраненных фильмов
    status: false,
    message: noDataMessage
  });
  const [isErrorRegisterResponse, setIsErrorRegisterResponse] = useState({                            // Стейт ошибки загрузки данных с сервера
    status: false,
    message: serverRejectMessage
  });
  const [isErrorSigninResponse, setIsErrorSigninResponse] = useState({                                // Стейт ошибки загрузки данных с сервера
    status: false,
    message: serverRejectMessage
  });
  const [isErrorEditProfileResponse, setIsErrorEditProfileResponse] = useState({                      // Стейт ошибки загрузки данных с сервера
    status: false,
    message: serverRejectMessage
  });
  const [isError, setIsError] = useState({                                                            // Стейт ошибки загрузки данных
    status: false,
    message: serverRejectMessage
  });
  // const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);                                   // Стейт прелоадер загрузки информации пользователя
  const [isLoadingRegister, setIsLoadingRegister] = useState(false);                                  // Стейт прелоадер загрузки регистрации пользователя
  const [isLoadingSignin, setIsLoadingSignin] = useState(false);                                      // Стейт прелоадер загрузки входа пользователя
  const [isLoadingEditProfile, setIsLoadingEditProfile] = useState(false);                            // Стейт прелоадер загрузки входа пользователя
  const [disabledInputEditProfile, setDisabledInputEditProfile] = useState(true);

  const mainApi = MainApi({
    baseUrl: mainApiBaseUrl,
  });

  const moviesApi = MoviesApi({
    baseUrl: moviesApiBaseUrl,
  });

  // Обработчик по кнопке Войти
  function handleLogin(email, password) {
    setIsLoadingSignin(true);
    setIsErrorSigninResponse({
      ...isErrorSigninResponse,
      status: false
    });
    mainApi.authorize(email, password)
      .then(data => {
        setIsLoadingSignin(false);
        if (data.token) {
          setLoggedIn(true);
          mainApi.getUserInfo()
            .then(res => {
              setCurrentUser({ ...res.data });
              // setIsLoadingUserInfo(false);
              history.push('/movies');
            })
            .catch(err => console.log(err));
        } else {
          setIsErrorSigninResponse({
            ...isErrorSigninResponse,
            status: true,
            message: JSON.parse(data).message
          });
        }
      })
      .catch(err => console.log(err));
  }

  // Обработчик по кнопке Зарегистрироваться
  function handleRegister(name, email, password) {
    setIsLoadingRegister(true);
    mainApi.register(name, email, password)
      .then(data => {
        if (!data._id) {
          setIsErrorRegisterResponse({
            ...isErrorRegisterResponse,
            status: true,
            message: JSON.parse(data).message
          });
        } else {
          setIsLoadingRegister(false);
          setIsErrorRegisterResponse({
            ...isErrorRegisterResponse,
            status: false
          });
          history.push('/movies');
        }
      })
      .catch(err => console.log(err))
  }

  // Обработчик клика по меню
  function handleNavClick() {
    setIsNavOpened(!isNavOpened);
  }

  // Обработчик формы поиска фильмов
  function handleSearchSubmit(inputValue, isShort) {
    setIsLoadingCards(true);
    setIsNoSearchResult({
      ...isNoSearchResult,
      status: false
    });
    moviesApi.getMovies()
      .then(movies => {
        const regex = new RegExp(inputValue, 'i');
        setSearchMovies(movies.filter((movie) => {
          if ((movie.nameRU && movie.nameRU.match(regex)) || (movie.nameEN && movie.nameEN.match(regex))) {
            if (savedMovies.some((sm) => sm.movieId === movie.id && currentUser._id === sm.owner)) {
              movie.isSaved = true;
            };
            if (isShort && movie.duration <= 40) {
              return movie;
            }
            if (!isShort) {
              return movie;
            }
          }
        }))
        setIsLoadingCards(false);
      })
      .catch(err => {
        console.log(err);
        setIsError({
          ...isError,
          status: true
        });
      });
  }

  // Обработчик формы поиска сохраненных фильмов
  function handleSearchSavedMoviesSubmit(inputValue, isShort) {
    setIsLoadingCards(true);
    const regex = new RegExp(inputValue, 'i');
    setFilteredMovies(savedMovies.filter((movie) => {
      if ((movie.nameRU && movie.nameRU.match(regex)) || (movie.nameEN && movie.nameEN.match(regex))) {
        if (isShort && movie.duration <= 40) {
          return movie;
        }
        if (!isShort) {
          return movie;
        }
      }
    }))
    setIsLoadingCards(false);
  }

  // Обработчик сохранения карточки
  function handleCardSave(card) {
    mainApi.saveMovie(card)
      .then(movie => {
        setIsNoMovies({
          ...isNoMovies,
          status: false,
        });
        setSavedMovies([
          movie,
          ...savedMovies
        ]);
      })
      .catch(err => console.log(err));
  }

  // Обработчик удаления карточки
  function handleCardDelete(card) {
    if (!card._id) {
      card = savedMovies.find((m) => m.movieId === card.id);
    }
    mainApi.deleteMovie(card)
      .then(movie => {
        setSavedMovies(savedMovies.filter((m) => m._id !== card._id));
        setSearchMovies(searchMovies.map((m) => {
          if (m.id === card.movieId) {
            m.isSaved = false;
          }
          return m;
        }));
      })
      .catch(err => console.log(err));
  }

  // Выход из аккаунта
  function handleSignout() {
    setLoggedIn(false);
    setIsNavOpened(false);
    setSearchMovies([]);
    localStorage.removeItem('token');
    localStorage.removeItem('lastSearchMovies');
    history.push('/');
  }

  // Обработчик клика по редактированию профиля пользователя
  function handleEditProfile() {
    setDisabledInputEditProfile(false);
  }

  // Обработчик обновления информации пользователя
  function handleEditProfileSubmit(userInfo) {
    setIsLoadingEditProfile(true);
    setIsErrorEditProfileResponse({
      ...isErrorEditProfileResponse,
      status: false,
      message: serverRejectMessage
    });
    mainApi.editProfile(userInfo)
      .then(res => {
        if (res.data) {
          setCurrentUser({
            ...currentUser,
            ...res.data
          });
          setIsLoadingEditProfile(false);
          setDisabledInputEditProfile(true);
        } else {
          setIsErrorEditProfileResponse({
            ...isErrorEditProfileResponse,
            status: true,
            message: JSON.parse(res).message
          });
          setIsLoadingEditProfile(false);
        }
      })
      .catch(err => console.log(err));
  }

  function handleChangeInputMovie(inputValue) {
    setSearchMovie(inputValue);
  }

  // Проверка токена при повторном посещении сайта
  useEffect(() => {
    if (mainApi.token) {
      mainApi.getUserInfo()
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser({ ...res.data });
            // setIsLoadingUserInfo(false);
            history.push('/movies');
          }
        })
        .catch(err => console.log(err));
    } else {
      setLoggedIn(false);
    }
    if (localStorage.getItem('lastSearchMovies')) setSearchMovies(JSON.parse(localStorage.getItem('lastSearchMovies')))
  }, []);

  // Загрузка сохраненных пользователем фильмов
  useEffect(() => {
    mainApi.getSavedMovies()
      .then(savedMovies => {
        if (savedMovies.data) {
          setIsLoadingCards(false);
          setIsNoMovies({
            ...isNoMovies,
            status: false
          });
          setSavedMovies(savedMovies.data.reverse());
        } else {
          setIsLoadingCards(false);
          setIsNoMovies({
            ...isNoMovies,
            status: true,
            message: savedMovies.message
          });
          setSavedMovies([]);
        }
      })
      .catch(err => console.log(err));
  }, [loggedIn]);

  useEffect(() => {
    if (!searchMovies.length) {
      setIsNoSearchResult({
        ...isNoSearchResult,
        status: true,
        message: noDataMessage
      });
    }
    localStorage.setItem('lastSearchMovies', JSON.stringify(searchMovies));
  }, [searchMovies]);

  useEffect(() => {
    setIsNoSearchResult({
      ...isNoSearchResult,
      status: false,
      message: noDataMessage
    });
    setRenderedMovies(filteredMovies);
    if (!filteredMovies.length) {
      setIsNoSearchResult({
        ...isNoSearchResult,
        status: true,
        message: noDataMessage
      });
    }
  }, [filteredMovies]);

  useEffect(() => {
    setIsNoSearchResult({
      ...isNoSearchResult,
      status: false,
      message: noDataMessage
    });
    setRenderedMovies(savedMovies);
  }, [savedMovies]);

  useEffect(() => {
    if (!searchMovie.length) {
      setIsNoSearchResult({
        ...isNoSearchResult,
        status: false,
        message: noDataMessage
      });
      setRenderedMovies(savedMovies);
    }
  }, [searchMovie])

  return (
    <AppContext.Provider value={{ location, loggedIn, isNavOpened, handleNavClick }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Switch>
            <Route exact path="/">
              <Header />
              <Main />
              <Footer />
            </Route>
            <Route path="/signup">
              <Register
                handleRegister={handleRegister}
                isLoading={isLoadingRegister}
                isErrorResponse={isErrorRegisterResponse}
              />
            </Route>
            <Route path="/signin">
              <Login
                handleLogin={handleLogin}
                isLoading={isLoadingSignin}
                isErrorResponse={isErrorSigninResponse}
              />
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              cards={searchMovies}
              isNoSearchResult={isNoSearchResult}
              isLoadingCards={isLoadingCards}
              isError={isError}
              onCardSave={handleCardSave}
              onCardDelete={handleCardDelete}
              searchMovie={searchMovie}
              onSearchSubmit={handleSearchSubmit}
            >
            </ProtectedRoute>
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              cards={renderedMovies}
              isNoSearchResult={isNoSearchResult}
              isLoadingCards={isLoadingCards}
              isNoCards={isNoMovies}
              onCardDelete={handleCardDelete}
              onChangeInputMovie={handleChangeInputMovie}
              onSearchSubmit={handleSearchSavedMoviesSubmit}
            >
            </ProtectedRoute>
            <ProtectedRoute
              path="/profile"
              component={Profile}
              onClickSignout={handleSignout}
              isLoading={isLoadingEditProfile}
              isErrorResponse={isErrorEditProfileResponse}
              onEditProfile={handleEditProfile}
              onSubmitEditProfile={handleEditProfileSubmit}
              disabledInput={disabledInputEditProfile}
            >
            </ProtectedRoute>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
