import React, {useState, useEffect} from 'react';
import './home.css'

import photo from '../../assets/photo/bj5.jpg';
import photoBg from '../../assets/photo/bj5Edit.jpg';
// import hero from '../../assets/photo/bj5Edit.jpg';
import hero from '../../assets/photo/fhero_img.png';

import {Favorite, SearchIcon} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import Star from '../../component/displayStar';
import RestaurantCardView from '../../component/RestaurantCardView/restaurantCardView';

import {Twitter, Instagram, Facebook, LinkedIn, AccountCircle, LocationOn, List, ShoppingCart, Search} from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../redux/actions/restaurantAction';

import { CircularProgress} from '@material-ui/core';

import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [search, setSearch ] = useState('');
  const navigate = useNavigate();
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

        <Navbar />

        <header className='showcase'>
          <div className='containerdd'>
            <div className="hero">
              {/* <h1>Get food from your favorite restaurants in Jimma delivered to your home or office.</h1> */}
              <h1>Order food to your home or office.</h1>
              <p>Best cook and best delivery at your service </p>
              <div className="searchBar">
                <input 
                class="search__input" 
                type="text" 
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
                placeholder="Search" />
                {/* <button > */}
                <div className='btn_search' onClick={() => {navigate(`/search/${search}`)}}>
                  <Search style={{background: 'black', display: 'flex', justifyContent: 'center'}}/>
                </div>
                {/* </button> */}
              </div>
              <p><a href="/login">Sign In</a> for your recent addresses</p>
            </div>
            <div className="heroImg">
              <img src={hero} alt="hero" />
            </div>
          </div>
        </header>

        <div className='main_rest'>
          <div className="">

            {
              restaurants.length !== 0 ?
              <>
                <h1>Featured Restaurants</h1>
                  <ul className='cards'>
                  {
                    restaurants?.map((restaurant) => {
                      return(
                        <li class="cards_item">
                            <div class="card">
                              <Link to={`/detail/${restaurant._id}`}>
                              <div class="card_image">
                                <img src={restaurant.img} />
                              </div>
                              <div class="card_content">
                                <h2 class="card_title">{restaurant.name}</h2>
                                <p class="card_text">{restaurant.description}</p>
                                {/* <button class="btn card_btn">Read More</button> */}
                              </div>
                                {/* <div className="status">
                                  <p className='open'>open</p>
                                </div> */}
                              </Link>
                            </div>
                        </li>
                      )}
                    )
                  }
                  </ul>
              </>
              :
                <div className='center'>
                  <CircularProgress />
                </div>
            }

            {/* <div className="restaurants">
              {
                restaurants?.map((restaurant) => {
                  return(

                    // <div className="restaurant hover">
                    //     <img src={restaurant.img} width='100%' height='180px' alt="img " />
                    //     <div className="resInfo">
                    //       <h3>{restaurant.name}</h3>
                    //       <div className="rating">
                    //         <p> <Star rating={restaurant.rating}/></p>
                    //       </div>
                    //       <p>{restaurant.description}</p>
                    //     </div>
                    //     <div className="status">
                    //       <p className='open'>open</p>
                    //     </div>
                    //   </Link>
                    // </div>

                    // <RestaurantCardView 
                    //   name = {restaurant.name}
                    //   id = {restaurant._id}
                    //   description = {restaurant.description}
                    //   rating = {restaurant.rating}
                    //   img = {restaurant.img} 
                    // />
                  )
                })
              }
              
            </div> */}

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

        <Footer />
      </div>
    </>
  )
};
