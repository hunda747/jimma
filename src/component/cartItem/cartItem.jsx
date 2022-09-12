import React from 'react'
import './cartItem.css'
import { Link } from 'react-router-dom'
import {DeleteOutline} from '@material-ui/icons'
import { Add, Remove} from '@material-ui/icons';
import photo from '../../assets/photo/pizza.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart, changeToCart} from '../../redux/actions/cartActions'

export default function CartItem({
    item , 
    qtyChangeHandler ,removeFromCartHandler}) {
        // console.log(item);
    const dispatch = useDispatch();

  return (
    <div className='cartItem'>
        <div className="cartItemHolder">
            {/* <div className='cartItem_img'>
            <Link to={`/`}>
                <img src={photo} 
                 alt={item.food_name} 
                 />
            </Link>
            </div> */}

            {/* <p className='cartItem_brand'>
                "item.brand"
                {item.brand}
            </p> */}

            <Link to={`/`}>
                <p className='cartItem_name'>
                    {item.food_name}</p>            
            </Link>

            <p className='cartItem_price'>
                {item.price} birr</p>

            {/* <select className='cartItem_select'     
            value={item.qtyCounter} 
            onChange={(e)=>
            qtyChangeHandler(item.id, e.target.value)}>
                <option key={item.qtyCounter - 1} value={item.qtyCounter - 1}>{item.qtyCounter - 1}</option>
                <option key={item.qtyCounter} value={item.qtyCounter}>{item.qtyCounter}</option>

                <option key={item.qtyCounter + 1} value={item.qtyCounter + 1}>{item.qtyCounter + 1}</option>
            </select> */}
            <div className="qty">
              <div onClick={() => {
                dispatch(addToCart(item.id))
              }}>
                <Add className='icons' fontSize='small'/>
              </div>

              <div className="number">
                {item.qtyCounter}
              </div>

              <div onClick={() => {
                if(cart.qtyCounter === 1){
                  dispatch(removeFromCart(item.id))
                }else{
                  dispatch(changeToCart(item.id, (item.qtyCounter - 1)))
                }
              }} className='icons' >
                <Remove fontSize='small'/>
              </div>
            </div>

            <button className='cartItem_delete_btn' onClick={()=> removeFromCartHandler(item.id)}>
                <DeleteOutline />
            </button>
        </div>
    </div>
  

  )
}
