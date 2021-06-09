import { useState } from 'react';
import { mainAppUrl, moviesBaseUrl } from '../utils/constants';
import { handleOriginalResponse, setMainApiBaseResponsHeaders } from '../utils/utils';
import plugImage from '../images/plug-image.jpg';

function MainApi(options) {
  const { baseUrl } = options;
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const register = (name, email, password) => {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    })
      .then(handleOriginalResponse)
  }

  const authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
      .then(handleOriginalResponse)
      .then(data => {
        console.log('authorize');
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          return data;
        }
        return data;
      })
  }

  const getUserInfo = () => {
    console.log('getUserInfo');
    const token = localStorage.getItem('token');
    return fetch(`${baseUrl}/users/me`, {
      headers: setMainApiBaseResponsHeaders(token),
      credentials: 'include',
    })
      .then(handleOriginalResponse)
  }

  const editProfile = (userInfo) => {
    return fetch(`${baseUrl}/users/me`, {
      method: 'PATCH',
      headers: setMainApiBaseResponsHeaders(token),
      body: JSON.stringify({
        name: userInfo.name,
        email: userInfo.email
      }),
      credentials: 'include',
    })
      .then(handleOriginalResponse);
  }

  const getSavedMovies = () => {
    return fetch(`${baseUrl}/movies`, {
      headers: setMainApiBaseResponsHeaders(token),
      credentials: 'include',
    })
      .then(handleOriginalResponse)
  }

  const saveMovie = (movie) => {
    const movieImgUrl = movie.image ? `${moviesBaseUrl}${movie.image.url}` : `${mainAppUrl}${plugImage}`;
    const thumbnailImgUrl = movie.image ? `${moviesBaseUrl}${movie.image.formats.thumbnail.url}` : `${mainAppUrl}${plugImage}`;
    return fetch(`${baseUrl}/movies`, {
      method: 'POST',
      headers: setMainApiBaseResponsHeaders(token),
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movieImgUrl,
        trailer: movie.trailerLink,
        thumbnail: thumbnailImgUrl,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
      credentials: 'include',
    })
      .then(handleOriginalResponse);
  }

  const deleteMovie = (movie) => {
    return fetch(`${baseUrl}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: setMainApiBaseResponsHeaders(token),
      credentials: 'include',
    })
      .then(handleOriginalResponse);
  }

  return {
    token,
    setToken,
    authorize,
    register,
    getUserInfo,
    editProfile,
    getSavedMovies,
    saveMovie,
    deleteMovie
  }
}

export default MainApi;
