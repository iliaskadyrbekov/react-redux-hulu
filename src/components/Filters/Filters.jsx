import React from "react";
import {Link} from "react-router-dom";
import {SortBy} from "./SortBy";
import {useSelector} from "react-redux";

const sortBy = {
  'popularity.desc': 'Popular',
  'revenue.desc': 'Revenue',
  'vote_average.desc': 'Vote Average',
  'vote_count.desc': 'Vote Count',
  'original_title.desc': 'Title',
};

const Filters = () => {
  const {checkedGenres, checkedYears} = useSelector(({filters}) => filters.checkedFilters);
  const genres = useSelector(({movies}) => movies.genres);
  const isFiltering = useSelector(({filters}) => filters.isFiltering);

  const openFilterPopup = () => {
    document.body.classList.add('body__model--open');
  };

  const checkedGenresName = genres
    .filter((genre) => checkedGenres.includes(genre.id))
    .map((genre) => genre.name);

  const formatCheckedFilters = () => {
    let checkedFilters = [...checkedGenresName];
    if (checkedYears.length) {
      checkedFilters.push(checkedYears[0]);
    }

    return checkedFilters.map(filterName => {
      return (
        <div className="filters__list-item" key={filterName}>
          {filterName}
        </div>
      );
    });
  };

  return (
    <section className="filter">
      <div className="filter__wrapper">
        <div className="filter__menu">
          <Link to="/filters" className="filter__btn-wrapper">
            <div
              className="filter__button"
              onClick={openFilterPopup}
            >Filters
            </div>
          </Link>
          <SortBy sortBy={sortBy}/>
        </div>
        {isFiltering &&
        <div className="filters__list--checked">
          {formatCheckedFilters()}
        </div>
        }
      </div>
    </section>
  )
};

export default Filters;
