import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import movieApi from "../../../../api/movieApi";
import "./style.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

DetailPage.propTypes = {};

function DetailPage(props) {
  const mobile = useMediaQuery("(max-width: 480px)");
  const tablet = useMediaQuery("(min-width: 481px) and (max-width: 820px)");
  const IMG_URL = "https://image.tmdb.org/t/p/w500/";

  console.log(mobile);

  const param = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getDetailMovie = async () => {
      const result = await movieApi.getDetail(param.id);
      setMovie(result);
      setLoading(false);
    };
    getDetailMovie();
    window.scrollTo(0, 0);
  }, []);

  const category = movie.genres;
  const cate = category?.map((x) => x.name);

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={mobile ? "100%" : "20%"}
            height={(mobile && "495px") || (tablet && "215px") || "360px"}
            mb={(mobile && "20px") || ""}
          />
          <Box width={(mobile && "100%") || "50%"} sx={{ padding: (mobile && " ") || "0 20px" }}>
            <Skeleton
              sx={{ bgcolor: "grey.900", marginBottom: "20px" }}
              variant="h1"
              width="100%"
              height="24px"
            />
            <Skeleton
              sx={{ bgcolor: "grey.900", marginBottom: "20px" }}
              variant="h1"
              width="100%"
              height="38px"
            />
            <Skeleton
              sx={{ bgcolor: "grey.900", marginBottom: "20px" }}
              variant="h1"
              width="100%"
              height="17px"
            />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="h1"
              width="100%"
              height="80px"
            />
          </Box>
          <Box width={(mobile && "100%") || "30%"} sx={{ padding: (mobile  && " ") || "0 10px" }}>
            <Skeleton
              sx={{ bgcolor: "grey.900", marginBottom: "20px" }}
              variant="h1"
              width="100%"
              height="17px"
            />
            <Skeleton
              sx={{ bgcolor: "grey.900", marginBottom: "20px" }}
              variant="h1"
              width="100%"
              height="17px"
            />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="h1"
              width="100%"
              height="17px"
            />
          </Box>
        </Box>
      ) : (
        <div className="movie_detail">
          <div className="movie_detail_img">
            <img src={IMG_URL + movie.poster_path} alt="" />
          </div>
          <div className="movie_detail_desc">
            <p className="movie_detail_desc_title">{movie.original_title}</p>
            <div className="movie_detail_desc_btn">
              <button className="movie_detail_desc_btn--follow">
                <FavoriteIcon />
                <span>Follow</span>
              </button>
              <button className="movie_detail_desc_btn--share">
                <ShareIcon />
                <span>Share</span>
              </button>
            </div>
            <p className="movie_detail_desc_overview">Overview</p>
            <p className="movie_detail_desc_content">{movie.overview}</p>
          </div>
          <div className="movie_detail_more">
            <p>
              Country:{" "}
              <span>{movie.production_countries?.[0]?.name || "none"}</span>
            </p>
            <p>
              Release Date: <span>{movie.release_date}</span>
            </p>
            <p>
              Categories: <span>{cate?.join(", ")}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailPage;
