import React, {useEffect} from 'react'
import './addOrder.css'

import FoodCard from '../../FoodCard/foodCard'
import CartView from '../../CartView/cartView';

import { useState } from 'react';
import { message, Upload } from 'antd';
import { Input,Button } from 'antd';

import {ArrowBack} from '@material-ui/icons';
import {MenuItem, Select} from '@mui/material';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
// import UseStorage from '../firebase/useStorage';

import { ShoppingCart, Delete} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrders } from '../../../redux/actions/orderActions';
import { getAllRestaurants } from '../../../redux/actions/restaurantAction';
import { getFoodsByRestaurant } from '../../../redux/actions/foodAction';
import { clearCart } from '../../../redux/actions/cartActions';

// import {CircularProgress, CircularProgressWithLabel} from '@mui/material';
import {Box} from '@mui/material'

export default function AddRestaurant({onMorePage}) {
	const dispatch = useDispatch();
	const [restaurantData, setRestaurantData] = useState('');
	const [addressData, setAddressData] = useState('');
	const [phoneData, setPhoneData] = useState('');
	
	useEffect(() => {
		dispatch(getAllRestaurants());
	}, []);

  const restaurants = useSelector(state => state.restaurant.restaurant);
  const foods = useSelector(state => state.food.food);
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

  const getCartCount = ()=>{
    return cartItems.reduce((qtyCounter, item) => Number(item.qtyCounter) + qtyCounter , 0);
  }

  //handle total price calculation
  const getTotalProductPrice = ()=>{
    return cartItems.reduce((price , item)=> item.price * item.qtyCounter + price , 0)
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setRestaurantData(e.target.value);
    dispatch(getFoodsByRestaurant(e.target.value));
  }

  const handleSubmit = (e) => {
    console.log('order');
    event.preventDefault();
    event.stopPropagation();
    console.log("In handle confirm")
    const date = new Date();
    console.log("this is the ordered phone number")

    if(1){
      // if(phoneNumber === ''  || !/(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/.test(phoneNumber) || phoneNumber.length !== 10 ){
      if(0){
        message.error("Phone Number Is Invalid")
      }else{
        if(1){
          let orderItems = [];
          cartItems.map((item)=>{
            const singleProduct = {
              "foodId": item.id,
              "foodQuantity": item.qtyCounter
            }
          orderItems.push(singleProduct);
          });
          console.log(orderItems);
          try{
            let costTotal = getTotalProductPrice();
            let no_item = getCartCount();

            console.log(costTotal); 
            console.log(no_item);
            dispatch(createOrders(
              date, "63087c390e95be7180d3f744",getTotalProductPrice(), 
              0,
              0,
              phoneData,
              no_item,
              orderItems,
              addressData));
            }catch(e){
              console.log(e);
            }
            
            message.success("Order Placed");
            handleCancel();
          }
          else{
            message.error("Order Place Failed: Check if you are logged in");
          }
      }
    }else{
      // navigate('/');
      message.error("Your cart is empty")
    }  
  }
  
  const handleCancel = () => {
    console.log('cancel');
    dispatch(clearCart());
    setAddressData('');
    setPhoneData('');
    setRestaurantData('');
    // dispatch(getFoodsByRestaurant('1222'));
  }

  return (
    <div className='add_order'>
      <div className="add_product_order">
        <div className="form_side">
          <div className="tops">
            <Button onClick={() => {
              onMorePage(0);
            }}> <ArrowBack fontSize='small'/> </Button>
            <h3>Add Orders</h3>
          </div>
        </div>
        <div className="orders">
          <div className="menu">
            <div className="rest_list">
              <h3>choose restaurant</h3>
              <div className="restaurants">
                <Select
                  value={restaurantData}
                  className={'rest_select'}
                  onChange={handleChange}
                >
                  {
                    restaurants.map((restaurant) => {
                      return(
                        <MenuItem value={restaurant._id}
                        className={'rest_select'}>
                          {restaurant.name}
                        </MenuItem>
                      )
                    })
                  }
                </Select>
              </div>
            </div>
            <div className="food_list">
              {/* <h3>Food list</h3> */}
              <div className="foods">
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
            </div>
          </div>
          <div className="cart_main">
            
            <CartView />
            {/* {
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
            } */}
          </div>

          <div className="address">
            <h3>Address</h3>
            <input 
            type="text" 
            placeholder='address'
            value={addressData}
            onChange={(e) => {
              setAddressData(e.target.value)
            }}
            />
            <h3>Phone number</h3>
            <input 
            type="text" 
            placeholder='Phone number'
            value={phoneData}
            onChange={(e) => {
              setPhoneData(e.target.value)
            }}
            />
          </div>

          <div className="buttonHolder">
            <button className='add_product_btn' onClick={handleSubmit} >Add Order</button>
            <button 
            className='add_product_cancel_btn' onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}





