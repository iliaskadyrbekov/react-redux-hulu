import axios from "axios";
export const API_URL = 'https://api.themoviedb.org/3';
export const API_KEY = 'a61257ecae454cfad5f5d6150af43761';
export const API_GET_MOVIES = `${API_URL}/discover/movie?api_key=${API_KEY}`;
export const API_GET_GENRES = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
export const API_GET_SEARCH_MOVIES = `${API_URL}/search/movie?api_key=${API_KEY}`;

export function fetchFromAPI(url) {
  return axios.get(url)
    .then(response => {
      if (response.status < 200 && response.status > 300) { // TODO
        const message = `Ooops...our developers are fixing this problem: ${response.status}`;
        throw new Error(message);
      }
      return response.data;
    });
}



