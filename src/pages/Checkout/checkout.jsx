import React, { useRef, useState, useEffect } from "react";
// import NavBar from "../../component/Navbar/navbar";
import NavBar from "../../component/Layout/Navbar/navbar";
import Footer from "../../component/Footer/footer";
import "./checkout.scss";
import "mapbox-gl/dist/mapbox-gl.css";

import ReactMapGL, { Marker } from "react-map-gl";
import { Input, message } from "antd";
// import {  Input, Button  } from '@material-ui/core';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../component/cartItem/cartItem";

import { createOrders } from "../../redux/actions/orderActions";
import {
  addToCart,
  changeToCart,
  removeFromCart,
  clearCart,
} from "../../redux/actions/cartActions";
// import { sellProduct } from '../../../redux/actions/productActions';
import {
  LocalShippingOutlined,
  LocalPhoneOutlined,
  MonetizationOnOutlined,
  RedeemOutlined,
} from "@material-ui/icons";

import mapboxgl from "mapbox-gl";
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
// import { clearCart } from '../../../redux/actions/cartActions';
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import axios from 'axios';
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { Alert } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

export default function Checkout() {
  const vertical = "top";
  const horizontal = "center";
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["user"]);
  // const localhost = "http://localhost:5000/";
  const localhost = process.env.REACT_APP_BASE_URL;
  // const localhost = "http://tolodeliveryjimma.com/";
  const [errMsg, setErrMsg] = useState("");
  const [load, setLoad] = useState(false);
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order.orders);
  const [show, setShow] = useState(false);
  const { cartItems } = cart;
  // console.log(cartItems);
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  };

  const handleClose = () => {
    setShow(false);
  };

  // const product = useSelector((state) => state.getProduct.products)
  // const user = useSelector((state) => state.getUser.user);
  // console.log(user);
  let users = [];

  useEffect(() => {
    sessionStorage.setItem("reachedCheckout", true);
    handleLocation(7.6746, 36.8406);
  }, []);

  const [viewPort, setViewPort] = useState({
    latitude: 7.6746,
    longitude: 36.8406,
    zoom: 14,
    width: "100vw",
    height: "100vh",
  });

  const [marker, setMarker] = useState({
    latitude: 7.6746,
    longitude: 36.8406,
  });

  const [phoneNumber, setPhoneNumber] = useState(cookies.ToleDUphoneNo);
  const [deliveryPrice, setDeliveryPrice] = useState(35);

  let printIt = (data) => {
    console.log(data);
    data?.map((val) => {
      console.log(val.formatted);
      setMapLocation(val.formatted);
    });
  };

  const [selectedLocation, setSelectedLocation] = useState({
    country: "",
    city: "",
    county: "",
    suburb: "",
    road: "",
    formatted: "",
  });
  const [mapLocation, setMapLocation] = useState("");

  const handleLocation = async (lati, long) => {
    const resp = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lati}+${long}&key=018d9986cb5c483380337c7f6526c2fe`
    );
    console.log("this is my local");

    console.log(resp.data);
    setSelectedLocation({
      ...selectedLocation,
      country: resp.data.results[0].components.country,
      city: resp.data.results[0].components.state,
      county: resp.data.results[0]?.components?.county,
      suburb: resp.data.results[0]?.components?.suburb,
      road: resp.data.results[0].components.road,
      formatted: resp.data.results[0].formatted,
    });

    console.log(resp);
    console.log(selectedLocation);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const p = position.coords;
      console.log(p.latitude, p.longitude);
      setMarker({
        latitude: p.latitude,
        longitude: p.longitude,
      });
      handleLocation(p.latitude, p.longitude);
      setViewPort({
        ...viewPort,
        latitude: p.latitude,
        longitude: p.longitude,
      });
    });
  };

  const handleDOubleConfirm = (event) => {
    event.preventDefault();
    console.log("PURCHASE");
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setLoad(true);
    console.log("In handle confirm");
    const date = new Date();
    console.log("this is the ordered phone number");
    console.log(phoneNumber);

    if (cartItems?.length !== 0) {
      // if(1){
      if (
        phoneNumber === "" ||
        !/(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/.test(
          phoneNumber
        ) ||
        phoneNumber.length !== 10
      ) {
        setLoad(false);
        message.error("Phone Number Is Invalid");
      } else {
        if (cookies?.ToleDUuid) {
          let orderItems = [];
          cartItems.map((item) => {
            console.log(item);
            const singleProduct = {
              foodId: item.id,
              foodName: item.food_name,
              foodPrice: item.price,
              foodRestaurantId: item.restaurant,
              foodQuantity: item.qtyCounter,
            };
            orderItems.push(singleProduct);
          });
          console.log(orderItems);

          try {
            let costTotal = getTotalProductPrice();
            let no_item = getCartCount();

            console.log(costTotal);
            console.log(no_item);
            console.log(typeof orderItems);
            const orderDetail = JSON.stringify(orderItems);
            console.log(orderDetail);
            axios
              .post(
                `${localhost}/api/order/addOrder`,
                {
                  date: date,
                  userId: cookies?.ToleDUuid,
                  total: getTotalProductPrice(),
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                  contact: phoneNumber,
                  no_item: no_item,
                  orders: orderItems,
                  ordersDetail: orderDetail,
                  address: selectedLocation.formatted,
                },
                config
              )
              .then((res) => {
                console.log(res);
                dispatch(clearCart());
                sessionStorage.setItem("purchased", true);
                message.success("Order Placed");
                // setShow(true);
                navigate("/");
              })
              .catch((err) => {
                console.log(err);
              });
            // console.log(order);
          } catch (e) {
            console.log(e);
          } finally {
            setLoad(false);
          }

          console.log(phoneNumber);
          // dispatch(clearCart());
        } else {
          setLoad(false);
          message.error("Order Place Failed: Check if you are logged in");
        }
      }
    } else {
      setLoad(false);
      navigate("/");
      message.error("Your cart is empty");
    }
  };

  const qtyChangeHandler = (id, qty) => {
    dispatch(changeToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  //handle how many items are in the total cart
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

  return (
    <>
      {!cartItems.length === 0 ? (
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
      ) : (
        <></>
      )}
      <div className="checkout_main">
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={show}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={"success"}
            sx={{ width: "100%" }}
          >
            Order placed
          </Alert>
        </Snackbar>
        <div className="navbar_holder">
          <NavBar />
        </div>

        <div className="checkout">
          <div className="checkoutTitleHolder">
            <h3>Checkout</h3>
          </div>

          <div className="checkoutSteps">
            <div className="stepTitle">
              <p>Step 1 - Delivery Details</p>
            </div>
            <div className="stepOneContainer">
              <div className="mapHolder">
                <ReactMapGL
                  {...viewPort}
                  mapboxAccessToken="pk.eyJ1IjoiZGFuaGdiIiwiYSI6ImNsMXVnNDIxbzAwMmYzcXBiMXB0ZWVjcWMifQ.nC63RhWneFhiZ4k4XJim9A"
                  onMove={(viewPort) => {
                    setViewPort(viewPort);
                  }}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  onClick={(viewPort) => {
                    setMarker({
                      latitude: viewPort.lngLat.lat,
                      longitude: viewPort.lngLat.lng,
                    });
                    console.log(viewPort);
                    // setMapLocation()
                    handleLocation(viewPort.lngLat.lat, viewPort.lngLat.lng);
                  }}
                >
                  <Marker
                    latitude={marker.latitude}
                    longitude={marker.longitude}
                  />
                </ReactMapGL>
              </div>
              <div className="stepOneInfo">
                <div className="infoHolder">
                  <div className="getCurrentLocation">
                    <button onClick={getLocation}>
                      <span>
                        <svg
                          width="14px"
                          height="20px"
                          viewBox="0 0 14 20"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          {/* <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch --> */}
                          <title>location_on</title>
                          <desc>Created with Sketch.</desc>
                          <g
                            id="Icons"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Rounded"
                              transform="translate(-377.000000, -1306.000000)"
                            >
                              <g
                                id="Communication"
                                transform="translate(100.000000, 1162.000000)"
                              >
                                <g
                                  id="-Round-/-Communication-/-location_on"
                                  transform="translate(272.000000, 142.000000)"
                                >
                                  <g>
                                    <polygon
                                      id="Path"
                                      points="0 0 24 0 24 24 0 24"
                                    ></polygon>
                                    <path
                                      d="M12,2 C8.13,2 5,5.13 5,9 C5,13.17 9.42,18.92 11.24,21.11 C11.64,21.59 12.37,21.59 12.77,21.11 C14.58,18.92 19,13.17 19,9 C19,5.13 15.87,2 12,2 Z M12,11.5 C10.62,11.5 9.5,10.38 9.5,9 C9.5,7.62 10.62,6.5 12,6.5 C13.38,6.5 14.5,7.62 14.5,9 C14.5,10.38 13.38,11.5 12,11.5 Z"
                                      id="🔹Icon-Color"
                                      fill="#1D1D1D"
                                    ></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </span>
                      <span>Get my current location</span>
                    </button>
                  </div>
                  <div className="locationName">
                    <h3>Address</h3>
                    <input
                      prefix={<LocationOnIcon />}
                      placeholder={selectedLocation.formatted}
                      value={mapLocation}
                      disabled
                      style={{ border: "1px solid black" }}
                    />
                    <p className="orderParagraph">
                      Click on the map the area you want the order to be
                      delivered
                    </p>
                  </div>
                  <div className="phoneNumber">
                    <h3>Phone number:</h3>
                    <input
                      type="text"
                      placeholder="09########"
                      value={phoneNumber}
                      className="phone_number_input"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      style={{ border: "1px solid black" }}
                    />
                    <p className="orderParagraph">
                      You can change the phone nuber. we will call you to this
                      number to confirm your order.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="stepTitle">
              <p>Step 2 - Confirm Shopping Cart</p>
              <br />
            </div>
            <div className="cartConfirm">
              {cartItems.length === 0 ? (
                <p className="cartEmpty">
                  <span>
                    {" "}
                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                  </span>
                  Your Cart Is Empty:
                </p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <CartItem
                      item={item}
                      qtyChangeHandler={qtyChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
                  <table className="totalInfoTable" align="right">
                    <tr>
                      <td>Price:</td>
                      <td>{getTotalProductPrice()} Birr</td>
                    </tr>
                    <tr>
                      <td>Delivery price:</td>
                      <td>{deliveryPrice} Birr</td>
                    </tr>
                    <tr className="bold">
                      <td>Total: </td>
                      <td>{getTotalProductPrice() + deliveryPrice} Birr</td>
                    </tr>
                  </table>
                </>
              )}

              <div className="checkoutInfo">
                <div className="checkoutInfoWrapper">
                  {/* <div className="infoBox">
                  <div className="selectedItems">
                    <div className="tag">
                      <p>Selected Items:</p> 
                    </div>
                    <div className="amount">
                      <p className='itemCountNumber'> {getCartCount()} </p>
                    </div>
                  </div>

                  <div className="total"  style={{background: '#c3ffc0'}} >
                      <div className="tag">
                          <p>SubTotal Price:</p> 
                      </div>
                      <div className="amount">
                        <p className='totalPriceNumber'>${getTotalProductPrice().toFixed(2)} </p>
                      </div>
                  </div> 
                </div> */}
                </div>
              </div>
            </div>

            <div className="stepTitle">
              <p>Step 3 - Payment Methods</p>
            </div>
            <div className="payment">
              <div className="memberDiscount">
                <MonetizationOnOutlined
                  fontSize="large"
                  className="contentIcon"
                />
              </div>
              <div className="memberDiscountInfo">
                <p className="contentTitle">Cash on Delivery</p>
                <p className="contentDetail">Pay with cash after</p>
              </div>
            </div>

            {/* <div className="payment_methods">
            <div className="featuredInfo">
              <div className="content">
                <div className="memberDisountContent">
                  <div className="memberDiscount">
                    <MonetizationOnOutlined       
                      className='contentIcon'/>
                  </div>
                  <div    
                    className='memberDiscountInfo'>
                      <p className='contentTitle'>
                        Cash on Delivery
                      </p>
                      <p className='contentDetail'>
                        Pay with cash after
                      </p>
                  </div>
                </div>  
              </div>
            </div>
          </div> */}

            <Button onClick={handleConfirm}
              className='order-btn'
              variant='outlined'
            // sx={{ marginBlock: 3, marginInline: 'auto', color: '#ffdb00', borderColor: '#ffdb00', width: '50%' }}
            >
              {load ? (
                <div className="orderLoader">
                  <CircularProgress />
                </div>
              ) : (
                <div> Order </div>
              )}
            </Button>
          </div>
        </div>
        {/* <ContactUs/> */}

        <Footer />
      </div>
    </>
  );
}
