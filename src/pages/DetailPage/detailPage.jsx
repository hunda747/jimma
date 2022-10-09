import React, {useState, useEffect} from 'react';
import './detailPage.css'

import photo from '../../assets/photo/bj5.jpg';

import {Favorite, SearchIcon} from '@material-ui/icons';
import { ShoppingCart, Delete} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import Navbar from '../../component/Navbar/navbar';
import DisplayStars from '../../component/displayStar';
import FoodCard from '../../component/FoodCard/foodCard';
import CartView from '../../component/CartView/cartView';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById } from '../../redux/actions/restaurantAction';
import { getFoodsByRestaurant } from '../../redux/actions/foodAction';
import { removeFromCart} from '../../redux/actions/cartActions'

import { CircularProgress} from '@material-ui/core';
import { useCookies } from 'react-cookie';
import Footer from '../../component/Footer/footer';

export default function DetailView() {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantById(id));
    dispatch(getFoodsByRestaurant(id));
  }, []);

  const restaurants = useSelector(state => state.restaurant.restaurant);
  const allFoods = useSelector(state => state.food);
  const {loading , food , error} = allFoods
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
 
  // console.log(restaurants);
  let restaurant = {};
  restaurants?.map((rest) => {
      restaurant = rest
  });

  const handleDelete = (e) => {
    console.log(e);
    // dispatch(removeFromCart(_id))
  }
  // console.log(foods);

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
      <Navbar />
      <div className="detail">
        <div className="image"> 
          <img src={restaurant.img} alt="image" />
        </div>
        <div className="container">
          <div className="information">
            <h1>{restaurant.name}</h1>
            <div className="rating">
              <p><DisplayStars rating={4}/></p>
            </div>
            <div className="moreInfo">
              <div className="disc">
                <p>{restaurant.description}</p>
              </div>
              <div className="time">
                <p>{restaurant.open_days}</p>
                <p>{restaurant.working_hour}</p>
              </div>
            </div>
          </div>
          <div className="menu">
            <h2>Menu</h2>
            <div className="menu_container">
              {food.length !== 0 ? 
              <>
                <div className="displayMenu">
                  {food?.map((food , index) => {
                    return(
                      <div className="menuItem">
                        <FoodCard 
                          key = {food._id}
                          id = {food._id}
                          name = {food.food_name}
                          desc = {food.description}
                          price = {food.price}
                          restaurant = {food.restaurant}
                          type = {food.type}
                          />
                      </div>
                    )
                  })}
                  
                </div>
                <div className="cartView">
                  <CartView />
                </div>
                {/* <div className="cart">
                  <h1><ShoppingCart fontSize='medium'/> Cart</h1>
                  {
                    cartItems?.map((cart) => {
                      return(
                      <div className="product">
                        <p className="name">{cart.food_name}</p>
                        <p className="qty">{cart.qtyCounter}</p>
                        <p className="price">{cart.price} Birr</p>
                        <div className='action'  onClick={() => {
                          console.log(cart.id);
                          dispatch(removeFromCart(cart.id))
                        }} ><Delete color='red'/></div>
                      </div>
                      )
                    })
                  }
                </div> */}
              </>
              : 
              <div>
                <p>Not Available</p>                
              </div>
              }
            </div>
          </div>
        </div>
      <Footer />
      </div>
    </>
  )
};
