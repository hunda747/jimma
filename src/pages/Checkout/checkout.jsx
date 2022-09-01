import React, {useRef, useState, useEffect} from 'react'
import NavBar from '../../component/Navbar/navbar';
import Footer from '../../component/Footer/footer';
import './checkout.css'

import ReactMapGL , {Marker} from 'react-map-gl';
// import {  Input, Button , message } from 'antd';
import {  Input, Button  } from '@material-ui/core';
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
  const {cartItems} = cart;
  // console.log(cartItems);

  // const product = useSelector((state) => state.getProduct.products)
  // const user = useSelector((state) => state.getUser.user);
  // console.log(user);
  let users = [];

  useEffect(() => {
    sessionStorage.setItem('reachedCheckout', true);
  })

  const [viewPort , setViewPort] = useState({
    latitude:9.022875,
    longitude: 38.752261,
    zoom:11,
    width: '100vw',
    height: '100vh'
  })

  const [marker,setMarker] = useState({
    latitude: 9.022875,
    longitude: 38.752261
  });
  
  const [phoneNumber , setPhoneNumber] = useState('');

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
    // console.log(phoneNumber)

    // if(cartItems?.length !== 0){
    if(1){
      // if(phoneNumber === ''  || !/(\+\s*2\s*5\s*1\s*9\s*(([0-9]\s*){8}\s*))|(0\s*9\s*(([0-9]\s*){8}))/.test(phoneNumber) || phoneNumber.length !== 10 ){
      if(0){
        message.error("Phone Number Is Invalid")
      }else{
        if(1){
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
              date, "63087c390e95be7180d3f744", getTotalProductPrice(), 
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
  
          let purchased = false;
          let reachCheck = false;
          // if (sessionStorage.getItem('purchased') === null) {
          //   console.log('purchased found');
          //   purchased = sessionStorage.getItem('purchased');
          // }else{
          //   console.log('purchased not found');
          //   console.log(sessionStorage.getItem('purchased'));
          //   purchased = false;
          // }
          // if (sessionStorage.getItem('user') === null) {
          //   reachCheck = sessionStorage.getItem('reachedCheckout');
          //   console.log('userr found');
          // }else{
          //   console.log('user not found');
          //   reachCheck = false;
          // }
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
    <div className='checkout_main'>
      <NavBar/>
        <div className='checkout'>
          <div className='checkoutPath'>
            <p className='pathContent'>
              Home     /       Shopping Cart    / Checkout</p>
          </div>
          <div className="checkoutTitleHolder">
            <h3>Checkout</h3>
          </div>


          <div className="checkoutSteps">
            <div className="stepTitle">
              <p>Step 1 - Delivery Details</p>
            </div>
            <div className="stepOneContainer">
              <div className="mapHolder">
                <ReactMapGL {...viewPort} 
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
                
                  <Marker latitude={marker.latitude} longitude={marker.longitude} />

                </ReactMapGL>   
            
            </div>
            <div className="stepOneInfo">
              <div className="infoHolder">
                <div className="lngLat">
                  <div className="latHolder"> <Input prefix="Lat" value={marker.latitude}  disabled /></div>
                  <div className="lngHolder"><Input prefix="Lng" value={marker.longitude} disabled /></div>
                </div>

                <div className="locationName">
                  <Input prefix={<LocationOnIcon />} placeholder={selectedLocation.formatted} 
                  // <Input prefix={<LocationOnIcon />} placeholder={selectedLocation.city + "  -  " + selectedLocation.county + "  -  " + selectedLocation.suburb +  "  -  " + selectedLocation.road} 
                  value={mapLocation} 
                  disabled  />
    
                </div>

                <div className="phoneNumber">
                  <Input type="number" 
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
            {cartItems.length === 0?(
              <p className='cartEmpty'>  Your Cart Is Empty:  <span> <SentimentVeryDissatisfiedIcon /></span>  </p>
              ): cartItems.map((item)=>
                <CartItem 
                  item={item} 
                  qtyChangeHandler={qtyChangeHandler} 
                  removeFromCartHandler={removeFromCartHandler}    
              /> 
              )} 

          
            <div className="checkoutInfo" >
              <div className="checkoutInfoWrapper">
                <div className="infoBox">
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
                </div>
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
            <Button onClick={handleConfirm} type="primary" contained> Order </Button>
          </div>

        </div>
      </div>
   {/* <ContactUs/> */}

      <Footer/>
    </div>
  )
}




















