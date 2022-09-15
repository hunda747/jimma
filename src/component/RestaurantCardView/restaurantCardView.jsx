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
    // <div classNameName="restaurant" 
    //   onClick={() => {
    //     handleClick();
    //     props.changePage(10)}
    //   }>
    //     <img src={props.img} width='50px' height='50px' alt="img " />
    //     <h3>{props.name}</h3>
    //     {/* <p>{props.description}</p> */}
    //     {/* <div classNameName=""> */}
    //       <p classNameName='open'>open</p>
    //     {/* </div> */}
    //     <button>edit</button>
    //   </div>
    <div  className="column" 
          onClick={() => {
           handleClick() }}>
      <div className="post-module hover">
        <div className="thumbnail">
            <img src={props.img}/>
        </div>
        <div className="post-content">
          <div className="category">Photos</div>
          <h1 className="title">{props.name}</h1>
          <p className="description">{props.description}</p>
          {/* <div classNameName="post-meta"> */}
            {/* <Rating rating={props.rating}/> */}
          {/* </div> */}
          {/* <div className="post-meta">
            <span className="timestamp">
              <i className="fa fa-clock-o"></i> 
              6 mins ago
            </span>
            <span className="comments">
              <i className="fa fa-comments"></i>
              <a href="#"> 39 comments</a>
            </span>
          </div> */}
        </div>
      </div>
    </div>
  )
}