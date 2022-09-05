import React from 'react';
import './navbar.css'

import photo from '../../assets/photo/bj5.jpg';

import {Favorite, SearchIcon} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {Twitter, Instagram, Facebook, LinkedIn, AccountCircle, LocationOn, List, ShoppingCart, ShoppingCartSharp} from '@material-ui/icons';

import { useCookies } from 'react-cookie';

export default function navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  

  const handleLogout = () => {
    removeCookie('fname', { path: '/' });
    removeCookie('lname', { path: '/' });
    removeCookie('phoneNo', { path: '/' });
    removeCookie('uid', { path: '/' });
    window.location.reload(false);
  }

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  
  const getCartCount = ()=>{
    return cartItems.reduce((qtyCounter, item) => Number(item.qtyCounter) + qtyCounter , 0);
  }

  return(
    <>
      <div className="navbar_main">
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <a href="/">
                {/* <img src={logo} alt="logo" height={'100px'}/> */}
                Jimma Delivery
              </a>
            </div>
            <div className="menu">
              {/* <div className="btn">
                <Link to='/login'>
                  Login
                </Link>
              </div> */}
              {cookies?.uid ? 
              <>
                <div className="btn">
                  {cookies?.fname}
                </div>
                <div className="btn" onClick={handleLogout}>
                    Log out
                </div>
              </>
              :
                <div className="btn">
                  <Link to='/register'>
                    Sign Up
                  </Link>
                </div>
              }
              <div className="icons">
                {/* <Link to={'/checkout'}>
                  <ShoppingCart  fontSize="large"/>
                </Link> */}
                <div className="cartIconHolder">
                  <Link to='/checkout'>  
                    <ShoppingCartSharp className='infosIcons' />   
                    <span>{getCartCount()}</span>
                  </Link>
                </div>
                {/* <Favorite  fontSize="large"/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};