import React from 'react';
import Movie from "../../Movies/Movie/Movie";
import {useSelector} from "react-redux";

const RecommendationMovies = () => {
  const recommendationMovies = useSelector(({movieInfo}) => movieInfo.recommendationMovies);

  const movies = recommendationMovies.map((movie, index) => {
    return <Movie movie={movie} key={index}/>;
  });

  return (
    <section className="recommendation-movies">
      <h2 className="recommendation-movies__title">Recommendation movies</h2>
      <div className="movies">
        <div className="movies__list">
          {movies}
        </div>
      </div>
    </section>
  );
};

export default RecommendationMovies;

