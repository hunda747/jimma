import React, {useState, useEffect} from 'react';
import './home.scss'

import Feature from '../../component/Feature/feature'

import photo from '../../assets/photo/bj5.jpg';
import photoBg from '../../assets/photo/bj5Edit.jpg';
// import hero from '../../assets/photo/bj5Edit.jpg';
import hero from '../../assets/photo/fhero_img.png';

import {Favorite, SearchIcon} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import Navbar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import Star from '../../component/displayStar';
import RestaurantCardView from '../../component/RestaurantCardView/restaurantCardView';
import RestaurantCard from '../../component/RestaurantCard/restaurantCard';
import {Twitter, Instagram, Facebook, LinkedIn, AccountCircle, LocationOn, List, ShoppingCart, Search} from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../redux/actions/restaurantAction';

import { CircularProgress} from '@material-ui/core';


import { useCookies } from 'react-cookie';

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
 
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  const restaurants = useSelector(state => state.restaurant.restaurant);

  console.log(restaurants);

    const handleLogout = () => {
      removeCookie('fname', { path: '/' });
      removeCookie('lname', { path: '/' });
      removeCookie('phoneNo', { path: '/' });
      removeCookie('uid', { path: '/' });
      window.location.reload(false);
    }

  return(
    <>
      <div className='wrapper'>

        <Navbar />

        <Feature />   

        <div className='main_rest'>
          <div className="">

            {
              restaurants.length !== 0 ?
              <>
                <h1>Featured Restaurants</h1>
                  <div className='cards'>
                  {
                    restaurants?.map((restaurant, index) => {
                      return(      
                        <Link  to={`/detail/${restaurant._id}`}>
                                      
                          <RestaurantCard 
                              Name={restaurant.name}
                              image={restaurant.img}
                              rating={restaurant.rating}
                              description={restaurant.description}
                          />
                         </Link> 
                     
             
                      )}
                    )
                  }
                  </div>
              </>
              :
                <div className='center'>
                  <CircularProgress />
                </div>
            }          

          </div>
        </div>



        <Footer />
      </div>
    </>
  )
};
