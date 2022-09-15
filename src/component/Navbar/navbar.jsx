import React from 'react';
import './navbar.css'

import photo from '../../assets/photo/bj5.jpg';

import {Favorite, SearchIcon, ExitToApp, AccountCircle} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {Twitter, Instagram, Facebook, LinkedIn, LocationOn, List, ShoppingCart, ShoppingCartSharp} from '@material-ui/icons';

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
              <Link to={"/"}>
                {/* <img src={logo} alt="logo" height={'100px'}/> */}
                Jimma Delivery
              </Link>
            </div>
            <div className="menu">
              {/* <div className="btn">
                <Link to='/login'>
                  Login
                </Link>
              </div> */}
              {/* <div className="icons">
                <Link to='/checkout'>
                  <div className="cartIconHolder">
                    <Favorite />
                  </div>
                </Link>
              </div> */}
              <div className="icons">
                <div className="cartIconHolder smaller">
                  <Link to='/checkout'>  
                    <ShoppingCartSharp 
                    
                    className='infosIcons' />   
                    <span>{getCartCount()}</span>
                  </Link>
                </div>
              </div>

              {/* <div className="btn">
                {cookies?.fname}

                <button  onClick={handleLogout}>
                  <ExitToApp />
                </button>
              </div> */}
              {cookies?.uid ? 
                <div className="icons">
                  <div className="accountIconHolder" onClick={handleLogout}>
                    {/* <Link to='/login'> */}
                      <AccountCircle />
                      LOGOUT
                    {/* </Link> */}
                  </div>
                </div>
              :
                <div className="icons">
                  <Link to='/login'>
                    <div className="accountIconHolder">
                      <AccountCircle />
                      LOGIN
                    </div>
                  </Link>
                </div>
              }
                {/* <div className="btn">
                  <Link to='/register'>
                    Sign Up
                  </Link>
                </div> */}
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
};