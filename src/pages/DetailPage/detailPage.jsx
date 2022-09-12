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
  const foods = useSelector(state => state.food.food);
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
                <CircularProgress style={{color: "black"}} />
                
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
