import React, { useState } from "react";
import PropTypes from "prop-types";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../Auth/firebaseConfig";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import movieApi from "../../../../api/movieApi";
import { async } from "@firebase/util";
import MovieList from "../../components/MovieList";
import './style.scss'

FollowPage.propTypes = {};

function FollowPage(props) {
  const user = useSelector((state) => state.user.current);
  const [followList, setFollowList] = useState([]);
  const [followsID, setFollowsID] = useState([]);
  useEffect(() => {
    setFollowsID([])
    setFollowList([])
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
  console.log("FollowsID", followsID);
  console.log("FollowsList", followList);
  return (
    <div>
      {!user.uid ? (
        "Please Login to use this feature"
      ) : (
        <>
          {followsID.length !== 0 ? <p className="follow__header">Your Follows</p> : <p className="follow__header">You haven't followed any movies yet? Follow your favorite movies then come back</p>}
          <MovieList movieList={followList} />
        </>
      )}
    </div>
  );
}

export default FollowPage;
