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
    <div className="restaurant" 
      onClick={() => {
        handleClick();
        props.changePage(10)}
      }>
        <img src={props.img} width='50px' height='50px' alt="img " />
        <h3>{props.name}</h3>
        {/* <p>{props.description}</p> */}
        {/* <div className=""> */}
          <p className='open'>open</p>
        {/* </div> */}
        <button>edit</button>
      </div>
  )
}