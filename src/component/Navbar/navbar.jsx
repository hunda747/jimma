import React from 'react';
import './navbar.css'

import photo from '../../assets/photo/bj5.jpg';

import {Favorite, SearchIcon} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import {Twitter, Instagram, Facebook, LinkedIn, AccountCircle, LocationOn, List, ShoppingCart} from '@material-ui/icons';

import { useCookies } from 'react-cookie';

export default function navbar() {
  
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
              <div className="icons">
                <Link to={'/checkout'}>
                  <ShoppingCart  fontSize="large"/>
                </Link>
                <Favorite  fontSize="large"/>
              </div>
              <div className="btn">
                <Link to='/login'>
                  Login
                </Link>
              </div>
              <div className="btn">
                <Link to='/register'>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};