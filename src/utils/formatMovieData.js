import defaultMovieImage from "../assets/img/defaultMovieImage.png";

export const getImagePath = (backdropPath, posterPath) => {
  const imageName = backdropPath || posterPath;
  return imageName ? `https://image.tmdb.org/t/p/w500/${imageName}` : defaultMovieImage;
};

export const getYear = (releaseDate) => {
  return releaseDate ? releaseDate.slice(0, 4) : 'soon';
};

export const getRating = (voteAverage) => {
  return voteAverage.toString().length === 1 || voteAverage === 10
    ? voteAverage + '.0' : voteAverage;
};

export const getGenresList = (genres) => {
  return genres && genres.map(genre => genre.name).join(', ');
};

export const getCountriesList = (productionCountries) => {
  if (!productionCountries[0]) return 'Unnown countries';
  return productionCountries.map((country) => country.name).join(', ');
};

