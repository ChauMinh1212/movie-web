import logo from "./logo.svg";
import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithFacebook,
  loginWithGoogle,
  logOut,
} from "./features/Auth/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Header from "./components/Header/Header";
import ListPage from "./features/Movie/pages/ListPage";
import { Route, Routes } from "react-router-dom";
import MovieFeature from "./features/Movie";
import Testrouter from "./features/router/Testrouter";
import { useResizeDetector } from 'react-resize-detector';
import Footer from "./components/Footer/Footer";

function App() {
  const {height, ref} = useResizeDetector();

  return (
    <div className="App">
      <div className="App_header" ref={ref}>
        <div className="App_wrap">
          <Header></Header>
        </div>
      </div>
      <div className="App_content" style={{marginTop: height, minHeight: `calc(100vh - 210px)`}}>
        <div className="App_wrap">
          <Routes>
            <Route path="/*" element={<MovieFeature />}></Route>
          </Routes>
        </div>
      </div>
      <div className="App_footer">
        <div className="App_wrap">
          <Footer />
        </div>
      </div>
    </div>
    // <Testrouter />
  );
}

export default App;
