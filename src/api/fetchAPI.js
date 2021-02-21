import axios from "axios";

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