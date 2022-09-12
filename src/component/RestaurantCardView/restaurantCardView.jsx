import React from 'react';
import './restaurantCardView.css';

import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getFoodsByRestaurant } from '../../redux/actions/foodAction';
import { useNavigate } from 'react-router-dom';

import Rating from '../../component/displayStar'

export default function restaurantCardView(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/detail/${props.id}`);
  }

  return (
    // <div className="restaurant" 
    //   onClick={() => {
    //     handleClick();
    //     props.changePage(10)}
    //   }>
    //     <img src={props.img} width='50px' height='50px' alt="img " />
    //     <h3>{props.name}</h3>
    //     {/* <p>{props.description}</p> */}
    //     {/* <div className=""> */}
    //       <p className='open'>open</p>
    //     {/* </div> */}
    //     <button>edit</button>
    //   </div>
    <div  class="column" 
          onClick={() => {
           handleClick() }}>
      <div class="post-module hover">
        <div class="thumbnail">
            <img src={props.img}/>
        </div>
        <div class="post-content">
          <div class="category">Photos</div>
          <h1 class="title">{props.name}</h1>
          <p class="description">{props.description}</p>
          {/* <div className="post-meta"> */}
            {/* <Rating rating={props.rating}/> */}
          {/* </div> */}
          {/* <div class="post-meta">
            <span class="timestamp">
              <i class="fa fa-clock-o"></i> 
              6 mins ago
            </span>
            <span class="comments">
              <i class="fa fa-comments"></i>
              <a href="#"> 39 comments</a>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  )
}