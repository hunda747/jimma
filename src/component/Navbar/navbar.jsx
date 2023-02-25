import React, { useState, useEffect, Fragment } from "react";
import logo from "../../assets/photo/tole_black_no_text.png";
// import logo from "../../assets/photo/TOLE.png";
// import logo from "../../assets/photo/tolo-dark.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart } from "@material-ui/icons";
import { useCookies } from "react-cookie";
import classes from "./navbar.module.scss";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@material-ui/core/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

import {
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Typography,
  // Settings,
  Tooltip,
  // PersonAdd,
  // Logout,
  ListItemIcon,
  Box,
} from "@mui/material";
import { Logout } from "@mui/icons-material";

export default function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = true;

  const changeNavBg = () => {
    window.scrollY >= 40 ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  const handleLogout = () => {
    removeCookie("ToleDUfname", { path: "/" });
    removeCookie("ToleDUlname", { path: "/" });
    removeCookie("ToleDUphoneNo", { path: "/" });
    removeCookie("ToleDUuid", { path: "/" });
    navigate("/");
    window.location.reload(false);
  };

  const [anchorEl, setAnchorEl] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    console.log("inside handle click");
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    console.log("set menu close");
    setOpen(false);
    setAnchorEl(null);
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce(
      (qtyCounter, item) => Number(item.qtyCounter) + qtyCounter,
      0
    );
  };

  const menuToggleHandler = () => {
    setMenuOpen((e) => !e); // set opposite to what is given
  };

  return (
    <>
      <div className={`${navBg ? classes.bg : classes.bg_tr}`}>
        <header className={classes.header}>
          <div className={classes.header__content}>
            <div
              onClick={() => {
                navigate("/");
              }}
              className={classes.header__content__logo}
            >
              <div className={classes.header__content__logo__wrap}>
                <img src={logo} alt="Logo" />
              </div>
              <div className={classes.header__content__logo__name}>
                <span>TOLE DELIVERY</span>
              </div>
            </div>

            <nav
              className={`${classes.header__content__nav} ${
                menuOpen ? classes.isMenu : ""
              }`}
              style={
                menuOpen
                  ? {
                      boxShadow: "1px 12px 19px 0px rgba(0,0,0,0.75)",
                      webkitBoxShadow: "1px 12px 19px 0px rgba(0,0,0,0.75)",
                      mozBoxShadow: "1px 12px 19px 0px rgba(0,0,0,0.75)",
                    }
                  : {}
              }
            >
              <ul>
                <li>
                  <Link to="/" onClick={() => setMenuOpen(false)}>
                    {" "}
                    <div className={classes.header__content__nav__menus}>
                      <span
                        className={`${
                          location.pathname === "/" ? classes.current : ""
                        }`}
                      >
                        Home
                      </span>
                    </div>
                  </Link>
                </li>
                {/* <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  {" "}
                  Shop
                </Link>
              </li> */}
                <li>
                  <Link to="/about" onClick={() => setMenuOpen(false)}>
                    {" "}
                    <span
                      className={`${
                        location.pathname === "/about" ? classes.current : ""
                      }`}
                    >
                      About
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact" onClick={() => setMenuOpen(false)}>
                    {" "}
                    <span
                      className={`${
                        location.pathname === "/contact" ? classes.current : ""
                      }`}
                    >
                      Contact
                    </span>
                  </Link>
                </li>

                <li>
                  {cookies?.ToleDUuid ? (
                    <div
                      className={classes.header__content__nav__controllers}
                      style={menuOpen ? { width: "100%" } : {}}
                    >
                      <Fragment>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            justifyContent: "center",
                            // marginleft: "8rem",
                            // marginRight: "2rem",
                          }}
                          // style={{
                          //   marginLeft: "6rem",
                          //   marginRight: "2rem",
                          // }}
                        >
                          <Tooltip title="Account settings">
                            <IconButton
                              onClick={handleClick}
                              size="small"
                              sx={{ ml: 2 }}
                              aria-controls={open ? "account-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                            >
                              {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
                              <AccountCircleIcon
                                sx={{ width: 32, height: 32 }}
                                style={
                                  // menuOpen
                                  {
                                    cursor: "pointer",
                                    //marginRight: "0.5rem",
                                    fontSize: "40px",
                                    color: "black",
                                    // color: "rgb(255 219 0)",
                                    // border: "1px solid black",
                                  }
                                  // : {}
                                }
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose}
                          onClick={handleClose}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                              fontFamily: "sans-serif",
                              overflow: "visible",
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                              mt: 5.5,
                              mr: 5.5,
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
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              navigate("/account");
                            }}
                            sx={{
                              padding: "0 20px",
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "6px",
                            }}
                          >
                            <ListItemIcon>
                              <Avatar
                                fontSize="small"
                                sx={{
                                  width: "8px",
                                  height: "8px",
                                  fontFamily: "sans-serif",
                                }}
                              />
                            </ListItemIcon>{" "}
                            <span style={{ fontFamily: "sans-serif" }}>
                              Profile
                            </span>
                          </MenuItem>
                          {/* <MenuItem>
                            <Avatar /> My account
                          </MenuItem> */}
                          <Divider />

                          <MenuItem
                            onClick={handleLogout}
                            sx={{
                              padding: "0 20px",
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "6px",
                            }}
                          >
                            <ListItemIcon>
                              <Logout
                                fontSize="big"
                                sx={{
                                  width: "28px",
                                  height: "28px",
                                  // scale: "1.5",
                                }}
                              />
                            </ListItemIcon>
                            <span style={{ fontFamily: "sans-serif" }}>
                              Logout
                            </span>
                          </MenuItem>
                        </Menu>
                      </Fragment>
                      {/* </div> */}
                    </div>
                  ) : (
                    <div className={classes.header__content__nav__controllers}>
                      <Link
                        to="/login"
                        style={
                          !menuOpen
                            ? { width: "fit-content", marginLeft: "5rem" }
                            : { marginLeft: "0rem" }
                        }
                      >
                        <Button
                          variant="contained"
                          className={
                            classes.header__content__nav__controllers__login
                          }
                          // color="black"
                          style={{
                            // borderRadius: 35,
                            backgroundColor: "black",
                            color: "white",

                            // padding: "18px 36px",
                            // fontSize: "18px",
                          }}
                        >
                          Login
                        </Button>
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
            </nav>

            <div className={classes.header__content__toggle}>
              {!menuOpen ? (
                <MenuOutlined onClick={menuToggleHandler} />
              ) : (
                <AiOutlineClose onClick={menuToggleHandler} />
              )}
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
