import React from 'react';
import {useSelector} from "react-redux";

const Scroller = () => {
  const {cast, crew} = useSelector(({movieInfoReducer}) => movieInfoReducer.movieCast)

  return (
    <section className="scroller">
      <h2 className="scroller__title">Actors&Creators</h2>

      <div className="scroller__cast">
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
        <div className="scroller__card">
          <img src="" alt=""/>
        </div>
      </div>

    </section>
  );
};

export default Scroller;

