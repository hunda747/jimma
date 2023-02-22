import React, { useEffect } from "react";
import "./addOrder.css";

import FoodCard from "../../FoodCard/foodCard";
import CartView from "../../CartView/cartView";
import AdminCart from "../AdminOrderCart/adminCart";

import { useState } from "react";
import { message, Upload, Input, Button } from "antd";

import { ArrowBack } from "@material-ui/icons";
import { MenuItem, Select } from "@mui/material";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
// import UseStorage from '../firebase/useStorage';

import { ShoppingCart, Delete, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrders } from "../../../redux/actions/orderActions";
import { getAllRestaurants } from "../../../redux/actions/restaurantAction";
import {
  getFoodsByRestaurant,
  searchFood,
} from "../../../redux/actions/foodAction";
import { clearCart } from "../../../redux/actions/cartActions";

// import {CircularProgress, CircularProgressWithLabel} from '@mui/material';
import { Box } from "@mui/material";
import axios from "axios";
// const localhost = "http://localhost:5000/";
const localhost = process.env.REACT_APP_BASE_URL;
// const localhost = "http://tolodeliveryjimma.com/";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export default function AddRestaurant({ onMorePage }) {
  const dispatch = useDispatch();
  const [restaurantData, setRestaurantData] = useState("");
  const [addressData, setAddressData] = useState("");
  const [phoneData, setPhoneData] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, []);

  const restaurants = useSelector((state) => state.restaurant.restaurant);
  const foods = useSelector((state) => state.food.food);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.reduce(
      (qtyCounter, item) => Number(item.qtyCounter) + qtyCounter,
      0
    );
  };

  //handle total price calculation
  const getTotalProductPrice = () => {
    return cartItems.reduce(
      (price, item) => item.price * item.qtyCounter + price,
      0
    );
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setRestaurantData(e.target.value);
    dispatch(getFoodsByRestaurant(e.target.value));
  };

  const handleSubmit = async (e) => {
    console.log("order");
    e.preventDefault();
    e.stopPropagation();
    console.log("In handle confirm");
    const date = new Date();
    console.log("this is the ordered phone number");

    if (cartItems?.length !== 0) {
      if (
        phoneData === "" ||
        !/(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/.test(
          phoneData
        ) ||
        phoneData.length !== 10
      ) {
        console.log("Phone Number Is Invalid");
        message.error({
          content: "Phone Number Is Invalid",
          style: {
            marginTop: "10vh",
          },
        });
      } else if (addressData === "") {
        console.log("Address Is Invalid");
        message.error({
          content: "Address Is Invalid",
          style: {
            marginTop: "10vh",
          },
        });
      } else {
        if (1) {
          var orderItems = [];
          cartItems.map((item) => {
            const singleProduct = {
              foodId: item.id,
              foodName: item.food_name,
              foodPrice: item.price,
              foodRestaurantId: item.restaurant,
              foodQuantity: item.qtyCounter,
            };
            orderItems.push(singleProduct);
          });

          try {
            const costTotal = getTotalProductPrice();
            const no_item = getCartCount();

            console.log(costTotal);
            console.log(no_item);
            console.log(orderItems);
            const orderDetail = JSON.stringify(orderItems);
            console.log(orderDetail);

            const addOrder = localhost + "/api/order/addOrder";
           
            axios
              .post(
                `${localhost}/api/order/addOrder`,
                {
                  date: date,
                  userId: 7,
                  total: costTotal,
                  latitude: 0,
                  longitude: 0,
                  contact: phoneData,
                  no_item: no_item,
                  orders: orderItems,
                  ordersDetail: orderDetail,
                  address: addressData,
                },
                config
              )
              .then((res) => {
                console.log(res);
                message.success({
                  content: "Order Placed",
                  style: {
                    marginTop: "10vh",
                  },
                });
                handleCancel();
              })
              .catch((err) => {
                console.log(err);
                message.error({
                  content: "Order Place Failed: Try again",
                  style: {
                    marginTop: "10vh",
                  },
                });
              });
            // } else {
            //   message.error({
            //     content: "Order Place Failed: Try again",
            //     style: {
            //       marginTop: "10vh",
            //     },
            //   });
            // }
          } catch (e) {
            console.log(e);
            message.error("Order Place Failed: Try again");
          }
        } else {
          message.error("Order Place Failed: Check if you are logged in");
        }
      }
    } else {
      message.error("Your cart is empty");
    }
  };

  const handleCancel = () => {
    console.log("cancel");
    dispatch(clearCart());
    setAddressData("");
    setPhoneData("");
    setRestaurantData("");

    // dispatch(getFoodsByRestaurant('1222'));
  };

  return (
    <div className="add_order">
      <div className="add_product_order">
        <div className="form_side">
          <div className="tops">
            <Button
              onClick={() => {
                onMorePage(0);
              }}
            >
              {" "}
              <ArrowBack fontSize="small" />{" "}
            </Button>
            <h3>Add Orders</h3>
          </div>
        </div>
        <div className="orders">
          <div className="orderAndCard">
            <div className="menu card">
              <div className="searchBar">
                <input
                  class="search__input"
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search"
                />
                {/* <button > */}
                <div
                  className="btn_search"
                  onClick={() => {
                    console.log(search);
                    dispatch(searchFood(search));
                  }}
                >
                  <Search
                    style={{
                      background: "black",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  />
                </div>
              </div>
              <div className="rest_list">
                <h3>choose restaurant</h3>
                <div className="restaurants">
                  <Select
                    value={restaurantData}
                    className={"rest_select"}
                    onChange={handleChange}
                  >
                    {restaurants.map((restaurant) => {
                      return (
                        <MenuItem
                          value={restaurant.id}
                          className={"rest_select"}
                        >
                          {restaurant.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="food_list">
                {/* <h3>Food list</h3> */}
                <div className="foods">
                  {foods?.map((food) => {
                    return (
                      <div className="menuItem">
                        <FoodCard
                          key={food.id}
                          id={food.id}
                          name={food.food_name}
                          desc={food.description}
                          price={food.price}
                          restaurant={food.restaurantsId}
                          type={food.type}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="cart_main card">
              <AdminCart />
            </div>
          </div>

          <div className="address card">
            <h3>Address</h3>
            <input
              type="text"
              placeholder="address"
              value={addressData}
              onChange={(e) => {
                setAddressData(e.target.value);
              }}
            />
            <h3>Phone number</h3>
            <input
              type="text"
              placeholder="Phone number"
              value={phoneData}
              onChange={(e) => {
                setPhoneData(e.target.value);
              }}
            />
          </div>

          <div className="buttonHolder card">
            <button className="add_product_btn" onClick={handleSubmit}>
              Add Order
            </button>
            <button className="add_product_cancel_btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
