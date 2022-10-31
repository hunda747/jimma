import React from 'react';
import './foodCard.css'

import add from '../../assets/photo/add.png'

import {Favorite, SearchIcon, Add} from '@material-ui/icons';
import {Link} from 'react-router-dom';


import { message } from 'antd';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

export default function DetailView(props) {
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;

  const handleAdd = () => {
    if(cartItems.length === 0){
      dispatch(addToCart(props.id, props.name, props.price, 1, props.restaurant));
      message.success("added to cart");
    }
    else if(props.restaurant === cartItems[0].restaurant){
      dispatch(addToCart(props.id, props.name, props.price, 1, props.restaurant));
      message.success("added to cart");
    }else{
      message.error("You can only order from one restarant")
    }
  }

  return(
    <div className='foodCard'>
      <div className="name">
        <h3>{props.name}</h3>
        <p>{props.desc}</p>
      </div>
      <div className="infos">
        <div className="price">
          <p>{props.price}</p>
          <p>ETB</p>
        </div>
        <div className="add" onClick={handleAdd}>
          <Add className='addIcon'/>
          {/* <img src={add} height={'30px'} alt="ADD" /> */}
        </div>
      </div>
    </div>
  )
};

