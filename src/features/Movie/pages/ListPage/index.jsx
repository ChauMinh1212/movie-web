import { Pagination, Stack } from "@mui/material";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import categoryApi from "../../../../api/categoryApi";
import movieApi from "../../../../api/movieApi";
import SwiperSlider from "../../../../components/SwiperSilder";
import MovieList from "../../components/MovieList";
import MovieListSkeleton from "../../components/MovieListSkeleton";
import "./style.scss";

ListPage.propTypes = {};

function ListPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const cate = useSelector((state) => state.category);
  const [cateState, setCateState] = useState(cate);
  console.log(cateState);
  const [cateList, setCateList] = useState([]);
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      page: Number.parseInt(params.page) || 1,
    };
  }, [location.search]);

  const [loading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    total_pages: 10,
    total_results: 10,
  });

  let param = useParams();

  const movieSlide = [...movieList].slice(0, 5);
  useEffect(() => {
    navigate(`${location.pathname}?${queryString.stringify(queryParams)}`, {
      replace: true,
    });
  }, [cateState[0]?.id]);

  useEffect(() => {
    setLoading(true);
    const getMovieList = async () => {
      let result = [];
      if (param.value) {
        result = await movieApi.getSearch({
          ...queryParams,
          query: param.value,
        });
      } else {
        result = await movieApi.getAll({
          ...queryParams,
          with_genres: cateState[0]?.id,
        });
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
  }, [queryParams, cateState[0]?.id, param.value]);

  useEffect(() => {
    const getCateList = async () => {
      const cateList = await categoryApi.getCategory();
      setCateList(cateList.genres);
    };
    getCateList();
  }, []);

  useMemo(() => {
    const catenew = location.pathname.slice(10);
    console.log("catenew", typeof catenew);
    const updateCate = cateList.filter((x) => x.name === catenew);
    setCateState(updateCate);
  }, [location.pathname]);

  const handleChangePage = (e, page) => {
    const filter = {
      ...queryParams,
      page: page,
    };
    if (location.search !== "") {
      navigate(`${location.pathname}?${queryString.stringify(filter)}`);
    } else {
      navigate(`${location.pathname}?${queryString.stringify(filter)}`, {
        replace: true,
      });
    }
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
