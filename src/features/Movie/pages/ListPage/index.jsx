import { Pagination, Stack } from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import movieApi from "../../../../api/movieApi";
import SwiperSlider from "../../../../components/SwiperSilder";
import MovieList from "../../components/MovieList";
import MovieListSkeleton from "../../components/MovieListSkeleton";
import "./style.scss";

ListPage.propTypes = {};

function ListPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const [loading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total_pages: 10,
    total_results: 10,
  });

  let param = useParams();

  const movieSlide = [...movieList].slice(0, 5);
  const cate = useSelector((state) => state.category);

  const [filter, setFilter] = useState({
    page: Number.parseInt(queryParams.page) || 1,
  });

  const [searchFilter, setSearchFilter] = useState({
    page: Number.parseInt(queryParams.page) || 1,
  });

  useEffect(() => {
    setLoading(true);
    const getMovieList = async () => {
      let result = [];
      if (param.value) {
        result = await movieApi.getSearch({
          ...searchFilter,
          query: param.value,
        });
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
    return () => {};
  }, [filter, cate, param.value, searchFilter]);

  const handleChangePage = (e, page) => {
    if (param.value) {
      setSearchFilter((x) => ({
        ...x,
        page: page,
      }));
    } else {
      setFilter((x) => ({
        ...x,
        page: page,
      }));
    }
  };

  useEffect(() => {
    if (param.value) {
      if (location.pathname === "/") {
        navigate(`?${queryString.stringify(searchFilter)}`);
      } else {
        navigate(`${location.pathname}?${queryString.stringify(searchFilter)}`);
      }
    } else {
      if (location.pathname === "/") {
        navigate(`?${queryString.stringify(filter)}`);
      } else {
        navigate(`${location.pathname}?${queryString.stringify(filter)}`);
      }
    }
  }, [filter.page, searchFilter.page, param.value, cate]);

  useMemo(() => {
    if (param.value) {
      setSearchFilter((x) => ({
        ...x,
        page: Number.parseInt(queryParams.page) || 1,
      }));
    } else {
      setFilter((x) => ({
        ...x,
        page: Number.parseInt(queryParams.page) || 1,
      }));
    }
  }, [location.search]);

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
