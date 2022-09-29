import React, {useRef, useState, useEffect} from 'react'
import NavBar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import './checkout.scss'
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapGL , {Marker} from 'react-map-gl';
import {  Input, Button , message } from 'antd';
// import {  Input, Button  } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../component/cartItem/cartItem';
import { createOrders } from '../../redux/actions/orderActions';
import { addToCart, changeToCart, removeFromCart, clearCart } from '../../redux/actions/cartActions'
// import { sellProduct } from '../../../redux/actions/productActions';
import {LocalShippingOutlined,LocalPhoneOutlined,MonetizationOnOutlined,RedeemOutlined} from '@material-ui/icons';

// import { clearCart } from '../../../redux/actions/cartActions';


import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import axios from 'axios';
import axios from 'axios'

export default function Checkout() {

  const errRef = useRef();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies (['user']);

  const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems);

  // const product = useSelector((state) => state.getProduct.products)
  // const user = useSelector((state) => state.getUser.user);
  // console.log(user);
  let users = [];

  useEffect(() => {
    sessionStorage.setItem('reachedCheckout', true);
  })

  const [viewPort , setViewPort] = useState({
    latitude:7.6746,
    longitude: 36.8406,
    zoom:14,
    width: '100vw',
    height: '100vh'
  })

  const [marker,setMarker] = useState({
    latitude: 7.6746,
    longitude: 36.8406
  });
  
  const [phoneNumber , setPhoneNumber] = useState('');
  const [deliveryPrice , setDeliveryPrice] = useState(35);

  let printIt = (data) => {
    console.log(data);
    data?.map((val) => {
      console.log(val.formatted);
    setMapLocation(val.formatted);
    })
  }

  const [selectedLocation , setSelectedLocation] = useState({
    country: '',
    city:'',
    county:'',
    suburb:'',
    road:'',
    formatted: ''
  })
  const [mapLocation, setMapLocation] = useState("");

  const handleLocation = async () => {
    const resp = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${marker.latitude}+${marker.longitude}&key=018d9986cb5c483380337c7f6526c2fe`)
    console.log("this is my local")

    console.log(resp.data);
    setSelectedLocation({...selectedLocation , 
      country: resp.data.results[0].components.country , city: resp.data.results[0].components.state ,
      county: resp.data.results[0]?.components?.county , 
      suburb: resp.data.results[0]?.components?.suburb , 
      road: resp.data.results[0].components.road,
      formatted: resp.data.results[0].formatted})

    console.log(resp)
    console.log(selectedLocation)

  }

  const handleDOubleConfirm = (event) => {
    event.preventDefault();
    console.log("PURCHASE");
  }

  const handleConfirm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("In handle confirm")
    const date = new Date();
    console.log("this is the ordered phone number")
    console.log(phoneNumber)

    if(cartItems?.length !== 0){
    // if(1){
      if(phoneNumber === ''  || !/(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/.test(phoneNumber) || phoneNumber.length !== 10 ){
        message.error("Phone Number Is Invalid")
      }else{
        if(cookies?.uid){
          let orderItems = [];
          cartItems.map((item)=>{
            const singleProduct = {
              "foodId": item.id,
              "foodQuantity": item.qtyCounter
            }
          orderItems.push(singleProduct);
          });
          console.log(orderItems);

          try{
            let costTotal = getTotalProductPrice();
            let no_item = getCartCount();
            // cartItems.map((item)=>{
            //   const pro = product.find(x => x._id === item.product).productCostPrice;
            //   costTotal += pro*item.qtyCounter;
            //   no_item += Number(item.qtyCounter);
            // });
            
            // date = userId = total = latitude = longitude = contact = no_item  = orderItems, address

            console.log(costTotal); 
            console.log(no_item);
            dispatch(createOrders(
              date, 
              cookies?.uid, 
              getTotalProductPrice(), 
              marker.latitude,
              marker.longitude, 
              phoneNumber, 
              no_item,
              orderItems, 
              selectedLocation.formatted));
            dispatch(clearCart());
          }catch(e){
            console.log(e);
          }
          
            // const pro = product.find(x => x.id === item.product).cost;
            // console.log(pro*item.qtyCounter);
            // dispatch(createOrderDetails(date, item.product , item.qtyCounter, item.price))
            // dispatch(sellProduct(item.product , item.qtyCounter))
          sessionStorage.setItem('purchased', true);
          console.log(phoneNumber)
          // dispatch(clearCart());
          message.success("Order Placed");

          navigate('/');
        }
        else{
          message.error("Order Place Failed: Check if you are logged in");
        }
      }
    }else{
      navigate('/');
      message.error("Your cart is empty")
    }  
  }


  const qtyChangeHandler = (id,qty) =>{
    dispatch(changeToCart(id,qty))
  }

  const removeFromCartHandler=(id) =>{
      dispatch(removeFromCart(id));
  }

  //handle how many items are in the total cart
  const getCartCount = ()=>{
    return cartItems.reduce((qtyCounter, item) => Number(item.qtyCounter) + qtyCounter , 0);
  }

  //handle total price calculation
  const getTotalProductPrice = ()=>{
    return cartItems.reduce((price , item)=> item.price * item.qtyCounter + price , 0)
  }
   

  return (

    <>
       {
        !cartItems.length === 0? 
        <>
             <div className='loader'>
                 <div class="container">
                    <svg width="100" height="100" viewBox="0 0 300 300">
                      <defs>
                        <linearGradient id="gradient-fill" gradientUnits="userSpaceOnUse" x1="0" y1="300" x2="300" y2="0">
                          <stop offset="0%">
                            <animate attributeName="stop-color" values="#00E06B;#CB0255;#00E06B" dur="5s" repeatCount="indefinite" />
                          </stop>
                          <stop offset="100%">
                            <animate attributeName="stop-color" values="#04AFC8;#8904C5;#04AFC8" dur="8s" repeatCount="indefinite" />
                          </stop>
                        </linearGradient>
                        <clipPath id="clip">
                          <rect class="square s1" x="0" y="0" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s2" x="100" y="0" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s3" x="200" y="0" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s4" x="0" y="100" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s5" x="200" y="100" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s6" x="0" y="200" rx="12" ry="12" height="90" width="90"></rect>
                          <rect class="square s7" x="100" y="200" rx="12" ry="12" height="90" width="90"></rect>
                        </clipPath>
                      </defs>
                      <rect class="gradient" clip-path="url('#clip')" height="300" width="300"></rect>
                    </svg>
                  </div>
              </div>
        </>:       
        <></>
      }
    <div className='checkout_main'>
      <NavBar/>
        <div className='checkout'>
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
                  onMove={(viewPort)=> { setViewPort(viewPort)}}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  onClick={(viewPort)=> { 
                    setMarker({
                      latitude: viewPort.lngLat.lat,
                      longitude: viewPort.lngLat.lng
                    }) 
                  console.log(viewPort);
                  // setMapLocation()
                  handleLocation()
                    }}
                >
                  <Marker latitude={marker.latitude} longitude={marker.longitude}/>
                </ReactMapGL>   
              </div>
              <div className="stepOneInfo">
                <div className="infoHolder">
                  {/* <div className="lngLat">
                    <div className="latHolder"> <Input prefix="Lat" value={marker.latitude}  disabled /></div>
                    <div className="lngHolder"><Input prefix="Lng" value={marker.longitude} disabled /></div>
                  </div> */}

                  <div className="locationName">
                    <h3>Address</h3>
                    <input prefix={<LocationOnIcon />} placeholder={selectedLocation.formatted} 
                    value={mapLocation} 
                    disabled  />
                  </div>
                  <div className="phoneNumber">
                    <h3>Phone number:</h3>
                    <input type="text" 
                      placeholder='09########'
                      value={phoneNumber}
                      className='phone_number_input'
                      onChange={(e)=> setPhoneNumber(e.target.value) } 
                      />
                  </div>
                </div>
              </div>
          </div>
        
          <div className="stepTitle">
            <p>Step 2 - Confirm Shopping Cart</p>
          </div>
          <div className="cartConfirm">
            {cartItems.length === 0? (
              <p className='cartEmpty'>  
                Your Cart Is Empty:  <span> <SentimentVeryDissatisfiedIcon /></span>  
              </p>
              ): cartItems.map((item)=>
                <CartItem 
                  item={item} 
                  qtyChangeHandler={qtyChangeHandler} 
                  removeFromCartHandler={removeFromCartHandler}    
              /> 
              )} 

          
            <div className="checkoutInfo" >
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
                <table align='right'>
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
              </div>
            </div>
          </div>


          <div className="stepTitle">
            <p>Step 3 - Payment Methods</p>
          </div>

          <div className="payment_methods">
            <div className="featuredInfo">
              <div className="featuredInfoWrapper">
                <div className="content">
                  <div className="contentWrapper" style={{justifyContent:"left"}}>                          
                    <div className="memberDisountContent">
                      <div className="memberDiscount">
                          <MonetizationOnOutlined  className='contentIcon'/>
                        <div className='memberDiscountInfo'>
                            <p className='contentTitle'>Cash on Delivery</p>
                            <p className='contentDetail'>Pay with cash after</p>
                        </div>
                      </div>
                    </div>                 
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="confirmOrder">
            <button className='btn_order' onClick={handleConfirm}> Order </button>
          </div>

        </div>
      </div>
   {/* <ContactUs/> */}

      <Footer/>
    </div>
  </>
  )
}




















