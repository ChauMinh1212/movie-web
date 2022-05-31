import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Link } from "react-router-dom";

MovieList.propTypes = {
  movieList: PropTypes.array,
};

function MovieList({ movieList }) {
  const IMG_URL = "https://image.tmdb.org/t/p/w500/";
  return (
    <div className="movie_container">
      {movieList.map((x) => (
        <Link to={`/movie/${x.id}`} key={x.id} className="movie_block">
          <img src={IMG_URL + x.poster_path} alt="" />
          <p>{x.original_title}</p>
        </Link>
      ))}
    </div>
  );
}

export default MovieList;
