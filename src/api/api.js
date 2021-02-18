import axios from "axios";

export const API_URL = 'https://api.themoviedb.org/3';
export const API_KEY = 'api_key=a61257ecae454cfad5f5d6150af43761';
export const API_GET_MOVIES = `${API_URL}/discover/movie?${API_KEY}`;
export const API_GET_GENRES = `${API_URL}/genre/movie/list?${API_KEY}`;
export const API_GET_SEARCH_MOVIES = `${API_URL}/search/movie?${API_KEY}`;
export const API_GET_MOVIE_BY_ID = `${API_URL}/movie/`;

export async function fetchFromAPI(url) {
  return await axios.get(url)
    .then(response => {
      if (response.status < 200 && response.status > 300) { // TODO
        const message = `Ooops...our developers are fixing this problem: ${response.status}`;
        throw new Error(message);
      }
      return response.data;
    });
}
