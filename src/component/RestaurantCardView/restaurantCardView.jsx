import React from 'react';


import './restaurantCardView.scss'

import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { getFoodsByRestaurant } from '../../redux/actions/foodAction';
import { useNavigate } from 'react-router-dom';

import Rating from '../../component/displayStar'

export default function RestaurantCardView(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/detail/${props.id}`);
  }

  return (
      <>
        <div className='restCard'>
            <div className="restCardWrapper">
                <div className="restCardImageHolder">
                  <img src="https://media.istockphoto.com/photos/pan-fried-duck-picture-id1081422898?k=20&m=1081422898&s=612x612&w=0&h=YkfQqtV3nN1gB_HaehyvjcTEye7w9FBPkG-PIKdDzPo=" alt="" />
                 

                <div className="restCardInfoHolder">
                      <div className="restCardInfo">
                            <div className="restCardInfoHeader">
                                 <h1>Name</h1>
                            </div>
                            <div className="restCardInfoActions">
                                <button>Locate</button>
                                <button>View</button>
                                <button>Share</button>
                            </div>
                            <div className="restCardInfoDesc">
                                <p>Description info</p>
                            </div>
                      </div>
                </div>

                </div>
                
            </div>
           
        </div>

      
      
      </>




    // <div  className="column" 
    //       onClick={() => {
    //        handleClick() }}>
    //   <div className="post-module hover">
    //     <div className="thumbnail">
    //         <img src={props.img}/>
    //     </div>
    //     <div className="post-content">
    //       <div className="category">Photos</div>
    //       <h1 className="title">{props.name}</h1>
    //       <p className="description">{props.description}</p>
     
    //     </div>
    //   </div>
    // </div>
  )
}