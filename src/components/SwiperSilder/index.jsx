import React from "react";
import PropTypes from "prop-types";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation, Autoplay } from "swiper";
import { Link } from "react-router-dom";
SwiperSlider.propTypes = {
  movieSlide: PropTypes.array,
};

function SwiperSlider({ movieSlide }) {
  const IMG_URL = "https://image.tmdb.org/t/p/w500/";
  return (
    <Swiper
      navigation={true}
      autoplay={{ delay: 3000,disableOnInteraction: false }}
      loop={true}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
    >
      {movieSlide.map((x) => (
        <SwiperSlide>
          <Link to={`/movie/${x.id}`} className="slide-container">
            <img src={IMG_URL + x.backdrop_path} alt="" />
            <p className="title">{x.original_title}</p>
            <p className="btn-slide">Xem ngay</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperSlider;
