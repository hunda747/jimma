import React , {useState, useEffect,useRef} from 'react'
import './restaurantList.css'

import { useDispatch, useSelector, useSelectore } from 'react-redux'
import { getAllRestaurants } from '../../../redux/actions/restaurantAction';
import {Link} from 'react-router-dom';
import RestaurantList from '../../RestaurantCard/restaurantCart';
import {message} from 'antd'

// for the input hider
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios'

//for the input hider
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));


export default function RestuarantList({onMorePage}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const errRef = useRef();
  //error message
  const [errMsg ,setErrMsg]  = useState('')
  const [addAccErr , setAddAccErr] = useState('');
	const loading = false;
	const error = false;

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  const restaurants = useSelector(state => state.restaurant.restaurant);

  return (
    <div className='restaurantList'>
			<div className="wrapper">
        <div className="header">
          <h2>Restaurant List</h2>
        </div>
        <div className="restaurants">
          {
            restaurants?.map((restaurant) => {
              return(
                <RestaurantList 
                  changePage = {onMorePage}
                  id = {restaurant._id}
                  img = {restaurant.img}
                  name = {restaurant.name}
                  description = {restaurant.description}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
