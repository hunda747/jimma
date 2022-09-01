import React from 'react';
import './restaurantCard.css';


import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getFoodsByRestaurant } from '../../redux/actions/foodAction';

export default function RestaurantList(props) {
  const dispatch = useDispatch();  

  const handleClick = () => {
    dispatch(getFoodsByRestaurant(props.id));
  }

  return (
    <div className="restaurant">
      <div onClick={() => {
        handleClick();
        props.changePage(10)}
      }>
        <img src={props.img} width='100%' height='280px' alt="img " />
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <div className="status">
          <p className='open'>open</p>
        </div>
      </div>
    </div>
  )
}