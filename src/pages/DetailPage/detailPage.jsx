import React, {useState, useEffect} from 'react';
import './detailPage.css'

import photo from '../../assets/photo/bj5.jpg';

import {Favorite, SearchIcon} from '@material-ui/icons';
import { ShoppingCart, Delete} from '@material-ui/icons';
import {Link} from 'react-router-dom';

import Navbar from '../../component/Navbar/navbar';
import DisplayStars from '../../component/displayStar';
import FoodCard from '../../component/FoodCard/foodCard';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById } from '../../redux/actions/restaurantAction';
import { getFoodsByRestaurant } from '../../redux/actions/foodAction';

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
  const foods = useSelector(state => state.food.food);
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
 
  // console.log(restaurants);
  let restaurant = {};
  restaurants?.map((rest) => {
      restaurant = rest
  });

  // console.log(foods);

  return(
    <>
      <Navbar />
      <div className="detail">
        <div className="image"> 
          <img src={photo} alt="image" />
        </div>
        <div className="container">
          <div className="information">
            <h1>{restaurant.name}</h1>
            <DisplayStars rating={4}/>
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
            {/* <h2>Menu</h2> */}
            <div className="menu_container">
              <div className="displayMenu">
                {foods?.map((food) => {
                  console.log('inside food');
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
              <div className="cart">
                <h1><ShoppingCart fontSize='medium'/> Cart</h1>
                {
                  cartItems?.map((cart) => {
                    return(
                    <div className="product">
                      <p className="name">{cart.food_name}</p>
                      <p className="name">{cart.qtyCounter}</p>
                      <p className="name">{cart.price} Birr</p>
                      <p><Delete /></p>
                    </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      <Footer />
      </div>
    </>
  )
};
