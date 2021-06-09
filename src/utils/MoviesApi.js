import { handleOriginalResponse } from '../utils/utils';

function MoviesApi(options) {
  const { baseUrl } = options;
  // const [token, setToken] = useState(localStorage.getItem('token'));

  const getMovies = () => {
    return fetch(`${baseUrl}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(handleOriginalResponse)
  }

  return {
    getMovies
  }
}

export default MoviesApi;
