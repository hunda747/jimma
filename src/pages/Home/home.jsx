import React, { useState, useEffect } from "react";
import "./home.scss";

import CartShow from "../../component/CartShow/cartShow";
import Feature from "../../component/Feature/feature";
import InfinitScroll from "../../component/InfinitScroll/infinitScroll";
import photo from "../../assets/photo/bj5.jpg";
import photoBg from "../../assets/photo/bj5Edit.jpg";
// import hero from '../../assets/photo/bj5Edit.jpg';
import hero from "../../assets/photo/fhero_img.png";

import { Favorite, SearchIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/navbar";
import Footer from "../../component/Footer/footer";
import Star from "../../component/displayStar";
import RestaurantCardView from "../../component/RestaurantCardView/restaurantCardView";
import RestaurantCard from "../../component/RestaurantCard/restaurantCard";
import {
  Twitter,
  Instagram,
  Facebook,
  LinkedIn,
  AccountCircle,
  LocationOn,
  List,
  ShoppingCart,
  Search,
} from "@material-ui/icons";

import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../redux/actions/restaurantAction";

import { CircularProgress } from "@material-ui/core";

import { useCookies } from "react-cookie";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  const rests = useSelector((state) => state.restaurant);
  const { loading, restaurant, error } = rests;

  console.log(restaurant);
  console.log(loading);

  const handleLogout = () => {
    removeCookie("fname", { path: "/" });
    removeCookie("lname", { path: "/" });
    removeCookie("phoneNo", { path: "/" });
    removeCookie("uid", { path: "/" });
    window.location.reload(false);
  };

  return (
    <>
      {loading ? (
        <>
          <div className="loader">
            <div class="container">
              <svg width="100" height="100" viewBox="0 0 300 300">
                <defs>
                  <linearGradient
                    id="gradient-fill"
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="300"
                    x2="300"
                    y2="0"
                  >
                    <stop offset="0%">
                      <animate
                        attributeName="stop-color"
                        values="#00E06B;#CB0255;#00E06B"
                        dur="5s"
                        repeatCount="indefinite"
                      />
                    </stop>
                    <stop offset="100%">
                      <animate
                        attributeName="stop-color"
                        values="#04AFC8;#8904C5;#04AFC8"
                        dur="8s"
                        repeatCount="indefinite"
                      />
                    </stop>
                  </linearGradient>
                  <clipPath id="clip">
                    <rect
                      class="square s1"
                      x="0"
                      y="0"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s2"
                      x="100"
                      y="0"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s3"
                      x="200"
                      y="0"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s4"
                      x="0"
                      y="100"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s5"
                      x="200"
                      y="100"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s6"
                      x="0"
                      y="200"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                    <rect
                      class="square s7"
                      x="100"
                      y="200"
                      rx="12"
                      ry="12"
                      height="90"
                      width="90"
                    ></rect>
                  </clipPath>
                </defs>
                <rect
                  class="gradient"
                  clip-path="url('#clip')"
                  height="300"
                  width="300"
                ></rect>
              </svg>
            </div>
          </div>
        </>
      ) : error ? (
        <>Server Error</>
      ) : (
        <></>
      )}
      <div className="wrapper">
        <CartShow />
        <div className="navbar_holder">
          <Navbar />
        </div>

        <Feature />

        <br />

        <div className="infinitScrollerContainer">
          <InfinitScroll />
        </div>

        <div className="main_rest">
          <div className="">
            {/* {restaurant?.length > 0 ? (
              <>
                <h1>Featured Restaurants</h1>
                <div className="cards">
                  {restaurant?.map((restaurant, index) => {
                    return (
                      <Link to={`/detail/${restaurant.id}`}>
                        <RestaurantCard
                          Name={restaurant.name}
                          image={restaurant.img}
                          rating={restaurant.rating}
                          description={restaurant.description}
                        />
                      </Link>
                    );
                  })}
                </div>
              </>
            ) : ( */}
            <div className="soon">
              <p>Comming soon</p>
            </div>
            {/* <div>
              <p>Server Unavailable</p>
            </div> */}
            {/* )} */}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
