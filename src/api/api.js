export const API_URL = 'https://api.themoviedb.org/3';
export const API_KEY = 'a61257ecae454cfad5f5d6150af43761';
export const API_GET_MOVIES= `${API_URL}/discover/movie?api_key=${API_KEY}`;
export const API_GET_GENRES = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
export const API_GET_SEARCH_MOVIES = `${API_URL}/search/movie?api_key=${API_KEY}&query=`;

export async function fetchFromAPI(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const message = `Ooops...our developers are fixing this propblem: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

