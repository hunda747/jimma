import React from 'react'
import './cartItem.css'
import { Link } from 'react-router-dom'
import {DeleteOutline} from '@material-ui/icons'

import photo from '../../assets/photo/pizza.jpg';

export default function CartItem({
    item , 
    qtyChangeHandler ,removeFromCartHandler}) {
        // console.log(item);
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
                {item.price}</p>

            <select className='cartItem_select' 
            value={item.qtyCounter} 
            onChange={(e)=>
            qtyChangeHandler(item.id, e.target.value)}>
                <option key={item.qtyCounter - 1} value={item.qtyCounter - 1}>{item.qtyCounter - 1}</option>
                <option key={item.qtyCounter} value={item.qtyCounter}>{item.qtyCounter}</option>

                <option key={item.qtyCounter + 1} value={item.qtyCounter + 1}>{item.qtyCounter + 1}</option>
            </select>

            <button className='cartItem_delete_btn' onClick={()=> removeFromCartHandler(item.id)}>
                <DeleteOutline />
            </button>
        </div>
    </div>
  

  )
}
