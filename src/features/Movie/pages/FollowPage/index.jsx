import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import movieApi from "../../../../api/movieApi";
import { db } from "../../../Auth/firebaseConfig";
import MovieList from "../../components/MovieList";
import "./style.scss";

FollowPage.propTypes = {};

function FollowPage(props) {
  const user = useSelector((state) => state.user.current);
  const [followList, setFollowList] = useState([]);
  const [followsID, setFollowsID] = useState([]);
  useEffect(() => {
    setFollowsID([]);
    setFollowList([]);
    if (user.uid) {
      try {
        onSnapshot(doc(db, "users", user?.uid), async (doc) => {
          const followsID = doc.data().followsID;
          setFollowsID(followsID);
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [user.uid]);
  useEffect(() => {
    followsID.map(async (x) => {
      const result = await movieApi.getDetail(x);
      setFollowList((x) => [...x, result]);
    });
  }, [followsID]);
  return (
    <div>
      {!user.uid ? (
        "Please Login to use this feature"
      ) : (
        <>
          {followsID.length !== 0 ? (
            <p className="follow__header">Your Follows</p>
          ) : (
            <p className="follow__header">
              You haven't followed any movies yet? Follow your favorite movies
              then come back
            </p>
          )}
          <MovieList movieList={followList} />
        </>
      )}
    </div>
  );
}

export default FollowPage;
