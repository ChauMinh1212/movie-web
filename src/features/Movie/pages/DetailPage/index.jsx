import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/system";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import movieApi from "../../../../api/movieApi";
import { db } from "../../../Auth/firebaseConfig";
import "./style.scss";

DetailPage.propTypes = {};

function DetailPage(props) {
  const mobile = useMediaQuery("(max-width: 480px)");
  const tablet = useMediaQuery("(min-width: 481px) and (max-width: 820px)");
  const IMG_URL = "https://image.tmdb.org/t/p/w500/";
  const param = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const uid = useSelector((state) => state.user.current?.uid);
  const [isFollow, setIsFollow] = useState(false);
  const [followsID, setFollowsID] = useState([]);

  // const unsub = onSnapshot(doc(db, "users", uid), (doc) => {
  //   setFollowsID(doc.data().followsID)
  // });
  if (uid) {
    const getdoc = async () => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      setFollowsID(docSnap.data().followsID);
      setIsFollow(docSnap.data().followsID.includes(movie.id));
    };
    getdoc();
  }

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

  const handleFollow = async () => {
    if (uid) {
      const washingtonRef = doc(db, "users", uid);
      const newFollowsID = [...followsID];
      newFollowsID.push(movie.id);
      await updateDoc(washingtonRef, {
        followsID: newFollowsID,
      });
      setIsFollow(true);
    } else {
    }
  };

  const handleUnfollow = async () => {
    const index = followsID.findIndex((x) => x === movie.id);
    if (index < 0) return;
    const washingtonRef = doc(db, "users", uid);
    const newFollowsID = [...followsID];
    newFollowsID.splice(index, 1);
    await updateDoc(washingtonRef, {
      followsID: newFollowsID,
    });
    setIsFollow(false);
  };

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
          <Box
            width={(mobile && "100%") || "50%"}
            sx={{ padding: (mobile && " ") || "0 20px" }}
          >
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
          <Box
            width={(mobile && "100%") || "30%"}
            sx={{ padding: (mobile && " ") || "0 10px" }}
          >
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
              {isFollow && !!uid ? (
                <button
                  onClick={handleUnfollow}
                  className="movie_detail_desc_btn--unfollow"
                >
                  <FavoriteIcon />
                  <span>Unfollow</span>
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  type="button"
                  className="movie_detail_desc_btn--follow"
                  disabled={!uid}
                >
                  <FavoriteIcon />
                  <span>Follow</span>
                  <p className="follow_alert">Please login to follow movie</p>
                </button>
              )}

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
