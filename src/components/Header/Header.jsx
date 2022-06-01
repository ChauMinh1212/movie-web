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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSubMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setAnchorEl(null);
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

  if(matches === false) {
    const headerMenu = document.querySelector(".header__bot");
    const overplay = document.querySelector(".overplay");
    if(headerMenu){
      headerMenu.style.display = "block";
    }
  }else{
    const headerMenu = document.querySelector(".header__bot");
    if(headerMenu){
      headerMenu.style.display = "none";
    }

  }

  return (
    <div className="header">
      <div className="header__top">
        <Link to="/">
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
          <>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={openSubMenu ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openSubMenu ? "true" : undefined}
            >
              <div className="header__avatar">
                <img src={user.photoURL} referrerpolicy="no-referrer"></img>
              </div>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openSubMenu}
              onClose={handleCloseSubMenu}
              onClick={handleCloseSubMenu}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Avatar /> {user.displayName}
              </MenuItem>
              <MenuItem onClick={handleClickLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
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
