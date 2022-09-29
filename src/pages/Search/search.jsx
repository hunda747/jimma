import React, {useState, useEffect} from 'react';
import './search.css'

import photo from '../../assets/photo/bj5.jpg';
import photoBg from '../../assets/photo/bj5Edit.jpg';
import hero from '../../assets/photo/bj5Edit.jpg';

import {Favorite, SearchIcon} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';

import FoodCard from '../../component/FoodCard/foodCard';
import CartView from '../../component/CartView/cartView';
import Star from '../../component/displayStar';
import RestaurantCardView from '../../component/RestaurantCardView/restaurantCardView';

import { useParams } from 'react-router-dom';

import {Twitter, Instagram, Facebook, LinkedIn, AccountCircle, LocationOn, List, ShoppingCart, Search} from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../redux/actions/restaurantAction';
import { searchFood } from '../../redux/actions/foodAction';

import { CircularProgress} from '@material-ui/core';

import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function SearchPage() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  
  const {name} = useParams();
  const [search, setSearch ] = useState(name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(name);
  useEffect(() => {
    dispatch(searchFood(name));
  }, []);

  // const restaurants = useSelector(state => state.restaurant.restaurant);
  const foods = useSelector(state => state.food);
  const {loading , food , error} = foods;

  console.log(foods);

    const handleLogout = () => {
      removeCookie('fname', { path: '/' });
      removeCookie('lname', { path: '/' });
      removeCookie('phoneNo', { path: '/' });
      removeCookie('uid', { path: '/' });
      window.location.reload(false);
    }

  return(
    <>

    
{
        loading? 
        <>
             <div className='loader'>
                 <div class="container">
                    <svg width="100" height="100" viewBox="0 0 300 300">
                      <defs>
                        <linearGradient id="gradient-fill" gradientUnits="userSpaceOnUse" x1="0" y1="300" x2="300" y2="0">
                          <stop offset="0%">
                            <animate attributeName="stop-color" values="#00E06B;#CB0255;#00E06B" dur="5s" repeatCount="indefinite" />
                          </stop>
                          <stop offset="100%">
                            <animate attributeName="stop-color" values="#04AFC8;#8904C5;#04AFC8" dur="8s" repeatCount="indefinite" />
                          </stop>
                        </linearGradient>
                        <clipPath id="clip">
                          <rect class="square s1" x="0" y="0" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s2" x="100" y="0" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s3" x="200" y="0" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s4" x="0" y="100" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s5" x="200" y="100" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s6" x="0" y="200" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s7" x="100" y="200" rx="12" ry="12" height="90" width="90"></rect>
                        </clipPath>
                      </defs>
                      <rect class="gradient" clip-path="url('#clip')" height="300" width="300"></rect>
                    </svg>
                  </div>
              </div>
        </>: 
        error? <>Server Error</>:
        <></>
      }
      <div className='wrapper'>
        <Navbar />

        <header className='search'>
          <div className='containerdd'>
            <div className="hero">
              {/* <h1>Get food from your favorite restaurants in Jimma delivered to your home or office.</h1> */}
              <h1>Order food to your home or office.</h1>
              {/* <p>Best cook and best delivery at your service </p> */}
              <div className="searchBar">
                <input 
                class="search__input" 
                type="text" 
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
                placeholder="Search" />
                {/* <button > */}
                <div className='btn_search' onClick={() => {dispatch(searchFood(search))}}>
                {/* <div className='btn_search' 
                  onClick={() => {
                    console.log(search);
                    navigate(`/search/${search}`)
                  }}> */}
                  <Search />
                  {/* <Search style={{background: 'black', display: 'flex', justifyContent: 'center'}}/> */}
                </div>
                {/* </button> */}
              </div>
              {
                cookies?.uid ? 
                  ""
                : 
                <p><a href="/login">Sign In</a> for your recent addresses</p>
              }
            </div>
            {/* <div className="heroImg">
              <img src={hero} alt="hero" />
            </div> */}
          </div>
        </header>

        <div className="menu_search">
          <h2>Search Result</h2> 
          <div className="menu_container">
            {food.length !== 0 ? 
            <>
              <div className="displayMenu">
                {food?.map((food) => {
                  return(
                    <div className="menuItem">
                      <FoodCard 
                        key = {food._id}
                        id = {food._id}
                        name = {food.food_name}
                        desc = {food.description}
                        price = {food.price}
                        type = {food.type}
                        />
                    </div>
                  )
                })}
                
              </div>
              <div className="cartView">
                <CartView />
              </div>
            </>
            : 
            <div>
                <p>Not Available</p>
            </div>
            }
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
};
