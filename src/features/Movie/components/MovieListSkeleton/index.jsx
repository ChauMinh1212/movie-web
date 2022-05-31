import React from "react";
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Grid, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import "./style.scss";

MovieListSkeleton.propTypes = {
  length: PropTypes.number,
};

function MovieListSkeleton({ length }) {
  const mobile = useMediaQuery("(max-width: 480px)");
  const tablet = useMediaQuery("(min-width: 481px) and (max-width: 820px)");

  return (
    <div>
      <Skeleton
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width="100%"
        height={(mobile && "186px") || (tablet && "428px") || "675px"}
      />
      <div className="movie_skeleton">
        {Array.from(new Array(length)).map((x, index) => (
          <Box key={index} className="movie_skeleton_box">
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width="100%"
              height="317px"
            />
            <Skeleton sx={{ bgcolor: "grey.900" }} variant="text" />
          </Box>
        ))}
      </div>
    </div>
  );
}

export default MovieListSkeleton;
