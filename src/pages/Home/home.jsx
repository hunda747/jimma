import React, {useState, useEffect} from 'react';
import './home.css'

import photo from '../../assets/photo/bj5.jpg';
import photoBg from '../../assets/photo/bj5Edit.jpg';

import {Favorite, SearchIcon} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';

import {Twitter, Instagram, Facebook, LinkedIn, AccountCircle, LocationOn, List, ShoppingCart} from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../redux/actions/restaurantAction';

import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  const restaurants = useSelector(state => state.restaurant.restaurant);

  console.log(restaurants);

  const handleLogout = () => {
    removeCookie('fname', { path: '/' });
    removeCookie('lname', { path: '/' });
    removeCookie('phoneNo', { path: '/' });
    removeCookie('uid', { path: '/' });
    window.location.reload(false);
  }

  return(
    <>
      <div className='wrapper'>

        {/* <div className="navbar_main">
          <div className="container">
            <div className="navbar">
              <div className="logo">
                <a href="/">
                  <img src={logo} alt="logo" height={'100px'}/>
                  Jimma Delivery
                </a>
              </div>
              <div className="menu">
                <div className="icons">
                  <ShoppingCart fontSize="large"/>
                  <Favorite  fontSize="large"/>
                </div>
                {cookies?.uid ? 
                  <>
                    <div className="btn">
                      {cookies.fname}
                    </div>
                    <div className="btn" onClick={handleLogout}>
                        Logout
                    </div>
                  </>
                : 
                 <>
                  <div className="btn">
                    <Link to='/login'>
                      Sign In
                    </Link>
                  </div>
                  <div className="btn">
                    <Link to='/register'>
                      Sign Up
                    </Link>
                  </div>
                 </>
                }
              </div>
            </div>
          </div>
        </div> */}
        <Navbar />

        <header className='showcase'>
          <div className='container'>
            {/* <div className='showcase_main'>
              <h1>Want Outstanding Grades</h1>
              <p>Start improving your grades today with our solved topical past paper question</p>
              <div className="buttons">
                <Link to={`/login/false`}>
                  <a className='btn_primary' href="/login">Register</a>
                </Link>
                <Link to={`/question`}>
                  <a className='btn_primary' href="/question">Free Quesions</a>
                </Link>
              </div>
            </div> */}
            <div className="hero">
              {/* <h1>Get food from your favorite restaurants in Jimma delivered to your home or office.</h1> */}
              <h1>Order food to your home or office.</h1>
              <div className="searchBar">
                <input class="search__input" type="text" placeholder="Search" />
                <button className='btn_search'>OOO</button>
              </div>
              <p><a href="/">Sign In</a> for your recent addresses</p>
            </div>
          </div>
        </header>

        <div className='main_rest'>
          <div className="">
            <h1>Featured Restaurants</h1>

            <div className="restaurants">
              {
                restaurants?.map((restaurant) => {
                  return(
                    <div className="restaurant">
                      <Link to={`/detail/${restaurant._id}`}>
                        <img src={restaurant.img} width='100%' height='280px' alt="img " />
                        <h3>{restaurant.name}</h3>
                        <p>{restaurant.description}</p>
                        <div className="status">
                          <p className='open'>open</p>
                        </div>
                      </Link>
                    </div>
                  )
                })
              }
              
            </div>

          </div>
        </div>

        <div className="info">
          <div className="container">
            <h1>How it works</h1>
            <div className="items">
              <div className="item">
                <LocationOn fontSize="large"/>
                <h3>Select a restaurant</h3>
                <p>Once you login and set your location, you'll be able to see all the restaurants around you within your delivery range. Pick a restaurant from the map to see their opening hours, learn more, and see their menu.</p>
              </div>
              <div className="item">
                <List fontSize="large"/>
                <h3>Browse their menu</h3>
                <p>Once you've selected the restaurant you'd like to order from, take a look at their menu to figure out what you'd like to eat. Place your choices in your basket, tell us how many you'd like to order, and place your order!?</p>
              </div>
              <div className="item">
                <ShoppingCart  fontSize="large"/>
                <h3>Place your order</h3>
                <p>Once you have all your choices in your cart, click on "Place your order" and you'll receive an e-mail or SMS confirmation of your order. Sit back and relax and we'll work to get it delivered to your door in an hour or less*</p>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="container">
            <div className="copy">
              Copywright 
            </div>
            <div className="icons">
              <Twitter />
              <Facebook />
              <Instagram />  
              <LinkedIn />
            </div>
          </div>
        </footer>
      </div>
    </>
  )
};
