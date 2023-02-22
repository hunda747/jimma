import React from 'react'

import './deliveryDash.css'

import {useState} from 'react'
// import {Link} from 'react-router-dom'
// import {Switch,Router, BrowserRouter,Route} from 'react-router-dom';
//imports for material ui menu navigation
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


//new ui for delivery boi
import { alpha } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
//import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
//import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import { Button } from '@material-ui/core'
//material ui menu navigation drawer things
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ListAltOutlined } from '@material-ui/icons';

// import Orders from '../../../pages/ProductManager/orders/orders';
import Order_list from '../../../component/Delivery/order_list/order_list'
import OrderHistory from '../../../component/Delivery/orderHistory/orderHistoy';
// import { getAdminUserName } from '../../../redux/actions/userActions';

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Profile from '../../../component/Admin/Profile/profile';
import axios from 'axios';


//new UI for delivery boi
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const localhost = 'https://jimma-e-comm.herokuapp.com/';
export default function Delivery_Dashboard() {
  
  const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    //material ui menu navigation
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
 
    const handleLogout = (e) => {
      e.preventDefault();
      removeCookie('ADemail', {path: '/'});
      removeCookie('ADrole', {path: '/'});
      removeCookie('ADaccess_token', {path: '/'});
      navigate('/adminstrationLogin');
    }

    useEffect(()=>{
      // dispatch(getAdminUserName(cookies.ADemail));
    },[])

    // const data = useSelector((state) => state.getUser)
    // const {user , loading , error} = data;
    const loading = false;
    const error = false;
    const user = {
      user_name : "name",
      email : "email.gmail.com",
      user_role : "Admin",
      sign_up_date : "2022-55-66"
    }

    console.log(user);

    const [orderNotification , setOrderNotification] = useState(0)
      
    const Order = useSelector(state => state.getOrder);
    // const {badge_loading , orders, badge_error} = Order;

    useEffect(()=>{
      const getPendingOrderCount = async () =>{
        try {
          const response = await axios.get(localhost + '/api/getPendingOrderCount');
          setOrderNotification(response.data)
        } catch (error) {
          setOrderNotification('...')
        }
      } 
      getPendingOrderCount();
    }, [dispatch])


    // new ui for delivery boi
    //const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorOption , setAnchorOption] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
   //track index of the components clicked
  const [compCounter , setCompCounter] = useState(0); 

  const isMenuOpen = Boolean(anchorEl);
  const isMenuOptionOpen = Boolean(anchorOption);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuOptionOpen = (event)=>{
    setAnchorOption(event.currentTarget);
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleGoToProfile = () => {
    setCompCounter(2);
    setAnchorEl(null);
    setAnchorOption(null)
    handleMobileMenuClose();
  };
  const handleGoToOrdeers = ()=>{
    setCompCounter(0);
    setAnchorEl(null);
    setAnchorOption(null)
    handleMobileMenuClose();
  }
  const handleGoToOrderHistory = ()=>{
    setCompCounter(1);
    setAnchorEl(null);
    setAnchorOption(null)
    handleMobileMenuClose();
  }
  const handleMenuClose = ()=>{ 
    setAnchorEl(null);
    setAnchorOption(null)
    handleMobileMenuClose();
  }
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem >
      {
        loading? <p>Loading...</p> : error? <p>{error}</p>:
        (
          <div className="delivery_profileInfoHolder">
            <div className='delivery_profileInfWrapper' >
              <div className="delivery_profileIconHolder"     
                onClick={()=>setCompCounter(2)}>
                <AccountCircleIcon/>
              </div>
              <div className="delivery_profileInfo">
                <p>{user.user_name}</p>  
                <span>{cookies.ADemail}</span> 
              </div>
            </div>
          </div>
        )
      }
      
      </MenuItem>
      <MenuItem onClick={handleGoToProfile}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderOption = (
    <Menu
        anchorEl={anchorOption}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={isMenuOptionOpen}
        onClose={handleMenuClose}
    >
      <MenuItem onClick={handleGoToOrdeers} >Orders</MenuItem>
      <MenuItem onClick={handleGoToOrderHistory} >Order History</MenuItem>
      
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={orderNotification} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );



  return (  
    <>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleMenuOptionOpen}
            >
              <MenuIcon />
            </IconButton>
            
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show new Order notifications" color="inherit">
                <Badge badgeContent={orderNotification} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {renderOption}
      </div>

      <div className="deliveryWrapper">
        {
          compCounter === 0? <Order_list />:
          compCounter === 1? <OrderHistory /> :
          compCounter === 2? <Profile userName={user.user_name}  email={user.email} role={user.user_role} signUpDate={user.sign_up_date} /> : ""
        }
      </div>
    </>
  )
}
