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
  const foods = useSelector(state => state.food.food);

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
          <h2>Result</h2> 
          <div className="menu_container">
            {foods.length !== 0 ? 
            <>
              <div className="displayMenu">
                {foods?.map((food) => {
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
              <CircularProgress style={{color: "black"}} />
            </div>
            }
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
};
