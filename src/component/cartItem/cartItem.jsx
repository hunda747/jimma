import React from 'react'
import './cartItem.css'
import { Link } from 'react-router-dom'
import { DeleteOutline } from '@material-ui/icons'
import { Add, Remove } from '@material-ui/icons';
import photo from '../../assets/photo/pizza.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart, changeToCart } from '../../redux/actions/cartActions'
import { IconButton } from '@mui/material';

export default function CartItem({
  item,
  qtyChangeHandler, removeFromCartHandler }) {
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div onClick={() => {
              dispatch(addToCart(item.id))
            }}>
              <IconButton>
                <Add className='icons' fontSize='small' />
              </IconButton>
            </div>

            <p style={{ margin: 0 }}>{item.qtyCounter}</p>

            <div onClick={() => {
              dispatch(changeToCart(item.id, (item.qtyCounter - 1)))
            }} className='icons' >
              {item.qtyCounter > 1 && <IconButton><Remove fontSize='small' /></IconButton>}
            </div>
          </div>
        </div>

        <button className='cartItem_delete_btn' onClick={() => removeFromCartHandler(item.id)}>
          <DeleteOutline />
        </button>
      </div>
    </div>


  )
}
