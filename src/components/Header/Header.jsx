import React, { createRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./style.scss";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import SearchField from "../form-control/SearchFiled";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  loginWithFacebook,
  loginWithGoogle,
} from "../../features/Auth/userSlice";
import { Logout } from "@mui/icons-material";
import { logOut } from "../../features/Auth/userSlice";
import categoryApi from "../../api/categoryApi";
import { Tab, TabList, Tabs } from "react-tabs";
import { updateCategory } from "../../features/Movie/categorySlice";
import { useResizeDetector } from "react-resize-detector";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { db } from "../../features/Auth/firebaseConfig";
import FavoriteIcon from "@mui/icons-material/Favorite";

Header.propTypes = {};

function Header(props) {
  const schema = yup
    .object()
    .shape({
      searchValue: yup.string().required("Please enter your search!"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      searchValue: "",
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const handleSubmit = (values) => {
    navigate(`/search/${values.searchValue}`);
  };
  //handle login
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);

  console.log(user);

  const isLogged = !!user?.uid;

  const handleClickLogin = () => {
    const action = loginWithGoogle();
    dispatch(action);
  };

  const handleClickLogOut = () => {
    const action = logOut();
    dispatch(action);
  };

  const handleOpenSubMenu = () => {
    document.querySelector(".header__submenu").classList.toggle("show");
  };

  window.onclick = function (event) {
    if (!event.target.matches(".header__avatar")) {
      document.querySelector(".header__submenu").classList.remove("show");
    }
  };

  const [category, setCategory] = useState([]);
  category.length = 10;
  useEffect(() => {
    const getCate = async () => {
      const cate = await categoryApi.getCategory();
      setCategory(cate.genres);
    };
    getCate();
  }, []);

  const handleOnChangeCategory = (name) => {
    const action = updateCategory(name);
    dispatch(action);
    if (matches === true) {
      const headerMenu = document.querySelector(".header__bot");
      const overplay = document.querySelector(".overplay");
      headerMenu.style.display = "none";
      overplay.style.display = "none";
    }
  };

  const matches = useMediaQuery("(max-width: 820px)");
  console.log(matches);

  if (matches === false) {
    const headerMenu = document.querySelector(".header__bot");
    const overplay = document.querySelector(".overplay");
    if (headerMenu) {
      headerMenu.style.display = "block";
    }
  } else {
    const headerMenu = document.querySelector(".header__bot");
    if (headerMenu) {
      headerMenu.style.display = "none";
    }
  }

  return (
    <div className="header">
      <div className="header__top">
        <Link to="/?page=1">
          <img src="https://fptplay.vn/images/logo-2.png" alt="logo" />
        </Link>
        <form
          className="header__searchForm"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <SearchField
            name="searchValue"
            form={form}
            label="Search movie"
          ></SearchField>
          <button type="submit" className="header__searchForm__btn">
            <SearchIcon />
          </button>
        </form>
        {!isLogged && (
          <button className="header__button--login" onClick={handleClickLogin}>
            Đăng nhập
          </button>
        )}
        {isLogged && (
          <div className="header__menu">
            <img
              className="header__avatar"
              src={user.photoURL}
              referrerpolicy="no-referrer"
              onClick={handleOpenSubMenu}
            ></img>
            <div className="header__submenu">
              <div className="header__submenu__child">
                <p className="header__submenu__icon">
                  <img
                    className="header__submenu__img"
                    src={user.photoURL}
                    referrerpolicy="no-referrer"
                  />
                </p>
                <p className="header__submenu__name">{user.displayName}</p>
              </div>
              <Link to="/your-follow" style={{textDecoration: 'none', color:'#555555' }}>
                <div className="header__submenu__child">
                  <p className="header__submenu__icon">
                    <FavoriteIcon></FavoriteIcon>
                  </p>
                  <p className="header__submenu__name">My Follows</p>
                </div>
              </Link>
              <div
                className="header__submenu__child"
                onClick={handleClickLogOut}
              >
                <p className="header__submenu__icon">
                  <Logout></Logout>
                </p>
                <p className="header__submenu__name">Log out</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="header__bot">
        <ul className="header__bot__categoryList">
          <NavLink
            to="/"
            className="header__bot__category"
            onClick={() => handleOnChangeCategory(null)}
          >
            All
          </NavLink>
          {category.map((x) => (
            <NavLink
              onClick={() => handleOnChangeCategory(x.id)}
              to={`/category/${x.name}`}
              key={x.id}
              className="header__bot__category"
            >
              {x.name}
            </NavLink>
          ))}
        </ul>
      </div>
      <div
        className="header_subMenu-btn"
        onClick={() => {
          const headerMenu = document.querySelector(".header__bot");
          const overplay = document.querySelector(".overplay");
          headerMenu.style.display = "block";
          overplay.style.display = "block";
        }}
      >
        <MenuIcon />
      </div>
      <div
        className="overplay"
        onClick={() => {
          const headerMenu = document.querySelector(".header__bot");
          const overplay = document.querySelector(".overplay");
          overplay.style.display = "none";
          headerMenu.style.display = "none";
        }}
      ></div>
    </div>
  );
}

export default Header;
