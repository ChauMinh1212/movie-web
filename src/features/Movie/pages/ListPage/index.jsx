import React, { useDebugValue, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import categoryApi from "../../../../api/categoryApi";
import movieApi from "../../../../api/movieApi";
import MovieList from "../../components/MovieList";
import { Pagination, Stack } from "@mui/material";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../categorySlice";
import SwiperSlider from "../../../../components/SwiperSilder";
import MovieListSkeleton from "../../components/MovieListSkeleton";
import { useLocation, useNavigate, useParams } from "react-router-dom";

ListPage.propTypes = {};

function ListPage(props) {
  const navigate = useNavigate()
  console.log(window.location.pathname);

  const [loading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total_pages: 10,
    total_results: 10,
  });

  let param = useParams();
  console.log(param.value);

  const movieSlide = [...movieList].slice(0, 5);

  const cate = useSelector((state) => state.category);

  const [filter, setFilter] = useState({
    page: 1,
  });

  const [searchFilter, setSearchFilter] = useState({
    page: 1
  })

  useEffect(() => {
    setLoading(true);
    const getMovieList = async () => {
      let result = [];
      if (param.value) {
        result = await movieApi.getSearch({...searchFilter, query: param.value});
      } else {
        result = await movieApi.getAll({ ...filter, with_genres: cate });
      }
      setMovieList(result.results);
      setPagination({
        page: result.page,
        total_pages: result.total_pages,
        total_results: result.total_results,
      });
      setLoading(false);
    };
    getMovieList();
    window.scrollTo(0, 0);
    return () => {
    }
    
  }, [filter, cate, param.value, searchFilter]);

  const handleChangePage = (e, page) => {
    if(param.value){
      setSearchFilter((x) => ({
        ...x,
        page: page
      }))
    }else{
      setFilter((x) => ({
        ...x,
        page: page,
      }));
    }
    console.log(("page", page));
  };

  return (
    <>
      {loading ? (
        <MovieListSkeleton length={20} />
      ) : (
        <>
          <SwiperSlider movieSlide={movieSlide} />
          <MovieList movieList={movieList} />
        </>
      )}
      <Stack spacing={2}>
        <Pagination
          page={pagination.page}
          onChange={handleChangePage}
          count={pagination.total_pages}
          color="primary"
        />
      </Stack>
    </>
  );
}

export default ListPage;
