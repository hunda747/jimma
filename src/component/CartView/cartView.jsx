import React, {useEffect, useState} from 'react';
import './cartView.css';

import { ShoppingCart, Delete, Add, Remove} from '@material-ui/icons';

import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart, changeToCart} from '../../redux/actions/cartActions'
import { useNavigate } from 'react-router-dom';

export default function CartView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;


  //handle total price calculation
  const getTotalProductPrice = ()=>{
    return cartItems.reduce((price , item)=> item.price * item.qtyCounter + price , 0)
  }

  const [deliveryPrice, setDeliveryPrice] = useState(35);
  const [totalPrice, setTotalPrice] = useState(getTotalProductPrice());

  useEffect(() => {
    setTotalPrice(getTotalProductPrice());
  }, [cart])

  return (
    <div className="cart">
      <h1><ShoppingCart fontSize='medium'/> Cart</h1>
      {
        cartItems?.map((cart) => {
          return(
          <div className="product">
            <p className="name">{cart.food_name}</p>
            <div className="qty">
              <div onClick={() => {
                dispatch(addToCart(cart.id))
              }}>
                <Add fontSize='small'/>
              </div>
              <p>{cart.qtyCounter}</p>
              <div onClick={() => {
                if(cart.qtyCounter === 1){
                  dispatch(removeFromCart(cart.id))
                }else{
                  dispatch(changeToCart(cart.id, (cart.qtyCounter - 1)))
                }
              }}>
                <Remove fontSize='small'/>
              </div>
            </div>
            <p className="price">{cart.price} Birr</p>
          </div>
          )
        })
      }
      {
        totalPrice?   
          <div className="total">
            {/* <p>Price: {totalPrice} Birr</p>
            <p>Delivery price: {deliveryPrice} Birr</p>
            <p>Total: {totalPrice + deliveryPrice} Birr</p> */}
            <table align='right'>
              <tr>
                <td>Price:</td>
                <td>{totalPrice} Birr</td>
              </tr>
              <tr>
                <td>Delivery price:</td>
                <td>{deliveryPrice} Birr</td>
              </tr>
              <tr className="bold">
                <td>Total: </td>
                <td>{totalPrice + deliveryPrice} Birr</td>
              </tr>
            </table>
          </div>
        :
          <div>
            <p>No item</p>
          </div>
      }
      <div className="checkout">
        <button className="button-32" onClick={() => navigate('/checkout')}>
          Checkout
        </button>
      </div>
    </div>
  )
}
{/* <div className='action'  onClick={() => {
  console.log(cart.id);
  dispatch(removeFromCart(cart.id))
}} ><Delete color='red'/>
</div> */}