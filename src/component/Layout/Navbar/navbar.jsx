import React, { useState, useContext, Fragment } from "react";
// import AnchorLink from "react-anchor-link-smooth-scroll";
import "./navbar.scss";
import jigiiLogo from "../../../assets/photo/toleBlackNew.png";
// import jigiiLogo from "../../../assets/photo/tole_black_no_text.png";
import jigiiText from "../../../assets/photo/text_only.png";
import {
  Search,
  MenuOutlined,
  SearchOutlined,
  Campaign,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Alert, Avatar, useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
// import me from "../../asset/photo/NormalPhoto.jpg";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
// import styled from "styled-components";
import { Drawer } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  ExpandMoreOutlined,
  ChevronLeft,
  ChevronRight,
} from "@material-ui/icons";

import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import ReCAPTCHA from "react-google-recaptcha";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
} from "@mui/material";

import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
export let PHONE = "";

const apiUrl = process.env.REACT_APP_API_URL;
export default function Navbar(params) {
  const [openDialogSignup, setOpenDialogSignup] = React.useState(false);
  const [openDialogLogin, setOpenDialogLogin] = React.useState(false);
  const [toggleCreateAccount, setToggleCreateAccount] = useState(true);
  const [termsChecked, setTermsChecked] = useState(false);
  const [enable, setEnable] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [navBg, setNavBg] = useState(false);
  const changeNavBg = () => {
    window.scrollY >= 40 ? setNavBg(true) : setNavBg(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);
  const location = useLocation();

  let token = cookies?.ToleDUuid;
  // let token = localStorage.getItem("access_token");
  const from = location.state?.from?.pathname || "/";
  // console.log(token);
  const navigate = useNavigate();
  const theme = useTheme();
  const node = React.useRef();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [bottomMenu, setBottomMenu] = React.useState(false);
  const [sideMenu, setSideMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [category, setCategory] = React.useState([]);

  const [user, setUser] = useState([]);
  const handleLogout = () => {
    removeCookie("ToleDUfname", { path: "/" });
    removeCookie("ToleDUlname", { path: "/" });
    removeCookie("ToleDUphoneNo", { path: "/" });
    removeCookie("ToleDUuid", { path: "/" });
    navigate("/");
    window.location.reload(false);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useOnClickOutside(node, () => {
    // setOpenMenu(false);
    setSideMenu(false);
    setBottomMenu(false);
  });

  useEffect(() => {
    if (termsChecked && !toggleCreateAccount) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [termsChecked, toggleCreateAccount]);

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  // register code starts here

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <>
      <div className="navbar " id={`${navBg ? "yello" : "white"}`} ref={node}>
        <div className="wraper">
          <div className="left box">
            <div
              className="logo"
              onClick={() => {
                navigate("/");
              }}
            >
              <img src={jigiiLogo} alt="logo" />
              <img src={jigiiText} alt="logoText" className="logoText" />
              {/* <h2 className="name">Tole delivery</h2> */}
            </div>
          </div>
          <div className="middle box">
            {/* <div className="menus"> */}
            <ul>
              {/* <AnchorLink href="#heroSection"> */}
              <li
                className={`${location.pathname === "/" ? "current" : ""}`}
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </li>
              <li
                onClick={() => {
                  navigate("/about");
                }}
                className={`${location.pathname === "/about" ? "current" : ""}`}
              >
                About us
              </li>
              <li
                onClick={() => {
                  navigate("/contact");
                }}
                className={`${location.pathname === "/contact" ? "current" : ""
                  }`}
              >
                Contact us
              </li>
            </ul>
            {/* </div> */}
          </div>
          <div className="right box">
            <div
              className="mobileMenu"
              onClick={() => {
                console.log("inside menu");
                console.log(sideMenu);
                setSideMenu(!sideMenu);
                // setOpenMenu(true);
              }}
            >
              <MenuOutlined />
              {/* <Burger openMenu={openMenu} setOpenMenu={setOpenMenu} />
              <MenuMobile openMenu={openMenu} setOpenMenu={setOpenMenu} /> */}
            </div>
            <ul>
              {!token && (
                <>
                  <li className="login">
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      Login
                    </button>
                  </li>
                  <li className="register">
                    <button
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      Signup
                    </button>
                  </li>
                </>
              )}

              {token && (
                <div className="dropdown">
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
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
                        <span style={{ fontFamily: "sans-serif" }}>Logout</span>
                      </MenuItem>
                    </Menu>
                  </Fragment>
                </div>
              )}
            </ul>
          </div>
        </div>

        {sideMenu ? (
          <div className="sideBard">
            <div className="main">
              {/* <div className="menu">explore</div> */}
              <div className="menu" onClick={() => navigate("/")}>
                Home
              </div>
              <div className="menu" onClick={() => navigate("/about")}>
                About us
              </div>
              <div className="menu" onClick={() => navigate("/contact")}>
                Contact us
              </div>

              {!token && (
                <div className="menu" onClick={() => navigate("/login")}>
                  LOGIN
                </div>
              )}
              {!token && (
                <div className="menu" onClick={() => navigate("/reigster")}>
                  SIGNUP
                </div>
              )}
              {token && (
                <div className="menu" onClick={() => navigate("/account")}>
                  Profile
                </div>
              )}
              {token && (
                <div className="menu" onClick={handleLogout}>
                  Log out
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   // padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   // ...theme.mixins.toolbar,
//   justifyContent: "flex-start",
// }));

// // position: absolute;
// // top: 5%;
// // left: 2rem;
// const StyledBurger = styled.button`
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   width: 2rem;
//   height: 2rem;
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   padding: 0;
//   z-index: 1000;

//   &:focus {
//     outline: none;
//   }

//   div {
//     width: 2rem;
//     height: 0.25rem;
//     background: ${({ openMenu }) => (openMenu ? "#000000" : "#000000")};
//     border-radius: 10px;
//     transition: all 0.3s linear;
//     position: relative;
//     transform-origin: 1px;

//     :first-child {
//       transform: ${({ openMenu }) =>
//         openMenu ? "rotate(45deg)" : "rotate(0)"};
//     }

//     :nth-child(2) {
//       opacity: ${({ openMenu }) => (openMenu ? "0" : "1")};
//       transform: ${({ openMenu }) =>
//         openMenu ? "translateX(20px)" : "translateX(0)"};
//     }

//     :nth-child(3) {
//       transform: ${({ openMenu }) =>
//         openMenu ? "rotate(-45deg)" : "rotate(0)"};
//     }
//   }
// `;

// const StyledMenu = styled.nav`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   background: #effffa;
//   transform: ${({ openMenu }) =>
//     openMenu ? "translateX(0)" : "translateX(300%)"};
//   height: 1000px;
//   z-index: 900;
//   text-align: left;
//   padding: 2rem;
//   position: absolute;
//   top: 0;
//   right: 0;
//   transition: transform 0.3s ease-in-out;

//   @media (max-width: 576px) {
//     width: 100%;
//   }

//   a {
//     font-size: 2rem;
//     text-transform: uppercase;
//     padding: 2rem 0;
//     font-weight: bold;
//     letter-spacing: 0.5rem;
//     color: #0d0c1d;
//     text-decoration: none;
//     transition: color 0.3s linear;

//     @media (max-width: 576px) {
//       font-size: 1.5rem;
//       text-align: center;
//     }

//     &:hover {
//       color: #343078;
//     }
//   }
// `;

const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = (event) => {
      console.log("event.target.className", event.target.className);
      if (
        ref.current?.contains(event.target) ||
        String(event?.target?.className)?.includes("exempt-from-bkgd")
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
