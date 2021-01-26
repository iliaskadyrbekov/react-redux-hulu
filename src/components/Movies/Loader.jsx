import React from 'react';
import loader from '../../assets/img/loader.svg';

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt=""/>
      <p>Loading...</p>
    </div>
  )
};

export default Loader;

